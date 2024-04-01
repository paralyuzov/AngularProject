import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { userForAuth } from '../types/userForAuth';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Releases } from '../types/releases';

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
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          localStorage.setItem("userId",user.objectId)
          localStorage.setItem("token",user['user-token'])
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId")
    return this.http
      .get<userForAuth>('/api/users/logout')
      .pipe(tap(() => this.user$$.next(undefined)));
      
  }

  getUserLogin() {
    const token = localStorage.getItem("token");
    return this.http.get<userForAuth | boolean>(
      `/api/users/isvalidusertoken/${token}`,
      {}
    );
  }

  getUserProfile() {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    if(!token && !userId) {
      return this.user$$;
    }
    const header = new HttpHeaders({'user-token':`${token}`})
    return this.http.get<userForAuth>(`/api/data/Users/${userId}`,{headers:header}).pipe(tap((user) => {
      this.user$$.next(user);
    }));
  }

  addSong(artist:string,songName:string,label:string,imageUrl:string,audioUrl:string) {
    const token = localStorage.getItem("token");  
    const header = new HttpHeaders({'user-token':`${token}`})
    const postData = {artist,songName,label,imageUrl,audioUrl};
    return this.http.post<Releases>(`/api/data/releases`,postData,{headers:header})
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
