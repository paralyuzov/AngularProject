import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AudioService } from 'src/app/audio.service';
import { Releases } from 'src/app/types/releases';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  releasesList: Releases[] = [];
  constructor(private api: ApiService, private audio: AudioService) {
  }

  ngOnInit(): void {
    this.api.getReleases().subscribe((x) => {
      this.releasesList = x;
      this.releasesList.sort((a, b) => b.created - a.created);
    });
  }

  loadFile(url: string,song:string,artist:string) {
    this.audio.openFile(url,song,artist);
  }
}
