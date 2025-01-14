import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Table } from '../models/table.model';
import { ErrorResponse } from '../models/errorresponse.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private apiUrl = `${environment.API_URL}/tables`;

  constructor(private http: HttpClient) { }

  createTable(table: Table): Observable<{ error?: ErrorResponse }> {
    return this.http.post<{ error?: ErrorResponse }>(this.apiUrl, table);
  }

  getTables(): Observable<{ data: Table[]; error?: ErrorResponse }> {
    return this.http.get<{ data: Table[]; error?: ErrorResponse }>(this.apiUrl);
  }

  getTableById(id: string): Observable<{ data?: Table; error?: ErrorResponse }> {
    return this.http.get<{ data?: Table; error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }

  updateTable(id: string, table: Table): Observable<{ error?: ErrorResponse }> {
    return this.http.put<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`, table);
  }

  deleteTable(id: string): Observable<{ error?: ErrorResponse }> {
    return this.http.delete<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }
}
