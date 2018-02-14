import { Component, OnInit } from '@angular/core';
import { EventserviceService } from '../../services/eventservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Event } from '../../models/event';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/observable';

//storage
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  image: object; //this will hold the event with the image
  originalImagePath: string; //save the original image path so it can be deleted
  id: string;

  event: Event = {
    eventName: '',
    about: '',
    start_date: '',
    end_date: '',
    url: ''
  };

  constructor(
    private eventService: EventserviceService, 
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private storage: AngularFireStorage
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.eventService.getEvent(this.id).subscribe(myEvent => {
      this.event = myEvent;
      console.log(this.event);

      this.originalImagePath = this.event.eventName;
      console.log(this.originalImagePath)
      // this.getPicture(this.originalImagePath + "_img"); //gets the picture

    });
  }
 
  previewPicture(event){
    this.image = event.target.files[0];
    const file = event.target.files[0];
    console.log(file);
    const filePath = 'display'; 
    const task = this.storage.upload(filePath, file);
    this.downloadURL = task.downloadURL();

  }

  onSubmit({value, valid}:{value: Event, valid: boolean}) {
      if(!valid) {

      } else {

        if(this.downloadURL != undefined) { //if image was changed


              const file = this.image;
              const filePath = this.event.eventName + "_img";  
              const task = this.storage.upload(filePath, file);
              const permanentURL = task.downloadURL();

              permanentURL.subscribe(newUrl => { //grab url from observable
                console.log("new Image " + newUrl);
                value.id = this.id;
                value.url = newUrl;
                //add event
                this.eventService.updateEvent(value);
              //redirect to event page
                this.router.navigate(['/events/']);
              //show confirmation message
                this.snackBar.open("Event was editted successfully!", "close", {
                duration: 4000,
              });
              });

        } else { //if image was not changed

          value.id = this.id;
          value.url = this.event.url;
          this.eventService.updateEvent(value);
          this.router.navigate(['/events/']);

          this.snackBar.open("Event was eddited successfully", "close", {
          duration: 4000,
        });
        }
      }

  }

  savePicture() {
    const file = this.image;
    const filePath = this.event.eventName + "_img";  //this doesnt work!!!!
    const task = this.storage.upload(filePath, file);
    this.downloadURL = task.downloadURL();
  }

  deletePicture(path:string) { //works :)
    console.log("deleting");
    const ref = this.storage.ref("");
    ref.child(path + "_img").delete();
  }

}
