import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content;

  progress: number = 0;
  worker: any;
  state: string;

  constructor(
    public navCtrl: NavController,
    public ngZone: NgZone) {
      this.state = 'Init task';
  }

  runwithWorker() {
    this.state = 'running task...'; 
    this.worker = new Worker('./assets/workers/worker.js');

      this.worker.onmessage = (result) => {
    
      if(result.data <= 100) {
        this.progress = result.data;
        this.worker.postMessage(this.progress);
      } else {
        this.worker.terminate();
        this.worker = undefined;
        this.state = 'task finished';
      }
    };
    this.worker.postMessage(this.progress);
  }

  runInMainThread() {
    this.state = 'running task...';
    setTimeout(() => {
      while(this.progress < 100) {
        this.runTask();
        this.progress += 1;
      }
      this.state = 'task finished';
    }, 50); 
  }

  resetProgressBar() {
    this.progress = 0;
    this.state = 'Init task';
  }

  runTask() {
    for(let i = 0; i < 10000000; i ++) {
      let result = Math.sqrt(i)^2;
    }
  }
}
