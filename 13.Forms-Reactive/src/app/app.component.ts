import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];


  // The form we will use
  signupForm: FormGroup;


  forbiddenUsernames = ['Chris', 'Anna'];

  constructor() {}

  ngOnInit() {



    // initiating the form and creating controls (input elements)
    this.signupForm = new FormGroup({
      'userData': new FormGroup({ // passing reference to validators methods, these are methods without paranthese
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), // one validator or array of validators
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails) // no binding this as we didn't use it
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });



    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );


    /**
     * setValue must be exact structure of the form
     */
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    /**
     * patchValue doesn't have to be full
     */
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    });
  }

  /**
   * Reset the forum clears everything
   */
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }



  /**
   * Adding a hobby input element (control) is simply
   * creating new FormControl and pushing it in the FormArray
   * to push the element/control you will need to cast returned AbstractControl from get method
   * to FormArray
   */
  onAddHobby() {
    console.log(this.signupForm.controls.hobbies);
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
    // (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  get hobbiesFormArray(): FormArray {
    return <FormArray>this.signupForm.get('hobbies');
    // return this.signupForm.get('hobbies') as FormArray;
  }



  /**
   * Custom validator takes the formControl
   * returns an object of string key and boolean value if NOT valid
   * null if valid >> IMPORTANT
   *
   *
   * @param control
   */
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  /**
   * a sync validator. Promise object or Observable should be returned.
   * https://stackoverflow.com/questions/37364973/angular-promise-vs-observable
   *
   * @param control
   */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
