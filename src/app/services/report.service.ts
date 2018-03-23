import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { Report } from '../models/report';

@Injectable()
export class ReportService {

  reportCollection: AngularFirestoreCollection<Report>; 
  reportDoc: AngularFirestoreDocument<Report>; 
  reportsObservable: Observable<Report[]>; 
  singleReportObservable: Observable<Report>; 

  constructor(private afs: AngularFirestore) {
    this.reportCollection = this.afs.collection('reports');

   }

   getReports(): Observable<Report[]> {
    this.reportsObservable = this.reportCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Report;
        const id = action.payload.doc.id;
        return {id, ...data}; //returns everything
      });
    })
    return this.reportsObservable;
  } 
  
  newReport(report: Report) {
    this.reportCollection.add(report);
   }
   
   deleteReport(report: Report) {
    this.reportDoc = this.afs.doc<Event>(`reports/${report.id}`);
    this.reportDoc.delete();
  }

}
