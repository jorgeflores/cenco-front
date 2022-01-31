import api from './api-interceptor.service';

const ENDPOINT_PATH = '/users';

class UserService {

  getCourses() {
    return api.get(`${ENDPOINT_PATH}/courses`).then(response => {
      return response.data.data;
    });
  }

  getQualifications(courseId : number) {
    return api.get(`${ENDPOINT_PATH}/courses/${courseId}/qualifications`).then(response => {
      return response.data.data;
    });
  }

  createStudent(username : string, name : string, password : string) {
    const body = {
      username,
      name,
      password
    }
    return api.post(`${ENDPOINT_PATH}/student`, body).then(response => {
      return response.data.data;
    });
  }
  
  getStudents() {
    return api.get(`${ENDPOINT_PATH}/students`).then(response => {
      return response.data.data;
    });
  }
}

export default new UserService();
