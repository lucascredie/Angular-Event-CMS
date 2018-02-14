import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { Event } from '../models/event';


@Injectable()
export class EventserviceService {

  eventsCollection: AngularFirestoreCollection<Event>; //to grab collection of events from firebase
  eventDoc: AngularFirestoreDocument<Event>; //to get single event document from firebase
  eventsObservable: Observable<Event[]>; //observable for multiple events
  singleEventObservable: Observable<Event>; //observable for single event
  //storage
  folder: any;

  constructor( private afs: AngularFirestore ) {
    //gets collection from firebase
    this.eventsCollection = this.afs.collection('events'); //ref=>ref.orderBy('startDate', 'asc')
  
   }
   
   //MAYBE FIX METHOD
   getEvents(): Observable<Event[]> {
     this.eventsObservable = this.eventsCollection.snapshotChanges().map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as Event;
         const id = action.payload.doc.id;
         return {id, ...data}; //returns everything
       });
     })
     return this.eventsObservable;
   }  

   getEvent(myId: string): Observable<Event> {
     //events in the template string is refering to the firebase name of the DB
     this.eventDoc = this.afs.doc<Event>(`events/${myId}`);
     this.singleEventObservable = this.eventDoc.snapshotChanges().map(action => {
       if(action.payload.exists === false) {  
        return null;
       } else {
        const data = action.payload.data() as Event;
        data.id = action.payload.id;
        return data;
       }
     });
     return this.singleEventObservable;
   }

   newEvent(event: Event) {
    this.eventsCollection.add(event);
     
   }

   updateEvent(event: Event) {
     this.eventDoc = this.afs.doc<Event>(`events/${event.id}`);
     this.eventDoc.update(event);
   }

   deleteEvent(event: Event) {
    
    this.eventDoc = this.afs.doc<Event>(`events/${event.id}`);
    this.eventDoc.delete();
  }
}
