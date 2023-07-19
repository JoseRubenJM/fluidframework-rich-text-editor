import { Component, OnInit, OnDestroy } from '@angular/core'
import { SharedMap } from 'fluid-framework'
import { TinyliciousClient } from '@fluidframework/tinylicious-client'
import { ITimestampDataModel } from './interfaces/timestamp'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  sharedTimestamp!: SharedMap
  localTimestamp!: ITimestampDataModel
  updateLocalTimestamp!: (() => void)

  // client: TinyliciousClient = new TinyliciousClient()
  containerSchema: any = {initialObjects: { sharedTimestamp: SharedMap }}
  container: any = ''
  containerId: string = ''
  id: any = ''

  async ngOnInit() {
    // this.sharedTimestamp = await this.getFluidData();
    // this.syncData();
  }

  ngOnDestroy() {
    // Delete handler registration when the Angular App component is dismounted.
    // this.sharedTimestamp!.off('valueChanged', this.updateLocalTimestamp!);
  }

  // async getFluidData() {
  //   this.containerId = location.hash.substring(1);
  //   if (!this.containerId) {
  //     (this.container = await this.client.createContainer(this.containerSchema))
  //     this.id = await this.container.container.attach()
  //     location.hash = this.id
  //   }
  //   else {
  //     (this.container = await this.client.getContainer(this.containerId, this.containerSchema))
  //   }

  //   return this.container.container.initialObjects['sharedTimestamp'] as SharedMap
  // }

  // syncData() {
  //   // Only sync if the Fluid SharedMap object is defined.
  //   if (this.sharedTimestamp) {
  //     this.updateLocalTimestamp = () => { this.localTimestamp = { time: this.sharedTimestamp!.get("time") } }
  //     this.updateLocalTimestamp()
  
  //     this.sharedTimestamp!.on('valueChanged', this.updateLocalTimestamp!)
  //   }
  // }

  // onButtonClick() {
  //   this.sharedTimestamp?.set('time', Date.now().toString())
  // }
}
