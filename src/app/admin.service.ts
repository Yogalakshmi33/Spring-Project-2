import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  registerPlacement(placementData: any): Observable<any> {
    return this.http.post<any>(`${this.API}/Placement`, placementData);
  }

  getPlacements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/Placement`);
  }

  deletePlacement(placementId: any): Observable<any> {
    return this.http.delete<any>(`${this.API}/Placement/${placementId}`);
  }

  updatePlacement(placement: any): Observable<any> {
    return this.http.put<any>(`${this.API}/Placement/${placement.id}`, placement);
  }
}
