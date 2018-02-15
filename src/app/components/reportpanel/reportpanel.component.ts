import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';



//storage
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';

@Component({
  selector: 'app-reportpanel',
  templateUrl: './reportpanel.component.html',
  styleUrls: ['./reportpanel.component.css']
})
export class ReportpanelComponent implements OnInit {

  profileURL: Observable<string | null>;

  constructor(private storage: AngularFireStorage) { }

  issuuOn: Boolean = false; //change that to test issuu

  ngOnInit() {
    this.getPdf();
  }
  
//FIGURE OUT UNSAFE URL
  getPdf() {
    
     const ref = this.storage.ref('workout.pdf');
     this.profileURL = ref.getDownloadURL();

  }
}
