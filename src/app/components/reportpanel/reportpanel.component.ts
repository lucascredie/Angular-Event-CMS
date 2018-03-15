import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';


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

  documentURL: SafeResourceUrl;

  constructor(
    private storage: AngularFireStorage,
    public sanitizer:DomSanitizer
  ) { }

  issuuOn: Boolean = false; //change that to test issuu

  ngOnInit() {
    this.getPdf();
   
  }
  
//FIGURE OUT UNSAFE URL
  getPdf() {
    
     const ref = this.storage.ref('workout.pdf');
     ref.getDownloadURL().subscribe(url => {
       this.documentURL = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
       console.log(url);
     });

  }
}
