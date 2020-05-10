import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CustomSnackBarComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular imports are now part of it's own module, keeping the code clean. import into the imports: [] below
import { MaterialModule } from './material/material.module';
import { RightpanelComponent } from './rightpanel/rightpanel.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';


@NgModule({
  declarations: [
    AppComponent,
    RightpanelComponent,
    LeftpanelComponent,
    CustomSnackBarComponent,
    DialogExampleComponent
  ],
  entryComponents :[CustomSnackBarComponent, DialogExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// npm install --save angular/material2-builds angular/cdk-builds <== this is to overcome the deprecations
// material.angular.io for all of the information related the package
