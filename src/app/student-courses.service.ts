import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentCourses } from './StudentCourses';

@Injectable({
  providedIn: 'root',
})
export class StudentCoursesService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getStudentCourses(
    sid: number,
    status: string
  ): Observable<StudentCourses[]> {
    return this.http.get<StudentCourses[]>(
      `${this.apiServerUrl}/studentCourses/getStudentCourses/${sid}`,
      {
        params: {
          status: status,
        },
      }
    );
  }
  public getCredits(sid: number, status: string): Observable<number> {
    return this.http.get<number>(
      `${this.apiServerUrl}/studentCourses/getCredits/${sid}`,
      {
        params: {
          status: status,
        },
      }
    );
  }
}
