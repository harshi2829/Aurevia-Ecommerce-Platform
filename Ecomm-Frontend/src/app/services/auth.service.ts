import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogData } from '../models/userLog.model';
import { RegData } from '../models/userReg.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private baseUrl = "https://aurevia-ecommerce-platform.onrender.com";

  onLog(LogData: LogData) {
    // CHANGED: removed responseType:'text' — now expects JSON
    return this.http.post<any>(`${this.baseUrl}/userLogin`, LogData);
  }

  onReg(RegData: RegData) {
    return this.http.post(`${this.baseUrl}/userRegister`, RegData, {
      responseType: 'text'
    });
  }

  isLogIn(): boolean {
    return localStorage.getItem("user") != null;
  }

  // NEW
  getUser(): any {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // NEW — "harshini" → "H" | "john doe" → "JD" | "john_doe" → "JD"
  getInitials(): string {
    const user = this.getUser();
    if (!user || !user.username) return '?';

    const name = user.username.replace(/_/g, ' ');
    return name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // NEW
  getUsername(): string {
    const user = this.getUser();
    return user?.username || 'Guest';
  }

  getUserId():number{
    const user=this.getUser();
    return user?.id||0;
  }

  // NEW
  logout(): void {
    localStorage.removeItem("user");
  }
}