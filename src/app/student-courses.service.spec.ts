import { TestBed } from '@angular/core/testing';

import { StudentCoursesService } from './student-courses.service';

describe('StudentCoursesService', () => {
  let service: StudentCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
