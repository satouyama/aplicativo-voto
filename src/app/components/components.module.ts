import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { MapaComponent } from './mapa/mapa.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { VotopoliticoComponent } from './votopolitico/votopolitico.component';
import { NoticiaitemComponent } from '../home/midia/components/noticiaitem/noticiaitem.component';
import { NoticiaComponent } from '../home/midia/components/noticia/noticia.component';
import { NoticiacomentarioComponent } from '../home/midia/components/noticiacomentario/noticiacomentario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilpoliticoComponent } from './perfilpolitico/perfilpolitico.component';
import { PerfilusuarioComponent } from './perfilusuario/perfilusuario.component';
import { EnqueteitemComponent } from '../home/enquetes/components/enqueteitem/enqueteitem.component';
import { PerfilusuariocomentarioComponent } from './perfilusuariocomentario/perfilusuariocomentario.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PerfilpoliticocomentarioComponent } from './perfilpoliticocomentario/perfilpoliticocomentario.component';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  declarations: [
    MenuComponent,
    MapaComponent,
    ProjetoComponent,
    NoticiaitemComponent,
    NoticiaComponent,
    NoticiacomentarioComponent,
    VotopoliticoComponent,
    PerfilpoliticoComponent,
    PerfilusuarioComponent,
    PerfilusuariocomentarioComponent,
    PerfilpoliticoComponent,
    PerfilpoliticocomentarioComponent,
    ListaComponent
  ],
  entryComponents:[
    MenuComponent,
    MapaComponent,
    ProjetoComponent,
    NoticiaitemComponent,
    NoticiaComponent,
    NoticiacomentarioComponent,
    VotopoliticoComponent,
    PerfilpoliticoComponent,
    PerfilusuarioComponent,
    PerfilusuariocomentarioComponent,
    PerfilpoliticoComponent,
    PerfilpoliticocomentarioComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  exports:[
    MenuComponent,
    MapaComponent,
    ProjetoComponent,
    NoticiaitemComponent,
    NoticiaComponent,
    NoticiacomentarioComponent,
    VotopoliticoComponent,
    PerfilpoliticoComponent,
    PerfilusuarioComponent,
    PerfilusuariocomentarioComponent,
    PerfilpoliticoComponent,
    PerfilpoliticocomentarioComponent,
    ListaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
