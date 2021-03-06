import { Component, OnInit } from '@angular/core';
import { EventserviceService } from "../../services/eventservice.service"; //import service
import { Event } from "../../models/event";//import event interface
import { MatSnackBar, MatSlideToggleModule } from '@angular/material';
import { Observable } from 'rxjs/observable';

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';

@Component({
  selector: 'app-eventpanel',
  templateUrl: './eventpanel.component.html',
  styleUrls: ['./eventpanel.component.css']
})

export class EventpanelComponent implements OnInit {

  // downloadURL: Observable<string>;

  listView: Boolean = true;
  myEvents: Event[];
  pinnedEvents: Event[];
  otherEvents:Event[];

  myPicURLs: Observable<string>[];
  deadEvent: Event; //event that will be deleted


  constructor(
    private eventSetvice: EventserviceService, 
    public snackBar: MatSnackBar,
    public toggle: MatSlideToggleModule,
    private storage: AngularFireStorage 
  ) { }

  ngOnInit() {
    //runs as soon as component is initialized
    //RETURNS NOTHING --
    this.eventSetvice.getEvents().subscribe(events => {
      // this.myEvents = events;
      // console.log(this.myEvents);

      this.pinnedEvents = events.filter(event => event.pinned == true);
      this.otherEvents = events.filter(event => event.pinned == false);

      console.log(this.pinnedEvents);
      console.log(this.otherEvents);

      this.myEvents = this.pinnedEvents.concat(this.otherEvents);
      
      // this.getAllPictures();
    })

  }

 

  deleteButtonPress(event: Event) {
    //confirm pops up
    this.deadEvent = event;
    console.log(this.deadEvent.eventName);
  }

  deleteButtonConfirmed() {   
      //delets image from db
      try { //if image is not random image
      
        const imagePath = this.deadEvent.imageName;
        console.log("deleting");
        const ref = this.storage.ref("");
        ref.child(imagePath).delete();  
        this.eventSetvice.deleteEvent(this.deadEvent);

      } catch (error) { //if image is default then just delete event
        console.log("Picture not found in storage - Might be use of default pic")
        console.log(this.deadEvent);
        this.eventSetvice.deleteEvent(this.deadEvent);
      }
      
      this.snackBar.open("Event was deleted successfully!", "close", {
        duration: 4000,
      });

  }

  goBackButton() {
    this.deadEvent = {}; //sets it to empty object
    
  }
  
  changeView() {
    this.toggle = false;
    this.listView = !this.listView;
    //this is grabbing pictures based on the name  from db and storing it in
    //events array in a property called URL 
    // this.getAllPictures();
  }

  pin(event: Event) {
  
    event.pinned = !event.pinned;
    this.eventSetvice.updateEvent(event);
  }

  publish(event: Event) {
    event.published = !event.published;
    this.eventSetvice.updateEvent(event);
  }

  displayDate(event: Event) {
    event.hasDate = !event.hasDate;
    this.eventSetvice.updateEvent(event);
  }

  // getAllPictures() {
  //   this.myEvents.map(evnt => {
  //     evnt.url = this.getPicture(evnt.eventName);
  //   })
  // }

  // getPicture(name: string){
  //   console.log("getting picture..." + name + "_img");
  //   const ref = this.storage.ref(name + "_img"); //name of file is eventImages2
  //   // this.profileUrl = ref.getDownloadURL();
  //   // this.downloadURL = ref.getDownloadURL();
  //   const srcString = ref.getDownloadURL();
  //   return srcString;
  //   // console.log(srcString);
  // }

}
