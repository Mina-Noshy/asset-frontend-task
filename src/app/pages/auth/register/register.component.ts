import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogService } from '../../../core/services/common/dialog.service';
import { AccountService } from '../../../core/services/auth/account/account.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../core/data/common/api-response';
import { ApiResponseType } from '../../../core/data/common/api-response-type';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private dialogService: DialogService, 
    private router: Router,
    private accountService: AccountService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['test', Validators.required],
      lastName: ['test', Validators.required],
      userName: ['test', [Validators.required, Validators.minLength(3)]],
      email: ['test@asset.com', [Validators.required, Validators.email]],
      phoneNumber: ['01200000000', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['asset123', [Validators.required, Validators.minLength(6)]],
      role: ['User', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void { }
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.accountService.register(this.f['firstName'].value,
        this.f['lastName'].value,
        this.f['userName'].value,
        this.f['email'].value,
        this.f['phoneNumber'].value,
        this.f['password'].value,
        this.f['role'].value
      ).subscribe({
        next: (response: ApiResponse) => {
          if (response.code == ApiResponseType.Success) {
            this.dialogService.openDialogMsg(response.message);
            this.registerForm.reset();
            this.router.navigate(['auth']);
          } else {
            this.dialogService.openDialogMsg(response.message);
          }
        },
        error: (err) => {
          this.dialogService.openDialogMsg(err.error.message)
        }
      });

    }
  }
}
