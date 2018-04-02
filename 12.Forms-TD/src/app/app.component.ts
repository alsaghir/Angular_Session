import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  /** 2
   * We can reference to the template variable as we know it without passing it in a mothode
   */
   @ViewChild('f') signupForm: NgForm;






  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  hobbiesControls = 0;

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  submitted = false;


  ngOnInit() {
    this.logPeriodically();
  }

  logPeriodically() {
    console.log(this.signupForm);
    console.log(this.defaultQuestion);
    setTimeout(() => { this.logPeriodically(); }, 5000);
  }



  suggestUserName() {

    const suggestedName = 'Superuser';
   /*
    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: 'any@any.com'
      },
      // secret: 'pet',
      questionAnswer: 'this is a text',
      gender: 'male'
    });*/

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
        email: 'any@any.com'
      },
      // secret: 'pet',
      questionAnswer: 'this is a text',
      gender: 'male'
    });
  }



/* Simulating FormArray on Reactive approach
  onAddHobby() {
    console.log(this.signupForm);
    this.hobbiesControls++;
  }

  get indexArray(): Array<number> {
    return new Array<number>(this.hobbiesControls);
  }
*/


  /** 1
   * Creating the form in template then passing it on submission.
   * See the commenting on the template for more details
   */

   // onSubmit(form: NgForm) {
    // console.log(form);
  // }






  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username; // notice the userData grouping
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    console.log(this.signupForm.value);

    this.signupForm.reset();
  }
}
