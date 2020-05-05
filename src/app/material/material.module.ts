import { NgModule } from '@angular/core';

import { MatButtonModule }              from '@angular/material/button';
import {MatButtonToggleModule}          from '@angular/material/button-toggle'; 
import {MatIconModule}                  from '@angular/material/icon';
import { MatBadgeModule}                from '@angular/material/badge';         
import {MatProgressSpinnerModule}       from '@angular/material/progress-spinner';
import {MatProgressBarModule}           from '@angular/material/progress-bar';
import {MatToolbarModule }             from '@angular/material/toolbar';
import  { MatSidenavModule }             from '@angular/material/sidenav';

//import { MatMenuModule } from '@angular/material/menu';
//import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatCardModule } from '@angular/material/card';

const Material = [ MatButtonModule, 
                   MatButtonToggleModule, 
                   MatIconModule, 
                   MatBadgeModule,
                   MatProgressSpinnerModule,
                   MatProgressBarModule,
                   MatToolbarModule,
                   MatSidenavModule ] 

@NgModule({
  imports: [Material],
  exports: [Material]
})

export class MaterialModule { }
