import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResultSearchModel } from '../models/result-search.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDatas(limit: number, month: number, year: number): Observable<ResultSearchModel> {
    return this.http.get<ResultSearchModel>(`${this.baseUrl}/list`, {
      params: {
        limit: limit,
        offset: 0,
        testType: 'ca-test',
        subjects: '',
        month: month,
        year: year
      }
    });
  }


}
