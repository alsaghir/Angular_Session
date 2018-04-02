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

    /** 2
     * Examples of interval observable that emits seqential
     * numbers each period of milliseconds
     *
     * Remember
     * - Observable is a data producer
     * - This observable will NOT fail or complete
     * - (LEAVE FOR LAST) map is an operator to change data and return it
     *   after the change. Also check example on map near the end of this class
     */

    /*const myNumbers = Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
      );*/

      const myNumbers = Observable.interval(1000);

    this.numbersObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );



    /** 3
     * Here we are building the observer using create method
     * This observer will be our observable that will do the async
     * operation we need
     *
     * Data sent should be the generic type as in Observer<string>
     */


    const myObservable: Observable<string> = Observable.create((observer: Observer<string>) => {
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


    /** 4
     * subscribing to the observable to do custom
     * methods on emitting data, completing or failing
     *
     * Data type here is known to use since we are the implementers
     * Normally, this is provided by documentation as in
     * angular observables
     *
     */
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('completed'); }
    );

    /*this.customObsSubscription = myObservable.map(data => data + 'x').subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('completed'); }
    );*/



    const exampeObservable: Observable<string> = Observable.create(this.methodToExecute);
    exampeObservable.subscribe(this.dataOnRecieve);

  }

  public methodToExecute(observer: Observer<string>) {

    setTimeout( () => observer.next('500 ms passed'), 500);
  }

  public dataOnRecieve(data: string) {
    console.log(data);
  }




  /** 5
   * You're responsible of destroying
   * observables subscribtion to stop listenning
   * when destroying components
   *
   * TRY WITHOUT UNSUBSCRIBING
   *
   * Angular take care of destroying its all observables but good practice
   * to do it on your own
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
