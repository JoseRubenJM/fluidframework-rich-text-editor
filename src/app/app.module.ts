import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AzureComponent } from './azure/azure.component';
import { EditorComponent } from './editor/editor.component';

import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';


@NgModule({
  declarations: [
    AppComponent,
    AzureComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
