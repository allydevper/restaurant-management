import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';
import { ErrorResponse } from '../models/errorresponse.model';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = `${import.meta.env.NG_APP_PUBLIC_API_URL}/dishes`;
  }

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
