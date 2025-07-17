import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Auth,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { GithubAuthProvider, setPersistence } from 'firebase/auth';
import { from, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private isAuth = false;
  private token!: any;
  private expireTokenTime: any;
  private userId: any;
  private emailAddress: any;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    public http: HttpClient,
    public route: Router,
    public matSnackBar: MatSnackBar,
    private firebaseAuth: Auth,
  ) {
    this.setSessionStoragePersistence();
    this.user$ = user(this.firebaseAuth);
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {
      //
    });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      sessionStorage.clear();
    });
    return from(promise);
  }
  async googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.firebaseAuth, provider);
      const user = result.user;
      if (!user) {
        throw new Error('Google-Login error');
      }
      this.setAuthInformation(user);
    } catch (error) {
      console.error('Google-Login error:', error);
      throw error;
    }
  }
  async githubLogin(): Promise<void> {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(this.firebaseAuth, provider);
      const user = result.user;
      if (!user) {
        throw new Error('Github-Login error');
      }
      this.setAuthInformation(user);
    } catch (error) {
      console.error('Github-Login error', error);
      throw error;
    }
  }

  private setAuthInformation(user: User) {
    this.setEmail(user.email);
  }

  getToken() {
    return this.token;
  }

  getIsAuth(): boolean {
    if (this.user$) return true;
    return false;
  }
  getUSerId() {
    return this.userId;
  }

  getEmail() {
    return this.emailAddress;
  }
  setEmail(email: any) {
    this.emailAddress = email;
  }

  onSignUp(body: any) {
    console.log(body);
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post(this.apiUrl + '/USER/SIGN_UP', {
          ...body,
          name: body.fullname,
          userFirstSignUp: 'no',
        })
        .subscribe(
          (res: any) => {
            this.matSnackBar.open(res.message, '', { duration: 1000 });
            this.token = res.data.token;
            this.isAuth = true;
            this.expireTokenTime = setTimeout(() => {
              this.onLogout();
            }, res.data.expiredToken * 1000);
            this.emailAddress = body.gmail;
            this.userId = res.data.userId;

            this.route.navigate(['dashboard']);
            resolve(true);
          },
          (err: any) => {
            this.matSnackBar.open(err.error.message, '', { duration: 300 });
            this.isAuth = false;
            reject(false);
          },
        );
    });
  }

  onLogIn(body: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(this.apiUrl + '/USER/LOGIN', body).subscribe(
        (res: any) => {
          this.matSnackBar.open(res.message, '', { duration: 300 });
          this.token = res.data.token;
          this.isAuth = true;
          this.expireTokenTime = setTimeout(() => {
            this.onLogout();
          }, res.data.expiredToken * 1000);
          this.emailAddress = body.gmail;
          this.userId = res.data.userId;

          this.route.navigate(['dashboard']);
          resolve(true);
        },
        (err: any) => {
          this.matSnackBar.open(err.error.message, '', { duration: 300 });
          this.isAuth = false;
          reject(false);
        },
      );
    });
  }
  onLogout() {}

  private saveAuthDataOnLocalStorage(time: any, userId: any) {}

  updateUserData(id: string, body: any) {}

  saveAllData(body: any) {}

  deleteUserAccount() {}

  onGetAppVersion() {}

  private onCollectSource(body: any) {}
  saveSource(email: string, action: string, source: string) {}
  onProvideFeedBack(body: any) {}
  onConfirmAccess(body: any) {}
}
