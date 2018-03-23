import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
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

  issuuOn: Boolean = false; //change that to test issuu

  profileURL: Observable<string | null>;

  documentURL: SafeResourceUrl;

  myReports: Report[];

  newReport: Report = {
    type: "",
    year: "",
    pdfURL: ""
  }

  myPDF: object;
  myPDF_Name: string;

  deadReport: Report; //report that will be deleted

  constructor(
    private storage: AngularFireStorage,
    public sanitizer:DomSanitizer,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    // this.getPdf();
    this.reportService.getReports().subscribe(events => {
      this.myReports = events;
      console.log(this.myReports);
    })
}
  //sanitizer for URL
  getPdf() {
    
     const ref = this.storage.ref('2015_Annual_Report.pdf');
     ref.getDownloadURL().subscribe(url => {
       this.documentURL = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
       console.log(url);
     });

  }
  sanitizeURL(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  pdfSelect(event) {
    this.myPDF = event.target.files[0];
    this.myPDF_Name = event.target.files[0].name;
    console.log(this.myPDF_Name);
  }

  onSubmit( {value, valid }: {value: Report, valid: boolean}) {
    
    if(!valid) {
      //show error message
      console.log("not valid");
      
    } else {

      console.log(value, valid);

      const file = this.myPDF; 
      // const task = this.storage.upload(this.myPDF_Name, file);
      const task = this.storage.upload(value.type + '_'+value.year + '.pdf' , file);
      const permanentURL = task.downloadURL();

      permanentURL.subscribe(newUrl => { //grab url from observable
        console.log("THIS IS URL " + newUrl);
         value.pdfURL = newUrl;
        //add event
        this.reportService.newReport(value);
      //redirect to event page
        // this.router.navigate(['/events/']);
      });

    }
  }

  goBackButton() {
    this.deadReport = {}; //sets it to empty object
  }
  deleteButtonPress(report: Report) {
    //confirm pops up
    this.deadReport = report;
    console.log(this.deadReport);
  }

  deleteButtonConfirmed() {   
    //delets image from db
    const imagePath = this.deadReport.type + "_" + this.deadReport.year + ".pdf";
    console.log("deleting");
    const ref = this.storage.ref("");
    ref.child(imagePath).delete();
    this.reportService.deleteReport(this.deadReport);
}


}
