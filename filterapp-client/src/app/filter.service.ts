import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filter } from './models/filter';

@Injectable({
  providedIn: 'root',
})
// Service to interact with the server API
export class FilterService {
  private apiUrl = 'http://localhost:8080/api/filters'; // URL to web api

  constructor(private http: HttpClient) {}

  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(this.apiUrl);
  }

  getFilter(id: number): Observable<Filter> {
    return this.http.get<Filter>(`${this.apiUrl}/${id}`);
  }

  createFilter(filter: Filter): Observable<Filter> {
    return this.http.post<Filter>(this.apiUrl, filter);
  }

  updateFilter(id: number | undefined, filter: Filter): Observable<Filter> {
    return this.http.put<Filter>(`${this.apiUrl}/${filter.id}`, filter);
  }

  deleteFilter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
