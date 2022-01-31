import { Component } from "react";
import { Redirect } from "react-router-dom";
import userService from "../../services/user.service";
import ICourseQualification from "../../types/course-qualification.type";

type Props = {
};


type State = {
    redirect: string | null,    
    courseId: string | null,
    courseQualifications: ICourseQualification | null
}



export default class Qualifications extends Component<Props, State> {

    private params: any;

    constructor(props: Props) {
        super(props);
        
        this.params = this.props;   

        this.state = {
            redirect: null,            
            courseId: null,
            courseQualifications: null
        };
    }

    componentDidMount() {                    
        const { courseId } = this.params.match.params;

        userService.getQualifications(Number(courseId)).then(result => {
            if (result) {                
                this.setState({ courseId: courseId, courseQualifications: result })
            }
        })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { courseQualifications } = this.state;

        return (                        
            <div className="container">
                    <div>
                        <header className="jumbotron">
                            <h3>
                                Calificaciones Curso : {courseQualifications?.course?.name}
                            </h3>
                        </header>
                        <ul>
                            {courseQualifications && courseQualifications.qualifications && courseQualifications.qualifications.map((qualification, index) => <li key={qualification.id}>{qualification.qualification}</li>)}
                        </ul>
                    </div> 
            </div>
        );
    }
}
