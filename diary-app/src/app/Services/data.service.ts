import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  private apiUrl = 'http://localhost:5041/api';

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${this.apiUrl}/diary`);
  }

  delete(entryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/diary/${entryId}`);
  }
  add(entry: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Diary`, entry);
  }

  uploadImage(image: File, enteryId:string) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<any>(`${this.apiUrl}/Diary/upload/${enteryId}`, formData);
  }
}
