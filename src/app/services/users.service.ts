import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { ErrorResponse } from '../models/errorresponse.model';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = "";

  constructor(private http: HttpClient, private envService: EnvService) { 
    this.apiUrl = `${this.envService.apiUrl}/users`;
  }

  createUser(user: User): Observable<{ error?: ErrorResponse }> {
    return this.http.post<{ error?: ErrorResponse }>(this.apiUrl, user);
  }

  getUsers(): Observable<{ data: User[]; error?: ErrorResponse }> {
    return this.http.get<{ data: User[]; error?: ErrorResponse }>(this.apiUrl);
  }

  getUserById(id: string): Observable<{ data?: User; error?: ErrorResponse }> {
    return this.http.get<{ data?: User; error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: User): Observable<{ error?: ErrorResponse }> {
    return this.http.put<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<{ error?: ErrorResponse }> {
    return this.http.delete<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }

  login(username: string, password: string): Observable<{ data?: User; error?: string }> {
    return this.http.post<{ data?: User; error?: string }>(`${this.apiUrl}/login`, { username, password });
  }
}
