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
    pinned: false,
  };

  defaultImages: string[] = [
    "https://firebasestorage.googleapis.com/v0/b/clientpannelprod.appspot.com/o/default_0.jpeg?alt=media&token=bcde1d91-94ac-42dd-990b-aca946cc201c",
    "https://firebasestorage.googleapis.com/v0/b/clientpannelprod.appspot.com/o/default_1.jpeg?alt=media&token=3fb4930f-2c19-4795-a740-48fd9cb07d07",
    "https://firebasestorage.googleapis.com/v0/b/clientpannelprod.appspot.com/o/default_2.jpeg?alt=media&token=68bbfccc-1bcc-40ef-b6d3-27a725ed1a39",
    "https://firebasestorage.googleapis.com/v0/b/clientpannelprod.appspot.com/o/default_3.jpeg?alt=media&token=2f4ab92c-b71d-4fb3-8413-e0381e206cc3",
    "https://firebasestorage.googleapis.com/v0/b/clientpannelprod.appspot.com/o/default_4.jpeg?alt=media&token=4c0fff69-2870-4ad5-b7de-25aab02ac5ac"
  ]

  imageName: string = "";

  hasImage: boolean = false;

  uploadTypeError: boolean = false;

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
      console.log("not valid");
    } else {

      console.log(value, valid);

      if(this.hasImage) {

      

      const file = this.image;
      const filePath = this.event.eventName + "_img"; 
      
      const task = this.storage.upload(filePath, file);
      const permanentURL = task.downloadURL();
      

      permanentURL.subscribe(newUrl => { //grab url from observable
        console.log("THIS IS URL " + newUrl);
         value.url = newUrl;
         value.imageName = filePath;
        //add event
        this.eventService.newEvent(value);
      //redirect to event page
        this.router.navigate(['/']);
      //show confirmation message
        this.snackBar.open("Event was created successfully!", "close", {
        duration: 4000,
      });
      });

    } else { //if event has no image

      value.url = this.defaultImages[this.randomPictureIndex()];
      this.eventService.newEvent(value);
      //redirect to event page
      this.router.navigate(['/']);
      //show confirmation message
      this.snackBar.open("Event was created successfully!", "close", {
        duration: 4000,
      });

    }

    }
  }

  previewPicture(event){
   
    console.log( event.target.files[0].type);

    //error checking
    if(event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {
      this.image = event.target.files[0];
      const file = event.target.files[0];
      const filePath = 'display'; 
      const task = this.storage.upload(filePath, file);
      this.downloadURL = task.downloadURL();
      this.hasImage = true;
      
      this.uploadTypeError = false;
    } else {
      console.log("what you uploaded is not a picture");
      this.uploadTypeError = true;
    }
  }
 
  delete() { //works :)
    console.log("deleting");
    const ref = this.storage.ref("");
    ref.child("display").delete();
  }

  randomPictureIndex() { //from 0 to 4
    return Math.floor(Math.random() * 5);
  }

 

}