import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    /* setValue() [whole form]
       patchValue() [partial form]

       There are a few ways we can assign values from here to the form. Two-way
       data binding would work. There are two others, for entire or partial
       form changes:

       Method 1 (worse): use setValue(), which needs an exact representation of
       the entire form. The DOWNSIDE of this method is that the form will be
       reset to this default set of values every time this suggestUserName()
       function is called. Because of this, it may be a better idea for form
       initialization in ngOnInit or similar. All the same, here it is... */
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'female'
    // });

    /* Method 2 (better): access the field from the signupForm, then use the
       patchValue() method on the form object contained inside signupForm... */
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  /* Alternative approach to getting the form data using @ViewChild, which can
     be useful if you need to get access to the form *before* submission. */
  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    /* NB. you can pass the same object to reset() as you can to setValue()
       (see above), which allows you to specify default values for reset(). */
    this.signupForm.reset();
  }
}
