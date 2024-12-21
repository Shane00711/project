import { Observable } from '@nativescript/core';

export class TimerService extends Observable {
  private timeLimit: number; // in seconds
  private remainingTime: number;
  private timer: any;

  constructor(timeLimit: number = 30) {
    super();
    this.timeLimit = timeLimit;
    this.remainingTime = timeLimit;
  }

  startTurn(): void {
    this.remainingTime = this.timeLimit;
    this.notify({ eventName: 'timerUpdate', data: this.remainingTime });
    
    this.timer = setInterval(() => {
      this.remainingTime--;
      this.notify({ eventName: 'timerUpdate', data: this.remainingTime });
      
      if (this.remainingTime <= 0) {
        this.endTurn();
      }
    }, 1000);
  }

  endTurn(): void {
    clearInterval(this.timer);
    this.notify({ eventName: 'turnTimeout' });
  }

  reset(): void {
    clearInterval(this.timer);
    this.remainingTime = this.timeLimit;
  }
}