import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { userForAuth } from '../types/userForAuth';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<userForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  user: userForAuth | undefined;

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }
  

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
      debugger
    });
  }

  register(email: string, password: string, name: string) {
    return this.http
      .post<userForAuth>('/api/users/register', {
        email,
        password,
        name,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<userForAuth>('/api/users/login', {
        login: email,
        password: password,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http.get<userForAuth>('/api/users/logout').pipe(tap(() => this.user$$.next(undefined)))
  }

  getUserLogin() {
    return this.http.get<userForAuth>('/api/users/isvalidusertoken/user-auth-cookie',{});
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
