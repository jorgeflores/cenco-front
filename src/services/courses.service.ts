import api from './api-interceptor.service';
import ICourse from "../types/course.type";

const ENDPOINT_PATH = '/courses';

class CoursesService {

  createCourse(name: string): Promise<ICourse> {
    return api.post(ENDPOINT_PATH, { name }).then(result => {
      if (result && result.data) {
        return result.data.data;
      }
      return null;
    });
  }


  getCourses(): Promise<ICourse[]> {
    return api.get(ENDPOINT_PATH).then(result => {
      if (result && result.data) {
        return result.data.data;
      }
      return [];
    });
  }

  getQualifications(courseId: number) {
    return api.get(`${ENDPOINT_PATH}/courses/${courseId}/qualifications`).then(response => {
      return response.data.data;
    });
  }

  getStudentsByCourse(courseId: number) {
    return api.get(`${ENDPOINT_PATH}/${courseId}/students`).then(response => {
      return response.data.data;
    });
  }

  qualifyStudent(courseId: number, studentId: number, qualification: number) {
    const body = {
      studentId,
      qualification
    }
    return api.post(`${ENDPOINT_PATH}/${courseId}/qualifystudent`, body).then(result => {
      if (result && result.data) {
        return result.data.data;
      }
      return null;
    });
  }

  enrollStudent(courseId: number, studentId: number) {
    const body = {
      studentId : [studentId]
    }
    return api.post(`${ENDPOINT_PATH}/${courseId}/addstudents`, body).then(result => {
      if (result && result.data) {
        return result.data.data;
      }
      return null;
    });
  }
}

export default new CoursesService();