import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { RouterModule } from '@angular/router';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { ArtistsComponent } from './artists/artists.component';
import { ChartsComponent } from './charts/charts.component';
import { Top10Component } from './top10/top10.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';



@NgModule({
  declarations: [HeaderComponent, AsideComponent, NewReleasesComponent, ArtistsComponent, ChartsComponent, Top10Component, AudioPlayerComponent],
  imports: [
    CommonModule,RouterModule
  ],
  exports:[HeaderComponent,AsideComponent,NewReleasesComponent,ArtistsComponent,ChartsComponent,Top10Component,AudioPlayerComponent]
})
export class CoreModule { }
