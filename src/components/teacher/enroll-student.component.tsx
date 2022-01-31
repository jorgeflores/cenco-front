import { ErrorMessage, Field, Form, Formik } from "formik";
import { Component } from "react";
import * as Yup from "yup";
import coursesService from "../../services/courses.service";
import userService from "../../services/user.service";
import IUser from "../../types/user.type";

type Props = {};

type State = {
    studentId: number | null
    students : IUser[] | null,    
    courseId : number | null,
    successful: boolean,
    message: string
}


export default class EnrollStudent extends Component<Props, State> {

    private params: any;

    constructor(props: Props) {
        
        super(props);
        
        this.params = this.props;

        this.handleEnrollStudent = this.handleEnrollStudent.bind(this);

        this.state = {
            studentId: null,
            students : null,
            courseId : null,
            successful: false,
            message: ""
        };
    }

    componentDidMount() {
        const { courseId } = this.params.match.params;

        userService.getStudents().then((students) => {
            if (students) {
                this.setState({ students: students, courseId: courseId });
            }
        });
    }

    validationSchema() {
        return Yup.object().shape({
            studentId: Yup.number()            
            .required("This field is required!")        
        });
      }
    
    handleEnrollStudent(formValue: { studentId: number }) {
        const { studentId } = formValue;
    
        this.setState({
          message: "",
          successful: false
        });
        const { courseId } = this.params.match.params;

        coursesService.enrollStudent(courseId, studentId)
        .then(
          response => {
            this.setState({
              message: "Estudiante se ha inscribido correctamente" ,
              successful: true
            });
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
    }


    render() {        

        const { successful, message, students } = this.state;

        const initialValues = {
            studentId : 0
        };

        return (
            <div className="col-md-12">
            <div className="card card-container">              
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleEnrollStudent}
              >
                <Form>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="name"> Seleccione estudiante </label>                        
                        <Field as="select" name="studentId" className="form-control">
                            <option key='0' value=''></option>
                            {students && students.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
                        </Field>                                              
                        <ErrorMessage
                          name="qualification"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>                      
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                      </div>
                    </div>
                  )}
    
                  {message && (
                    <div className="form-group">
                      <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        );
    }
}