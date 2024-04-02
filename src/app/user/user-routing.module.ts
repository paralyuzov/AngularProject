import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AddSongComponent } from './add-song/add-song.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AuthActivate } from 'src/guards/auth.activate';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthActivate] },
  { path: 'add', component: AddSongComponent, canActivate: [AuthActivate] },
  { path: 'playlist', component: PlaylistComponent,canActivate: [AuthActivate] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
