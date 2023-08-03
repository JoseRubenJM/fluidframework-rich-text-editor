import { AfterViewInit, Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild } from '@angular/core'
import { AzureFluidRelayService } from '../services/fluid-relay.service'
import { AzureClient } from '@fluidframework/azure-client'
// import { SharedMap, SharedString } from 'fluid-framework'
import { SharedString } from '@fluidframework/sequence';
import { Schema } from './interfaces'

import { TinyliciousClient } from "@fluidframework/tinylicious-client";

import {
	AzureConnectionConfig,
	AzureFunctionTokenProvider,
} from "@fluidframework/azure-client";
import { InsecureTokenProvider } from "@fluidframework/test-client-utils";
// import { Editor } from 'primeng/editor'

// import { CollaborativeText } from '../services/collaborative-text.dataobject';
// import { FluidLoaderService } from '../services/fluid-loader.service';
// import { CollaborativeTextContainerRuntimeFactory } from "../services/containerCode";

// import { ISharedStringHelperTextChangedEventArgs, SharedStringHelper } from "./sharedStringHelper";


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit, AfterViewInit {
  // @ViewChild('editor') editor!: Editor;
  editor!: any;

  client!: AzureClient
  schema: any = Schema
  fluidContainer: any = ''
  services: any = ''
  id: any = ''
  initialObjects: any = ''

  description: string = ''
  updatDescription: (() => void) | undefined
  sharedDescription!: SharedString

  fluidContainerTiny: any = ''
  sharedDescriptionTiny!: SharedString 

  // type: any = 'remote'

  selectionEnd: number = 0;
  selectionStart: number = 0;
  // dataObject!: CollaborativeText;

  constructor(
    public azureFluidRelayService: AzureFluidRelayService,
    private changeDetector: ChangeDetectorRef,
    // private fluidService: FluidLoaderService
  ) {}

  async ngOnInit() {
    // this.client = this.azureFluidRelayService.getClient()

    // const clientProps = {
		// 	connection: {
		// 		type: this.type,
		// 		tenantId: "58ac4cc5-399e-4fcc-a01f-b5ce17dcf891",
		// 		tokenProvider: new InsecureTokenProvider("a438d403becde61cbd444f59d2f7a07b", { id: "123" }),
		// 		endpoint: "https://us.fluidrelay.azure.com",
		// 	},
		// }
		// this.client = new AzureClient(clientProps);

    // // this.fluidContainer = await this.client.createContainer(this.schema);
    // // this.id = await this.fluidContainer.container.attach();
    // this.fluidContainer = await this.client.getContainer("0d5b09a1-4a7c-4703-a39e-77f5a2ae9c3b", this.schema)
    // this.initialObjects = this.fluidContainer.container.initialObjects
    // this.sharedDescription = this.initialObjects.description
    // this.description = this.sharedDescription.getText()

    // console.log(this.description)
    // // console.log(this.description)

    // console.log(this.sharedDescription.getLength())
    // this.sharedDescription.insertText(this.sharedDescription.getLength(), "a")
    // console.log(this.sharedDescription.getText())
    // // this.syncData()


    // this.dataObject = await this.fluidService.loadDataObject<CollaborativeText>(CollaborativeTextContainerRuntimeFactory)
    // this.sharedDescription = this.dataObject.text

    const client = new TinyliciousClient()
    // this.fluidContainerTiny = await client.createContainer(this.schema)
    // const id = await this.fluidContainerTiny.container.attach()
    this.fluidContainer = await client.getContainer('92a85476-0cc9-4f42-83f9-8b74ac0a7f66', this.schema)
    this.sharedDescription = this.fluidContainer.container.initialObjects.description
    // this.sharedDescriptionTiny.insertText(this.sharedDescriptionTiny.getLength(), "a")
    console.log(this.sharedDescription)
    console.log(this.sharedDescription.getText())
    this.description = this.sharedDescription.getText()

  }

  ngAfterViewInit() {
    // Sets an event listener so we can update our state as the value changes
    // this.sharedDescription.on("", (event: any) => {
    // this.sharedDescription.on("textChanged", (event: any) => {
    this.sharedDescription.on("sequenceDelta", (event: any) => {
      const newText = this.sharedDescription.getText();
      console.log(newText)
      // We only need to insert if the text changed.
      if (newText === this.description) {
        return;
      }

      // If the event is our own then just insert the text
      if (event.isLocal) {
        this.description = newText;
        return;
      }

      // Because we did not make the change we need to manage the remote
      // character insertion.
      const remoteCaretStart = event.first.position;
      const remoteCaretEnd = event.last.position + event.last.segment.cachedLength;
      const charactersModifiedCount = newText.length - this.description.length;

      this.updateSelection();
      const currentCaretStart = this.selectionStart;
      const currentCaretEnd = this.selectionEnd;

      let newCaretStart = 0;
      let newCaretEnd = 0;

      // Remote text inserted/removed after our cp range
      if (currentCaretEnd <= remoteCaretStart) {
        // cp stays where it was before.
        newCaretStart = currentCaretStart;
        newCaretEnd = currentCaretEnd;
      } else if (currentCaretStart > (remoteCaretEnd - 1)) {
        // Remote text inserted/removed before our cp range
        // We need to move our cp the number of characters inserted/removed
        // to ensure we are in the same position
        newCaretStart = currentCaretStart + charactersModifiedCount;
        newCaretEnd = currentCaretEnd + charactersModifiedCount;
      } else {
        // Remote text is overlapping cp

        // The remote changes occurred inside current selection
        if (remoteCaretEnd <= currentCaretEnd && remoteCaretStart > currentCaretStart) {
          // Our selection needs to include remote changes
          newCaretStart = currentCaretStart;
          newCaretEnd = currentCaretEnd + charactersModifiedCount;
        } else if (remoteCaretEnd >= currentCaretEnd && remoteCaretStart <= currentCaretStart) {
          // The remote changes encompass our location

          // Our selection has been removed
          // Move our cp to the beginning of the new text insertion
          newCaretStart = remoteCaretStart;
          newCaretEnd = remoteCaretStart;
        } else {
          // We have partial overlapping selection with the changes.
          // This makes things a lot harder to manage so for now we will just remove the current selection
          // and place it to the remote caret start.
          newCaretStart = remoteCaretStart;
          newCaretEnd = remoteCaretStart;
        }
      }

      this.description = newText;
      this.setCaretPosition(newCaretStart, newCaretEnd);
      // The event we're listening for here fires outside of Angular
      // so let it know to detect changes
      this.changeDetector.detectChanges();
    });
  }

  setCaretPosition(newStart: number, newEnd: number) {
    // if (this.textArea) {
    //     const textArea = this.textArea.nativeElement;
    //     textArea.selectionStart = newStart;
    //     textArea.selectionEnd = newEnd;
    // }

    this.editor.setSelection(newStart, 0)
  }

  updateSelection() {
    // if (!this.textArea) {
    //   return;
    // }

    // const textArea = this.textArea.nativeElement;
    // this.selectionStart = textArea.selectionStart ? textArea.selectionStart : 0;
    // this.selectionEnd = textArea.selectionEnd ? textArea.selectionEnd : 0;
    this.selectionStart = this.editor.getSelection().index;
    this.selectionEnd = this.editor.getSelection().index
  }


  onTextChange(event: any) {
  // }
  // handleChange(event: any) {

    // We need to set the value here to keep the input responsive to the user
    // const currentTarget = event.currentTarget;
    const newText = this.quillGetDeltaInsert(event.delta)

    const charactersModifiedCount = this.description.length - newText.length;
    this.description = newText;

    // Get the new caret position and use that to get the text that was inserted
    const newPosition = this.editor.getSelection().index;
    const isTextInserted = newPosition - this.selectionStart > 0;
    if (isTextInserted) {
        const insertedText = newText.substring(this.selectionStart, newPosition);
        const changeRangeLength = this.selectionEnd - this.selectionStart;
        if (changeRangeLength === 0) {
          console.log(this.selectionStart + ' ' + insertedText)
            this.sharedDescription.insertText(this.selectionStart, insertedText);
        } else {
            this.sharedDescription.replaceText(this.selectionStart, this.selectionEnd, insertedText);
        }
    } else {
        // Text was removed
        this.sharedDescription.removeText(newPosition, newPosition + charactersModifiedCount);
    }
  }


  onInitEditor(event: any): void{
    // console.log(event.editor.getSelection())
    this.editor = event.editor
  }


  quillGetDeltaInsert(delta: any): string {
    return delta.map((op: any) => {
      if (typeof op.insert === 'string') {
        return op.insert;
      } else {
        return '';
      }
    }).join('')
  }

  quillGetDeltaPosition(delta: any): number {
    return delta.map((op: any) => {
      if (typeof op.retain === 'number') {
        return op.retain;
      } else {
        return '';
      }
    }).join('')
  }


}
