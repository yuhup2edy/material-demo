import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';


//import { MatMenuModule } from '@angular/material/menu';
//import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatCardModule } from '@angular/material/card';

const MaterialComponents = [ MatButtonModule, MatButtonToggleModule, MatIconModule ] 

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})

export class MaterialModule { }
