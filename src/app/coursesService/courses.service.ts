import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from './courses';
@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getAllCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(
      `${this.apiServerUrl}/courses/getAllCourses`
    );
  }
  public getCourseById(cid: number): Observable<Courses> {
    return this.http.get<Courses>(
      `${this.apiServerUrl}/courses/getCourseById/${cid}`
    );
  }
  public getCoursesByStatus(inactive: boolean): Observable<Courses[]> {
    return this.http.get<Courses[]>(
      `${this.apiServerUrl}/courses/getCoursesByStatus`,
      {
        params: {
          inactive: inactive,
        },
      }
    );
  }
  public getCoursesByCodeOrName(value: string): Observable<Courses[]> {
    return this.http.get<Courses[]>(
      `${this.apiServerUrl}/courses/getCoursesByCodeOrName`,
      {
        params: {
          value: value,
        },
      }
    );
  }
  public addCourse(course: Courses): Observable<Courses> {
    return this.http.post<Courses>(
      `${this.apiServerUrl}/courses/addCourse`,
      course
    );
  }
  public updateCourse(course: Courses): Observable<Courses> {
    return this.http.put<Courses>(
      `${this.apiServerUrl}/courses/updateCourse`,
      course
    );
  }
  public deleteCourse(cid: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/courses/deleteCourse/${cid}`
    );
  }
}
