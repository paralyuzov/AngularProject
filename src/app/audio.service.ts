import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audioObj = new Audio();

  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ];

  constructor() {}

  public currentTime = '00:00:00';
  public duration = '00:00:00';
  public radioValue = 0;
  public seek = 0;

  streamObserver(url: string) {
    return new Observable((observer) => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.seek = this.audioObj.currentTime;
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
        this.duration = this.timeFormat(this.audioObj.duration);
        this.radioValue = this.audioObj.duration;
      };

      this.addEvent(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvent(this.audioObj, this.audioEvents, handler);
      };
    });
  }

  addEvent(
    obj: HTMLAudioElement,
    events: string[],
    handler: (event: Event) => void
  ) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(
    obj: HTMLAudioElement,
    events: string[],
    handler: (event: Event) => void
  ) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(seekValue: string) {
    this.audioObj.currentTime = Number(seekValue);
  }

  setVolume(ev: string) {
    this.audioObj.volume = Number(ev);
  }

  openFile(url: string) {
    this.streamObserver(url).subscribe((event) => {});
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }

  timeFormat(time: number, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  
}
