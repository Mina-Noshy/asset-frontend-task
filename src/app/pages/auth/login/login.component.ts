import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiResponseType } from '../../../core/data/common/api-response-type';
import { AuthService } from '../../../core/services/auth/auth/auth.service';
import { DialogService } from '../../../core/services/common/dialog.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/common/local-storage.service';
import { ApiResponse } from '../../../core/data/common/api-response';
import { UserTokenResponse } from '../../../core/data/auth/account/user-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    private tokenStorageService: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['info@asset.com', [Validators.required, Validators.email]],
      password: ['asset123', [Validators.required, Validators.minLength(6)]],
      company: ['1001']
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.f['email'].value, this.f['password'].value, '').subscribe({
        next: async (response: ApiResponse) => {
          if (response.code == ApiResponseType.Success) {
            const user = response.data as UserTokenResponse;
  
            this.tokenStorageService.setUserDetails(user);
            this.tokenStorageService.setAccessToken(user.accessToken!);
            this.tokenStorageService.setRefreshToken(user.refreshToken!);

            this.router.navigate(['']);
          } 
          else{
            this.dialogService.openDialogMsg(response.message)
          }
        },
        error: (err) => {
          this.dialogService.openDialogMsg(err.error.data)
        }
      });
  
    }
  }
}
