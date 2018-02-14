import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//firebase imports
  import { environment } from '../environments/environment';
  import {AngularFireModule } from 'angularfire2';
  import {AngularFirestoreModule } from 'angularfire2/firestore';
  import {AngularFireAuthModule } from 'angularfire2/auth';
  import { AngularFireStorageModule } from 'angularfire2/storage'; //STORAGE! angularfire2@next install

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import 'hammerjs';
import { RoutingModule } from './routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventpanelComponent } from './components/eventpanel/eventpanel.component';
import { NewsfeedpanelComponent } from './components/newsfeedpanel/newsfeedpanel.component';
import { ReportpanelComponent } from './components/reportpanel/reportpanel.component';
import { EventserviceService } from './services/eventservice.service';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FormsModule } from "@angular/forms";
import { EditEventComponent } from './components/edit-event/edit-event.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    EventpanelComponent,
    NewsfeedpanelComponent,
    ReportpanelComponent,
    AddEventComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'DashboardComponent'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [EventserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
