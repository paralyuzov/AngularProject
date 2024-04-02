import { Component, OnInit } from '@angular/core';
import { Playlists } from 'src/app/types/playlists';
import { UserService } from '../user.service';
import { AudioService } from 'src/app/audio.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playList:Playlists[] = [];

  constructor(private userService:UserService,private audio:AudioService) {}

  ngOnInit(): void {
    this.userService.getPlayListByUserId().subscribe((list) => {
      this.playList = list;
    });
  }

  loadFile(url: string, song: string, artist: string) {
    this.audio.openFile(url, song, artist);
  }

  onDelete(id:string) {
    if(confirm("Are you sure you want to delete this track from your playlist?")) {
      this.userService.deleteById(id).subscribe(() => {
        this.ngOnInit();
      }); 
    }
    
  }

}
