import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/observable';
import { NewsfeedService } from '../../services/newsfeed.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-newsfeedpanel',
  templateUrl: './newsfeedpanel.component.html',
  styleUrls: ['./newsfeedpanel.component.css']
})

export class NewsfeedpanelComponent implements OnInit {

  myNews: News[];

  constructor(
    public snackBar: MatSnackBar,
    private newsfeedService: NewsfeedService
  ) { }

  ngOnInit() {
    this.newsfeedService.getNews().subscribe(news => {
      this.myNews = news;
      console.log(this.myNews);


  });
  }

  getInformation(url: string) {
    
  }

}
