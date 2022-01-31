import { ErrorMessage, Field, Form, Formik } from "formik";
import { Component } from "react";
import * as Yup from "yup";
import coursesService from "../../services/courses.service";

type Props = {};

type State = {
    qualification: number | null
    successful: boolean,
    message: string
}


export default class QualifyStudent extends Component<Props, State> {

    private params: any;

    constructor(props: Props) {
        
        super(props);
        
        this.params = this.props;

        this.handleQualifyStudent = this.handleQualifyStudent.bind(this);

        this.state = {
            qualification: null,
            successful: false,
            message: ""
        };
    }

    componentDidMount() {

    }

    validationSchema() {
        return Yup.object().shape({
          qualification: Yup.number()
            .test(
              "len",
              "Nota debe estar entre 1 y 7.",
              (val: any) =>
                val &&
                val > 0 &&
                val <= 7
            )
            .required("This field is required!")        
        });
      }
    
      handleQualifyStudent(formValue: { qualification: string }) {
        const { qualification } = formValue;
    
        this.setState({
          message: "",
          successful: false
        });
        const { courseId, studentId } = this.params.match.params;

        coursesService.qualifyStudent(courseId, studentId, Number(qualification))
        .then(
          response => {
            this.setState({
              message: "Calficación ingresada correctamente" ,
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
            qualification : ""
        };

        return (
            <div className="col-md-12">
            <div className="card card-container">              
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleQualifyStudent}
              >
                <Form>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="name"> Calificacion </label>
                        <Field name="qualification" type="text" className="form-control" />
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