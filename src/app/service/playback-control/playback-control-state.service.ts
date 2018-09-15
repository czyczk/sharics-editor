import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaybackControlStateService {

  constructor() { }

  isConnected = new BehaviorSubject(false);
  temp = new BehaviorSubject<number>(0);
  playbackState = new BehaviorSubject<'idle' | 'playing' | 'paused'>('idle');
}
