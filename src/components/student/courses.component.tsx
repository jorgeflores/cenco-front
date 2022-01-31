import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import userService from "../../services/user.service";
import ICourse from "../../types/course.type";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,  
  courses: ICourse[]
}
export default class Courses extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,      
      courses: []
    };
  }

  componentDidMount() {
  
    userService.getCourses().then((courses) => {
        if(courses) {
            this.setState({courses: courses, userReady: true});
        }
    });

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Notas</th>                  
                </tr>
              </thead>
              <tbody>
                { courses && courses.map((course, index) => {
                  return <tr key={course.id}><th scope="row">{course.id}</th><td>{course.name}</td><td><Link to={`mis-cursos/${course.id}/calificaciones`} className="nav-link">Ver Notas</Link></td></tr>
                })}                
              </tbody>
            </table>
          </div> : null}
      </div>
    );
  }
}
