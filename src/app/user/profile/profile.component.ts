import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileDitails = {
    name: '',
    email: '',
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    const { name, email } = this.userService.user!;
    this.profileDitails = {
      name,
      email,
    };
    this.form.get('username')?.setValue(`${this.profileDitails.name}`);
    this.form.get('email')?.setValue(`${this.profileDitails.email}`);
  }

  onEdit() {
    if (this.form.invalid) {
      return;
    }

    const { username, email } = this.form.value;
    this.userService.updateUser(username!, email!).subscribe(() => {
      window.alert('You have update your profile!');
      if (email != this.profileDitails.email) {
        this.userService.logout();
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
