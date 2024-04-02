import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { userForAuth } from '../types/userForAuth';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Releases } from '../types/releases';
import { Playlists } from '../types/playlists';

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
          localStorage.setItem('userId', user.objectId);
          localStorage.setItem('token', user['user-token']);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return this.http
      .get<userForAuth>('/api/users/logout')
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getUserLogin() {
    const token = localStorage.getItem('token');
    return this.http.get<userForAuth | boolean>(
      `/api/users/isvalidusertoken/${token}`,
      {}
    );
  }

  getUserProfile() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token && !userId) {
      return this.user$$;
    }
    const header = new HttpHeaders({ 'user-token': `${token}` });
    return this.http
      .get<userForAuth>(`/api/data/Users/${userId}`, { headers: header })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        })
      );
  }

  updateUser(name:string,email:string) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const header = new HttpHeaders({'user-token':`${token}`});
    const putData = {'name':name,'email':email};
    return this.http.put<userForAuth>(`/api/users/${userId}`,putData,{headers:header});
  }

  addSong(
    artist: string,
    songName: string,
    label: string,
    imageUrl: string,
    audioUrl: string
  ) {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({ 'user-token': `${token}` });
    const postData = { artist, songName, label, imageUrl, audioUrl };
    return this.http.post<Releases>(`/api/data/releases`, postData, {
      headers: header,
    });
  }

  addToPlaylist(
    artist: string,
    audioUrl: string,
    imageUrl: string,
    label: string,
    songName: string
  ) {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({ 'user-token': `${token}` });
    const postData = { artist, audioUrl, imageUrl, label, songName };
    return this.http.post<Playlists>(`/api/data/playlists`, postData, {
      headers: header,
    });
  }

  getPlayListByUserId() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({ 'user-token': `${token}` });
    return this.http.get<Playlists[]>(`/api/data/playlists?where=ownerId='${userId}'`,{headers:header});
    
  }

  deleteById(id:string) {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({'user-token':`${token}`});
    return this.http.delete<Playlists>(`/api/data/playlists/${id}`,{headers:header});
  }

  updateLikes(id:string,data:string[]) {
    return this.http.put<Releases[]>(`/api/data/releases/${id}`,{"likes":data})
  }
  

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
