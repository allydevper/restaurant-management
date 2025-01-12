import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private apiUrl = 'http://localhost:3000/dishes';

  constructor(private http: HttpClient) { }

  createDish(dish: any): Observable<any> {
    return this.http.post(this.apiUrl, dish);
  }

  getDishes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateDish(id: string, dish: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
