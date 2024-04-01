import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent {
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) {}

  form = this.fb.group({
    artist:['',[Validators.required]],
    track:['',[Validators.required]],
    label:['',[Validators.required]],
    image:['',[Validators.required,Validators.pattern(`^https.*\.jpg$`)]],
    audio:['',[Validators.required,Validators.pattern(`^https.*\.mp3$`)]]
  })


  add() {
    if(this.form.invalid) {
      return;
    }

    const {artist,track,label,image,audio} = this.form.value;
    this.userService.addSong(artist!,track!,label!,image!,audio!).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }
}
