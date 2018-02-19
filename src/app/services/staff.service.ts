import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { Staff } from '../models/staff';

@Injectable()

export class StaffService {

  staffCollection: AngularFirestoreCollection<Staff>; //to grab collection of events from firebase
  staffDoc: AngularFirestoreDocument<Staff>; //to get single event document from firebase
  staffObservable: Observable<Staff[]>; //observable for multiple events

  constructor(private afs: AngularFirestore) { 

    this.staffCollection = this.afs.collection('staff');
  }

  getStaff(): Observable<Staff[]> {
    this.staffObservable = this.staffCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Staff;
        const id = action.payload.doc.id;
        return {id, ...data}; //returns everything
      });
    })
    return this.staffObservable;
  }  

  updateStaff(staff: Staff) {
    this.staffDoc = this.afs.doc<Staff>(`staff/${staff.id}`);
    this.staffDoc.update(staff);
  }

}






   
  
