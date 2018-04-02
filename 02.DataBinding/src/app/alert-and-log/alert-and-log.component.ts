import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-alert-and-log',
  templateUrl: './alert-and-log.component.html',
  styleUrls: ['./alert-and-log.component.css']
})
export class AlertAndLogComponent implements OnInit, OnDestroy {

  @Input() theName: string;

  /**
   * Custom event implementation using
   * Angular EventEmitter object
   *
   * Notes:
   *  - Event initiator is on the html template
   *  - onClick method executed to call emit() method of the event
   *  - Event emmited so the listener do an action as customized
   *  - Listenning here is done using subscribe() method which MUST be called before emitting an event of course
   *  - Don't use anything but emit method on EventEmitter. Use Subject for similar actions, see the following
   *    https://github.com/angular/angular/blob/master/packages/core/src/event_emitter.ts
   *  - You can't to inside the same component. You emit only to external components. Example the commented lines below to that task.
   *
   *  ALWAYS unsubscribe for memory efficiency
   */
  nameClick = new EventEmitter();
  nameClickSubject = new Subject();
  subscription: Subscription;

  constructor() { this.subscription = this.nameClick.subscribe(() => {console.log('event fired'); } );
                   // this.subscription = this.nameClickSubject.subscribe((variable) => {console.log('event fired ' + variable); } );
                }

  ngOnInit() {

  }

  onClick() { // Click on <p> tag to fire the event
    this.nameClick.emit();
     // this.nameClickSubject.next('x');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
