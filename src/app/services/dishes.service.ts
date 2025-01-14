import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Dish } from '../models/dish.model';
import { ErrorResponse } from '../models/errorresponse.model';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private apiUrl = `${environment.API_URL}/dishes`;

  constructor(private http: HttpClient) { }

  createDish(dish: Dish): Observable<{ error?: ErrorResponse }> {
    return this.http.post<{ error?: ErrorResponse }>(this.apiUrl, dish);
  }

  getDishes(): Observable<{ data: Dish[]; error?: ErrorResponse }> {
    return this.http.get<{ data: Dish[]; error?: ErrorResponse }>(this.apiUrl);
  }

  getDishesById(id: string): Observable<{ data?: Dish; error?: ErrorResponse }> {
    return this.http.get<{ data?: Dish; error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }

  updateDish(id: string, dish: Dish): Observable<{ error?: ErrorResponse }> {
    return this.http.put<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: string): Observable<{ error?: ErrorResponse }> {
    return this.http.delete<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }
}
