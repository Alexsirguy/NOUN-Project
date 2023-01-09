import { EmptyDataComponent2 } from './components/empty-data/empty-data.component';
import { environment } from 'src/environments/environment.prod';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpRequest } from './common/HttpRequest';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { UiService } from './common/ui.service';
import { AuthService } from './auth/auth.service';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TutorRegComponent } from './tutor-reg/tutor-reg.component';
import { LoadingComponent2 } from './components/loading/loading.component';
import { NeworkFailureComponent2 } from './components/nework-failure/nework-failure.component';
import { LottieModule } from 'ngx-lottie';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { ExpertComponent } from './expert/expert.component';
import { AngularRaveModule } from 'angular-rave';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './search/search.component'

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    NeworkFailureComponent2,
    AppComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TutorRegComponent,
    LoadingComponent2,
    EmptyDataComponent2,
    CatalogsComponent,
    ExpertComponent,
    LogoutComponent,
    SearchComponent
  ],
  imports: [
    AngularRaveModule.forRoot({
      key: environment.FLUTTERWAVEKEY
    }),
    LottieModule.forRoot({ player: playerFactory }),
    LazyLoadImageModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  entryComponents:[],
  providers: [AuthService, UiService, HttpRequest, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
