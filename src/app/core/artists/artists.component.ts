import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Artists } from 'src/app/types/artists';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  artistList: Artists[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getArtist().subscribe((x) => {
      this.artistList = x;
    });
  }
}
