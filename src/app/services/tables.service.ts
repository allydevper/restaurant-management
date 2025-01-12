import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private apiUrl = 'http://localhost:3000/tables';

  constructor(private http: HttpClient) { }

  createTable(table: any): Observable<any> {
    return this.http.post(this.apiUrl, table);
  }

  getTables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateTable(id: string, table: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, table);
  }

  deleteTable(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
