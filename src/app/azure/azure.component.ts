import { Component, OnInit } from '@angular/core';
import { SharedMap, SharedString } from "fluid-framework";
import { AzureFluidRelayService } from '../services/fluid-relay.service';
import { AzureClient } from '@fluidframework/azure-client';

@Component({
  selector: 'app-azure',
  templateUrl: './azure.component.html',
  styleUrls: ['./azure.component.sass']
})
export class AzureComponent implements OnInit {
  client: AzureClient
  schema: any = {
    initialObjects: {
      map1: SharedMap,
      text1: SharedString,
    },
    dynamicObjectTypes: [
    ],
  };
  fluidContainer: any = ''
  services: any = ''
  id: any = ''
  initialObjects: any = ""

  constructor(
    public azureFluidRelayService: AzureFluidRelayService
  ) {
    this.client = this.azureFluidRelayService.getClient()
  }

  async ngOnInit() {
    // this.fluidContainer = await this.client.createContainer(
    //   this.schema
    // );
    // this.id = await this.fluidContainer.container.attach();
    // console.log(this.id)

    this.getData(this.client)

  }

  async getData(client: any){
    // Fetch back the container that had been created earlier with the same ID and schema
    this.fluidContainer = await client.getContainer("64dbf5dd-86d2-40ab-ab51-4224e268bea5", this.schema);

    // Get our list of initial objects that we had defined in the schema. initialObjects here will have the same signature
    this.initialObjects = this.fluidContainer.container.initialObjects;
    // Use the keys that we had set in the schema to load the individual objects
    console.log(this.fluidContainer.container)
    console.log(this.initialObjects['map1'])
    console.log(this.initialObjects["text1"])


  }

}
