import ICourse from "./course.type";
import IQualification from "./qualification.type";

export default interface ICourseQualification {
    course? : ICourse;
    qualifications?: IQualification[];
  }