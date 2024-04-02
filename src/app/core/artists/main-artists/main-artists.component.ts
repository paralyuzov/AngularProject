import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Artists } from 'src/app/types/artists';

@Component({
  selector: 'app-main-artists',
  templateUrl: './main-artists.component.html',
  styleUrls: ['./main-artists.component.css']
})
export class MainArtistsComponent implements OnInit {

  artistsList:Artists[] = [];
  constructor(private api:ApiService) {}
  ngOnInit(): void {
    this.api.getArtist().subscribe((x) => {
      this.artistsList = x;
    });
  }
 

}
