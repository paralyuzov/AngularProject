import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { News } from 'src/app/types/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList:News[] = [];
  constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.api.getNews().subscribe((article) => {
      this.newsList = article;
    })
  }
}
