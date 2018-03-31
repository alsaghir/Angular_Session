import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    /** 1
     * Examples of interval observable that emits seqential
     * numbers each period of milliseconds
     */

    const myNumbers = Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
      );

    this.numbersObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );



    /** 2
     * Here we are building the observer using create method
     * This observer will be our observable that will do the async
     * operation we need
     */


    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => { // emmiting string after period of time
        observer.next('first package');  // next is like emit in EventEmitter
      }, 2000);

      setTimeout(() => {
        observer.next('second package');
      }, 4000);

      setTimeout(() => {
        // observer.error('this does not work');  // make the observer fail
         observer.complete();   // make the observer complete and done
      }, 5000);

      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });


    /** 3
     * subscribing to the observable to do custom
     * methods on emitting data, completing or failing
     *
     */
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('completed'); }
    );


  }

  /** 4
   * You're responsible of destroying
   * observables subscribtion to stop listenning
   * when destroying components
   */

  ngOnDestroy() {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }










/** Another way to create observable and subscribe to it

 


  const anotherObservable = new Observable<string>(
    (source: Subscriber<string>) => {source.next('fire'); }
  );
  anotherObservable.subscribe(stringSent => console.log(stringSent));



 */



  

}
