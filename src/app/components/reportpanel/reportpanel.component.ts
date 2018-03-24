import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

declare var $:any;

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

  pdfIsSelected: boolean = false;

  formIsValid: boolean = false;

  documentURL: SafeResourceUrl;

  uploadTypeError: boolean = false;

  myReports: Report[];

  newReport: Report = {
    type: "Executive Director Annual Report",
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
 
    this.reportService.getReports().subscribe(events => {
      this.myReports = events;
      console.log(this.myReports);
    })
}
 
  sanitizeURL(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  pdfSelect(event) {

    if(event.target.files[0].type == "application/pdf") {
      this.myPDF = event.target.files[0];
      this.myPDF_Name = event.target.files[0].name;
      console.log(this.myPDF_Name);
      this.pdfIsSelected = true;
      this.uploadTypeError = false;
    } else {
      this.uploadTypeError = true;
    }
  }

  onSubmit( {value, valid }: {value: Report, valid: boolean}) {
    
        console.log(value);

        if(this.pdfIsSelected == true && value.year != "") { 

          this.formIsValid = true;

        } else {

          this.formIsValid = false;
          console.log("Form is not valid");
        }

        if(this.formIsValid) {

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

        $('#Add-Report-Modal').modal('hide');

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
