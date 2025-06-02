import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmPasswordKey)?.value;

    if (password !== confirmPassword) {
      group.get(confirmPasswordKey)?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }

    // Si les champs correspondent, on enlève l'erreur de validation (si elle existe)
    group.get(confirmPasswordKey)?.setErrors(null);
    return null;
  };
}
