import ICourse from "./course.type";
import IQualification from "./qualification.type";
import IStudent from "./student.types";

export default interface IStudentByCourse {    
    course: ICourse;
    students : IStudent[];
  }