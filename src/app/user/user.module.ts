import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AddSongComponent } from './add-song/add-song.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    RegisterComponent,
    PlaylistComponent,
    AddSongComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,UserRoutingModule,FormsModule,ReactiveFormsModule,CoreModule
  ]
})
export class UserModule { }
