import { Courses } from './coursesService/courses';
import { Students } from './students';

export class StudentCourses {
  id: number;
  student: Students;
  course: {
    cid: number;
    code: String;
    type: String;
    name: String;
    description: String;
    credits: number;
    semester: String;
    startDate: String;
    endDate: String;
    inactive: boolean;
  };

  year: number;
  grade: String;
  semester: String;
  status: String;
}
