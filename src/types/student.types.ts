import IQualification from "./qualification.type";

export default interface IStudent {
    id: number;
    name: string;    
    qualifications : IQualification[];
  }