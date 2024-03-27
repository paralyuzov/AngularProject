import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  constructor(private userService: UserService) {}
  isAuthenticating = true;

  ngOnInit(): void {
    this.userService.getUserLogin().subscribe({
      next: (x) => {
        console.log(this.userService.isLogged)
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }

}
