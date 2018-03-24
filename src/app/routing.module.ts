import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//destination components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventpanelComponent } from './components/eventpanel/eventpanel.component'
    import { AddEventComponent } from './components/add-event/add-event.component'
    import { EditEventComponent } from './components/edit-event/edit-event.component'

import { NewsfeedpanelComponent } from './components/newsfeedpanel/newsfeedpanel.component'
import { ReportpanelComponent } from './components/reportpanel/reportpanel.component';
import { StaffComponent } from './components/staff/staff.component';
import {LoginComponent } from './components/login/login.component';

//GUARD
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //create routes
  // {path: '', component: DashboardComponent },
  {path: 'events/edit-event/:id', component: EditEventComponent, canActivate:[AuthGuard] },
  {path: 'events/add-event', component: AddEventComponent, canActivate:[AuthGuard] },
  {path: '', component: EventpanelComponent, canActivate:[AuthGuard] },
  {path: 'newsfeed', component: NewsfeedpanelComponent, canActivate:[AuthGuard] },
  {path: 'reports', component: ReportpanelComponent, canActivate:[AuthGuard] },
  {path: 'staff', component: StaffComponent, canActivate:[AuthGuard] },
  {path: 'login', component: LoginComponent} //not protected 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard] //added for guard
})
export class RoutingModule { }
