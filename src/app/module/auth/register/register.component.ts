import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ErrorComponent } from '../../../shared/ui/error/error.component';
import { matchPasswordsValidator } from '../../../shared/utils/matchPasswordsValidator';
import { SharedModule } from '../../../shared/shared.module';
import { AuthenticationService } from '../../../core/service/authentification/authentification.service';
import { MessageService } from '../../../core/service/message/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { PostLoadingService } from '../../../core/service/loading/post-loading.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
    InputComponent,
    ButtonComponent,
    ErrorComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   private destroyRef = inject(DestroyRef); // Ajoutez cette ligne
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    public postLoadingService: PostLoadingService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: [matchPasswordsValidator('password', 'confirmPassword')]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const formData = {
      fullName: this.registerForm.value.fullName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

   this.authService.register(formData)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response) => {
        this.messageService.showSuccess('Inscription réussie!');
        this.router.navigate(['auth/login']);
      }
    });
  }

  private markAllAsTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

}
