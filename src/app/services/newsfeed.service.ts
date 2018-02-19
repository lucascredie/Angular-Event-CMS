import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { News } from '../models/news'

@Injectable()
export class NewsfeedService {

  newsCollection: AngularFirestoreCollection<News>; //to grab collection of events from firebase
  newsDoc: AngularFirestoreDocument<News>; //to get single event document from firebase
  newsObservable: Observable<News[]>; //observable for multiple events

  constructor(private afs: AngularFirestore) { 
    this.newsCollection = this.afs.collection('news');
  }

  getNews(): Observable<News[]> {
    this.newsObservable = this.newsCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as News;
        const id = action.payload.doc.id;
        return {id, ...data}; //returns everything
      });
    })
    return this.newsObservable;
  }  

  updateNews(news: News) {
    this.newsDoc = this.afs.doc<News>(`news/${news.id}`);
    this.newsDoc.update(news);
  }

}
