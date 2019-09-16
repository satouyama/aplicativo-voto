import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './providers/auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule',canActivate:[AuthGuard]},
  { path: 'slide', loadChildren: () => import('./auth/slide/slide.module').then( m => m.SlidePageModule)},
  { path: 'home',  loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'cadastro', loadChildren: './auth/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'entrar', loadChildren: './auth/entrar/entrar.module#EntrarPageModule' },
  { path: 'esqueceu', loadChildren: './auth/esqueceu/esqueceu.module#EsqueceuPageModule' },
  { path: 'destaques', loadChildren: './home/destaques/destaques.module#DestaquesPageModule' },
  { path: 'pautas', loadChildren: './home/pautas/pautas.module#PautasPageModule' },
  { path: 'iniciativas', loadChildren: './home/iniciativas/iniciativas.module#IniciativasPageModule' },
  { path: 'enquetes', loadChildren: './home/enquetes/enquetes.module#EnquetesPageModule' },
  { path: 'midia', loadChildren: './home/midia/midia.module#MidiaPageModule' },
  { path: 'forget/:email', loadChildren: './auth/forget/forget.module#ForgetPageModule'},
  { path: 'nova-senha/:email', loadChildren: './auth/nova-senha/nova-senha.module#NovaSenhaPageModule' }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
