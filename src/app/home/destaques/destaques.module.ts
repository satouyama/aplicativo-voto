import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { ComponentsModule } from 'src/app/components/components.module';
import { DestaquesPage } from './destaques.page';

const routes: Routes = [
  {
    path: '',
    component: DestaquesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DestaquesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DestaquesPageModule {

}
