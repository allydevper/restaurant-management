import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private apiUrl = `${environment.API_URL}/tables`;

  constructor(private http: HttpClient) { }

  createTable(table: any): Observable<any> {
    return this.http.post(this.apiUrl, table);
  }

  getTables(): Observable<{ data: Table[]; error: string }> {
    return this.http.get<{ data: Table[]; error: string }>(this.apiUrl);
  }

  getTableById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateTable(id: string, table: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, table);
  }

  deleteTable(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
