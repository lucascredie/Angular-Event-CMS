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

const routes: Routes = [
  //create routes
  // {path: '', component: DashboardComponent },
  {path: 'events/edit-event/:id', component: EditEventComponent },
  {path: 'events/add-event', component: AddEventComponent },
  {path: '', component: EventpanelComponent },
  {path: 'newsfeed', component: NewsfeedpanelComponent },
  {path: 'reports', component: ReportpanelComponent },
  {path: 'staff', component: StaffComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
