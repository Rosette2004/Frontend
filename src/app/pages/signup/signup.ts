import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // For ngModel
    MatFormFieldModule, // For mat-form-field
    MatInputModule, // For matInput directive
    MatButtonModule, // For Angular Material buttons
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupComponent {
  // name = '';
  email = '';
  // photo = '';
  password = '';
  // confirmPassword = '';
  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.signup(this.email, this.password).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/recipes']);
      },
      error: (err) => alert(err.error?.message || 'Signup failed'),
    });
  }
  /*
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.auth
      .signup(
        this.name,
        this.email,
        this.photo,
        this.password,
        this.confirmPassword
      )
      .subscribe({
        next: (res: any) => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/recipes']);
        },
        error: (err) => alert(err.error?.message || 'Signup failed'),
      });
  }
  */
}
