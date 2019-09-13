import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { DestaquesPageModule } from './destaques/destaques.module';


const routes: Routes = [
  { 
      path: '', 
      component: HomePage,
      children: [
        {
          path: 'destaques',
          children: [
            {
              path: '',
              loadChildren: './home/destaques/destaques.module#DestaquesPageModule'
            }
          ]
        },
        {
          path: 'pautas',
          children: [
            {
              path: '',
              loadChildren: './home/pautas/pautas.module#PautasPageModule'
            }
          ]
        },
        {
          path: 'iniciativas',
          children: [
            {
              path: '',
              loadChildren: './home/iniciativas/iniciativas.module#IniciativasPageModule'
            }
          ]
        },
        {
          path: 'enquetes',
          children: [
            {
              path: '',
              loadChildren: './home/enquetes/enquetes.module#EnquetesPageModule'
            }
          ]
        },
        {
          path: 'midia',
          children: [
            {
              path: '',
              loadChildren: './home/midia/midia.module#MidiaPageModule'
            }
          ]
        },
      ]
  },
  {
    path: '',
    redirectTo: 'home/destaques',
    pathMatch: 'full'       
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
