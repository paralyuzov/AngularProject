import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AudioService } from 'src/app/audio.service';
import { Releases } from 'src/app/types/releases';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  releasesList: Releases[] = [];
  constructor(
    private api: ApiService,
    private audio: AudioService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.api.getReleases().subscribe((x) => {
      this.releasesList = x;
      this.releasesList.sort((a, b) => b.created - a.created);
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

  like(id: string) {
    if (!this.userService.isLogged) {
      window.alert('You must to be logged in!');
      return;
    }
    const findById = this.releasesList.find((x) => x.objectId == id);
    const likes = findById?.likes; 
    const userId = localStorage.getItem('userId');
    const isLiked = likes?.includes(userId!);
    if (isLiked) {
      window.alert('You have already like this release!');
      return;
    }

    likes?.push(userId!);

    this.userService.updateLikes(id, likes!).subscribe(() => {});
  }
}
