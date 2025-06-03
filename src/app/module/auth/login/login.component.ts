import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ErrorComponent } from '../../../shared/ui/error/error.component';
import { AuthenticationService } from '../../../core/service/authentification/authentification.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../core/service/message/message.service';
import { PostLoadingService } from '../../../core/service/loading/post-loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    ErrorComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

     private destroyRef = inject(DestroyRef); // Ajoutez cette ligne
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService,
      private router: Router,
      private messageService: MessageService,
      public postLoadingService: PostLoadingService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
     if (this.loginForm.invalid) {
      this.markAllAsTouched();
      return;
    }



this.authService.login(this.loginForm.value.username,this.loginForm.value.password)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response) => {
        this.messageService.showSuccess('connexion réussie!');
        this.router.navigate(['']);
      }
    });
  }


  private markAllAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }
}
