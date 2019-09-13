import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnquetesPage } from './enquetes.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { EnqueteComponent } from 'src/app/forms/enquete/enquete.component';
import { EnqueteConcluidaComponent } from 'src/app/forms/enquete/enquete-concluida/enquete-concluida.component';
import { UploaddocComponent } from 'src/app/components/uploaddoc/uploaddoc.component';
import { EnqueteitemComponent } from './components/enqueteitem/enqueteitem.component';
import { EnquetedetalheComponent } from './components/enquetedetalhe/enquetedetalhe.component';
import { EnquetecomentarioComponent } from './components/enquetecomentario/enquetecomentario.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NoticiaComponent } from '../midia/components/noticia/noticia.component';

const routes: Routes = [
  {
    path: '',
    component: EnquetesPage,
  },
  {
    path : 'enquete/:id',
    component: EnqueteitemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [
    EnquetesPage, 
    EnqueteComponent,
    EnqueteConcluidaComponent,
    UploaddocComponent,
    EnqueteitemComponent,
    EnquetedetalheComponent,
    EnquetecomentarioComponent,
  ],
  entryComponents:[
    EnqueteComponent,
    EnqueteConcluidaComponent,
    UploaddocComponent,
    EnqueteitemComponent,
    EnquetedetalheComponent,
    EnquetecomentarioComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EnquetesPageModule {}
