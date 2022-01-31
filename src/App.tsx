import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import EventBus from "./common/EventBus";
import Courses from "./components/student/courses.component";
import Qualifications from "./components/student/qualifications.component";
import CoursesTeacher from "./components/teacher/courses-teacher.component";
import CreateCourses from "./components/teacher/create-course.component";
import CourseStudents from "./components/teacher/course-students.component";
import QualifyStudent from "./components/teacher/qualify-student.component";
import RegisterStudent from "./components/teacher/register-student.component";
import EnrollStudent from "./components/teacher/enroll-student.component";

type Props = {};

type State = {
  showTeacherAuthorities: boolean,
  showsStudentAuthorities: boolean,
  currentUser: IUser | undefined
}



class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showTeacherAuthorities: false,
      showsStudentAuthorities: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    AuthService.getCurrentUser().then(user => {
      if (user) {
        this.setState({
          currentUser: user,
          showTeacherAuthorities: user.roles.includes("TEACHER"),
          showsStudentAuthorities: user.roles.includes("STUDENT"),
        });
      
      }
      EventBus.on("logout", this.logOut);
    });

  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showTeacherAuthorities: false,
      showsStudentAuthorities: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showTeacherAuthorities, showsStudentAuthorities } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            QUALI
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showsStudentAuthorities && (
              <li className="nav-item">
                <Link to={"/mis-cursos"} className="nav-link">
                  Mis Cursos
                </Link>
              </li>
            )}

            {showTeacherAuthorities  && (
              <li className="nav-item">
                <Link to={"/admin/mis-cursos"} className="nav-link">
                  Mis Cursos                  
                </Link>
              </li>
            )}

            {showTeacherAuthorities  && (
              <li className="nav-item">
                <Link to={"/admin/crear-estudiante"} className="nav-link">
                  Registrar Estudiante
                </Link>
              </li>
            )}
           
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">          
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />                      
            {/* students routes */}
            <Route exact path="/mis-cursos" component={Courses} />
            <Route exact path="/mis-cursos/:courseId/calificaciones" component={Qualifications} /> 
            {/* teacher routes */}
            <Route exact path="/admin/crear-estudiante" component={RegisterStudent} />
            <Route exact path="/admin/mis-cursos" component={CoursesTeacher} />
            <Route exact path="/admin/mis-cursos/crear-curso" component={CreateCourses} />
            <Route exact path="/admin/mis-cursos/:courseId/estudiantes" component={CourseStudents} /> 
            <Route exact path="/admin/mis-cursos/:courseId/estudiantes/:studentId/calificar" component={QualifyStudent} />            
            <Route exact path="/admin/mis-cursos/:courseId/inscribir" component={EnrollStudent} />            
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;