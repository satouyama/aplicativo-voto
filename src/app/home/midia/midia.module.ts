import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MidiaPage } from './midia.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NoticiaComponent } from './components/noticia/noticia.component';

const routes: Routes = [
  {
    path: '',
    component: MidiaPage
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
  declarations: [MidiaPage],
  entryComponents:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MidiaPageModule {}


