import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutes } from "./app.routes";
import { AlertModule } from 'ngx-bootstrap';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemService } from './services/item/item.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { MaterialAppModule } from './ngmaterial.module';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadService } from './services/upload/upload.service';
import { UploadDetailComponent } from './views/upload-detail/upload-detail.component';
import { UploadFormComponent } from './views/upload-form/upload-form.component';

export const firebaseConfig = {
    apiKey: "AIzaSyAqV4hWEayet0tcWX7DYtCQYmzPaRWi4t0",
    authDomain: "docsvayam.firebaseapp.com",
    databaseURL: "https://docsvayam.firebaseio.com",
    projectId: "docsvayam",
    storageBucket: "docsvayam.appspot.com",
    messagingSenderId: "946231531235"
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UploadDetailComponent,
    UploadFormComponent
  ],
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AppRoutes,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialAppModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [AngularFireStorage, AuthGuardService, AuthService, ItemService, UploadService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
