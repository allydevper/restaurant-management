import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private apiUrl = `${environment.API_URL}/dishes`;

  constructor(private http: HttpClient) { }

  createDish(dish: any): Observable<any> {
    return this.http.post(this.apiUrl, dish);
  }

  getDishes(): Observable<{ data: Dish[]; error: string}> {
    return this.http.get<{ data: Dish[]; error: string}>(this.apiUrl);
  }

  updateDish(id: string, dish: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
