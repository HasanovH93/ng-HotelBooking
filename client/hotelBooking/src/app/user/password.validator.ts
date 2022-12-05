import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordChecker(control: AbstractControl): ValidationErrors | null {
  const password = control.value.password;
  const rePass = control.value.rePass;

  if (password !== rePass )
  {
      control.get('rePass')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  if (password == rePass) {
    control.get('rePass')?.setErrors(null);
    return { mismatch: null };
  } else {
    return null;
  }
}
