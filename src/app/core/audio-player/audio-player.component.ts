import { Component } from '@angular/core';
import { AudioService } from 'src/app/audio.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent {
  public get duration(): string {
    return this.audio.duration;
  }

  public get currentTime(): string {
    return this.audio.currentTime;
  }

  public get radioValue(): number {
    return this.audio.radioValue;
  }

  public get seekValue(): number {
    return this.audio.seek;
  }

  public get currentSeek(): string {
    return this.audio.currentTime;
  }

  public get songName(): string {
    return this.audio.songName;
  }

  public get artistName(): string {
    return this.audio.artistName;
  }

  constructor(private audio: AudioService) {}

  play(): void {
    this.audio.play();
  }
  stop(): void {
    this.audio.stop();
  }
  pause(): void {
    this.audio.pause();
  }

  setVolume(ev: string): void {
    this.audio.setVolume(ev);
  }

  seekTo(ev: string): void {
    this.audio.setSeekTo(ev);
  }
}
