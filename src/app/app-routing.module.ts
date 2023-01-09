import { SearchComponent } from './search/search.component';
import { LogoutComponent } from './logout/logout.component';
import { ExpertComponent } from './expert/expert.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { TutorRegComponent } from './tutor-reg/tutor-reg.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/tutor', component: TutorRegComponent },
  { path: 'catalogs', component: CatalogsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'catalogs/expert/:id', component: ExpertComponent },
  { path: 'account/logout', component: LogoutComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
