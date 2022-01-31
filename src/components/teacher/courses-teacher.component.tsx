import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import coursesService from "../../services/courses.service";
import ICourse from "../../types/course.type";

type Props = {};

type State = {  
  userReady: boolean,  
  courses: ICourse[]
}
export default class CoursesTeacher extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      userReady: false,      
      courses: []
    };
  }

  componentDidMount() {
  
    coursesService.getCourses().then((courses) => {
        if(courses) {
            this.setState({courses: courses, userReady: true});
        }
    });

  }

  getAcciones(course : ICourse) {
      return <div>
          <Link to={`/admin/mis-cursos/${course.id}/estudiantes`} className="p-2">Ver Estudiantes Inscritos</Link> |
          <Link to={`/admin/mis-cursos/${course.id}/inscribir`} className="p-2">Inscribir Estudiante</Link> |          
      </div>
  }

  render() {
    
    const { courses } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                Mis Cursos
              </h3>
            </header>  
            <div className="btn-group">                
                <Link to={`/admin/mis-cursos/crear-curso`} className="btn btn-primary mb-2">Crear curso</Link>                
            </div>                                  
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Acciones</th>                  
                </tr>
              </thead>
              <tbody>
                { courses && courses.map((course, index) => {
                  return <tr key={course.id}><th scope="row">{course.id}</th><td>{course.name}</td><td> { this.getAcciones(course) }</td></tr>
                })}                
              </tbody>
            </table>
          </div> : null}
      </div>
    );
  }
}