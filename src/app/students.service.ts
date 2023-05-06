import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Students } from './students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getAllStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(
      `${this.apiServerUrl}/students/getAllStudents`
    );
  }
  public getStudentById(sid: number): Observable<Students> {
    return this.http.get<Students>(
      `${this.apiServerUrl}/students/getStudentById/${sid}`
    );
  }
  public getStudentsByStatus(status: boolean): Observable<Students[]> {
    return this.http.get<Students[]>(
      `${this.apiServerUrl}/students/getStudentsByStatus`,
      {
        params: {
          inactive: status,
        },
      }
    );
  }

  public getStudentByIdOrName(
    id: number,
    name: string
  ): Observable<Students[]> {
    return this.http.get<Students[]>(
      `${this.apiServerUrl}/students/getStudentByIdOrName`,
      {
        params: {
          sid: id,
          fname: name,
          lname: name,
        },
      }
    );
  }

  public addStudents(students: Students): Observable<Students> {
    return this.http.post<Students>(
      `${this.apiServerUrl}/students/addStudent`,
      students
    );
  }
  public updateStudents(students: Students): Observable<Students> {
    return this.http.put<Students>(
      `${this.apiServerUrl}/students/updateStudent`,
      students
    );
  }
  public deleteStudent(sid: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/students/deleteStudent/${sid}`
    );
  }
}
