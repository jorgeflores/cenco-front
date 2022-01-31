import IQualification from "./qualification.type";

export default interface ICourse {
    id?: any | null,
    name?: string | null    
    qualifications?: IQualification[];
  }