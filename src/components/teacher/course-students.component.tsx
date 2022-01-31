import { Component } from "react";
import { Link } from "react-router-dom";
import coursesService from "../../services/courses.service";
import IStudent from "../../types/student.types";
import IStudentByCourse from "../../types/students-by-course.type";

type Props = {};

type State = {
    userReady: boolean,
    students: IStudentByCourse | null;
}
export default class CourseStudents extends Component<Props, State> {

    private params: any;

    constructor(props: Props) {
        super(props);
        this.params = this.props;

        this.state = {
            userReady: false,
            students: null
        };
    }

    componentDidMount() {

        const { courseId } = this.params.match.params;

        coursesService.getStudentsByCourse(courseId).then((students) => {
            if (students) {
                this.setState({ students: students, userReady: true });
            }
        });

    }

    showQualifications(student: IStudent) {
        return <div>
            {student.qualifications.map(qualification => `| ${qualification.qualification} |`)}
        </div>
    }

    showAddQualificationLink(studentId : number, courseId : string ) {
        return <div>
             <Link to={`/admin/mis-cursos/${courseId}/estudiantes/${studentId}/calificar`} className="p-2">Agregar Calificacion</Link>     
        </div>
    }

    render() {

        const { students } = this.state;

        return (           

            <div className="container">
                    <div>
                        <header className="jumbotron">
                            {students && students.course ?   
                            <h3>Estudiantes Inscritos en {students?.course?.name}</h3> : <h3>No hay estudiantes inscritos</h3>}
                        </header>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Calificaciones</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students && students.students.map((student, index) => {
                                    return <tr key={student.id}><th scope="row">{student.id}</th><td>{student.name}</td><td> {this.showQualifications(student)}</td><td>{this.showAddQualificationLink(student.id, students.course.id)}</td></tr>
                                })}
                            </tbody>
                        </table>
                    </div> 
            </div>
        );
    }
}