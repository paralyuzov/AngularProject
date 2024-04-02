import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AudioService } from 'src/app/audio.service';
import { Releases } from 'src/app/types/releases';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css'],
})
export class Top10Component implements OnInit {
  top10List: Releases[] = [];
  constructor(private api: ApiService, private userService: UserService,private audio:AudioService) {}

  ngOnInit(): void {
    this.api.getReleases().subscribe((x) => {
      this.top10List = x;
      this.top10List.sort((a, b) => b.likes.length - a.likes.length);
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
