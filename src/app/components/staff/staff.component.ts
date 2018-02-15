import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/observable';
import { StaffService } from '../../services/staff.service';
import { Staff } from '../../models/staff';


//storage
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  downloadURL: Observable<string>;
  staff: Staff[];
  image: object;
  staffId: string = "TF25byqKR4YCjgCXIv5i"; //id wont change since its one document only

  editEnabled: boolean = false;

  constructor(
    private staffService: StaffService,
    private storage: AngularFireStorage,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.staffService.getStaff().subscribe(staff => {
      this.staff = staff;
      console.log(this.staff);
  });
}

previewPicture(event){
  this.image = event.target.files[0];
  const file = event.target.files[0];
  console.log(file);
  const filePath = 'staff_display'; 
  const task = this.storage.upload(filePath, file);
  this.downloadURL = task.downloadURL();

}

onSubmit({value, valid}:{value: Staff, valid: boolean}) {
  if(!valid) {

  } else {

    if(this.downloadURL != undefined) { //if image was changed


          const file = this.image;
          const filePath = "staff_img";  
          const task = this.storage.upload(filePath, file);
          const permanentURL = task.downloadURL();

          permanentURL.subscribe(newUrl => { //grab url from observable
            console.log("new Image " + newUrl);
            value.id = this.staffId;
            value.url = newUrl;
            //add event
            this.staffService.updateStaff(value);
        
          //show confirmation message
            this.snackBar.open("Event was editted successfully!", "close", {
            duration: 4000,
          });
          });

    } else { //if image was not changed

      value.id = this.staffId;
      value.url = this.staff[0].url;
      this.staffService.updateStaff(value);

      this.snackBar.open("Event was eddited successfully", "close", {
      duration: 4000,
    });
    }
  }

}

}