import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Releases } from 'src/app/types/releases';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css'],
})
export class Top10Component implements OnInit {

  top10List: Releases[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getReleases().subscribe(x => {
      this.top10List = x;
      this.top10List.sort((a,b) => b.likes - a.likes);
      console.log(this.top10List)
    });
    
  }

  
}
