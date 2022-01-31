import { ErrorMessage, Field, Form, Formik } from "formik";
import { Component } from "react";
import * as Yup from "yup";
import coursesService from "../../services/courses.service";

type Props = {};

type State = {
    name: string | null
    successful: boolean,
    message: string
}


export default class CreateCourses extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleCreateCourse = this.handleCreateCourse.bind(this);
        this.state = {
            name: null,
            successful: false,
            message: ""
        };
    }

    componentDidMount() {

    }

    validationSchema() {
        return Yup.object().shape({
          name: Yup.string()
            .test(
              "len",
              "The username must be between 3 and 20 characters.",
              (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
            )
            .required("This field is required!")        
        });
      }
    
      handleCreateCourse(formValue: { name: string }) {
        const { name } = formValue;
    
        this.setState({
          message: "",
          successful: false
        });
    
        coursesService.createCourse(name)
        .then(
          response => {
            this.setState({
              message: "Curso creado correctamente" ,
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

        const { successful, message } = this.state;

        const initialValues = {
            name : ""
        };

        return (
            <div className="col-md-12">
            <div className="card card-container">              
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleCreateCourse}
              >
                <Form>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="name"> Nombre </label>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>                      
    
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Crear</button>
                      </div>
                    </div>
                  )}
    
                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful ? "alert alert-success" : "alert alert-danger"
                        }
                        role="alert"
                      >
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