import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AudioService } from 'src/app/audio.service';
import { Artists } from 'src/app/types/artists';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-artist',
  templateUrl: './current-artist.component.html',
  styleUrls: ['./current-artist.component.css']
})
export class CurrentArtistComponent implements OnInit {

    artistData = {} as Artists
    constructor(private api:ApiService,private activeRoute:ActivatedRoute,private audio:AudioService,private userService:UserService) {}

    ngOnInit(): void {
      this.activeRoute.params.subscribe((data) => {
        const id = data["artistsId"];
        this.api.getArtistId(id).subscribe((artist) => {
          console.log(artist)
          this.artistData = artist;
        })
      })
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
