import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const textbox1 = formGroup.controls[controlName].value;
    const textbox2 = formGroup.controls[matchingControlName].value;
    let regExp = /^[1-9]\d*$/;

    /*
      1. textbox1 && textbox2 = 0 , show error  near both.
      2. textbox1 = 0 & textbox2 = '' || textbox1 = '' & textbox2 = 0, show error ' near textbox1/textbox2.
      3. textbox1 = 0 && textbox2 = 1 || textbox1 = 1 && textbox2 = 0, No error
    */

    // set error on matchingControl if validation fails
    if (!regExp.test(textbox1) && !regExp.test(textbox2)) {
      textbox1.setErrors({ Error: 'should not start with 0' });
      textbox2.setErrors({ Error: 'should not start with 0' });
    } else if (!regExp.test(textbox1) || regExp.test(textbox2)) {
      textbox1.setErrors({ Error: 'should not start with 0' });
    } else if (regExp.test(textbox1) || !regExp.test(textbox2)) {
      textbox2.setErrors({ Error: 'should not start with 0' });
    } else {
      return null;
    }
  };
}
