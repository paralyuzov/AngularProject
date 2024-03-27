import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../utils/matchPasswordValidator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  get passGroup() {
    return this.form.get('passGroup');
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        repassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'repassword')],
      }
    ),
  });

  register() {
    if (this.form.invalid) {
      return;
    }
    const {
      username,
      email,
      passGroup: { password, repassword } = {},
    } = this.form.value;
    this.userService.register(email!, password!, username!).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
