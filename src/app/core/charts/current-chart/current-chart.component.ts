import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AudioService } from 'src/app/audio.service';
import { Charts } from 'src/app/types/charts';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-chart',
  templateUrl: './current-chart.component.html',
  styleUrls: ['./current-chart.component.css'],
})
export class CurrentChartComponent implements OnInit {
  chart = {} as Charts;
  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private audio: AudioService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['chartsId'];
      this.api.getChartId(id).subscribe((chart) => {
        this.chart = chart;
        console.log(chart);
      });
    });
  }

  loadFile(url: string, song: string, artist: string) {
    this.audio.openFile(url, song, artist);
  }

  addToPlaylist(
    artist: string,
    audioUrl: string,
    imageUrl: string,
    label: string,
    songName: string
  ) {
    if (!this.userService.isLogged) {
      window.alert('You must to be logged in!');
      return;
    }

    this.userService
      .addToPlaylist(artist, audioUrl, imageUrl, label, songName)
      .subscribe(() => {
        window.alert('Added to your playlist!');
      });
  }
}
