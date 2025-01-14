import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { User } from '../models/user.model';
import { ErrorResponse } from '../models/errorresponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/users`;

  constructor(private http: HttpClient) { }

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
}
