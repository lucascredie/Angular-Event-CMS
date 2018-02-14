import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from '../../models/event';
import { EventserviceService } from '../../services/eventservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/observable';
//storage
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})

export class AddEventComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  image: object; //this will hold the event with the image

  //Creating using interface
  event: Event = {
    eventName: '',
    about: '',
    start_date: '',
    end_date: '',
    url: '',
  };

  imageName: string = "";

  @ViewChild('eventForm') form: any;

  
  constructor(
    private eventService: EventserviceService, 
    private router: Router, 
    public snackBar: MatSnackBar,
    private storage: AngularFireStorage) { 
  
  }

  ngOnInit() {
   
  }

  onSubmit( {value, valid }: {value: Event, valid: boolean}) {

    value = this.event;
    
    if(!valid) {
      //show error message
      console.log("not valied");
    } else {

      console.log(value, valid);

      const file = this.image;
      const filePath = this.event.eventName + "_img";  
      const task = this.storage.upload(filePath, file);
      const permanentURL = task.downloadURL();

      permanentURL.subscribe(newUrl => { //grab url from observable
        console.log("THIS IS URL " + newUrl);
         value.url = newUrl;
        //add event
        this.eventService.newEvent(value);
      //redirect to event page
        this.router.navigate(['/events/']);
      //show confirmation message
        this.snackBar.open("Event was created successfully!", "close", {
        duration: 4000,
      });
      });

    }
  }

  previewPicture(event){
    this.image = event.target.files[0];
    const file = event.target.files[0];
    const filePath = 'display'; 
    const task = this.storage.upload(filePath, file);
    this.downloadURL = task.downloadURL();

  }
 
  delete() { //works :)
    console.log("deleting");
    const ref = this.storage.ref("");
    ref.child("display").delete();
  }

}