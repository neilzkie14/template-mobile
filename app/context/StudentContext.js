import React, {Component} from 'react';
import Student from '../api/Student';
export const StudentContext = React.createContext();

export class StudentContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      student: null,
      loading: true,
      students: null
    };
  }

  componentDidMount = () => {};

  setStudent = student => {
    this.setState({student});
  };

  setStudents = (student) => {
    this.setState({students: student})
  }

  refreshStudent = async () => {
    let response = await new Student().getStudentList()
    if (response.ok) {
      this.setState({students: response.data});
    }else{
      alert('Something went wrong in fetching Students');
    }
  }

  render() {
    const {children} = this.props;
    const {student, loading} = this.state;
    return (
      <StudentContext.Provider
        value={{
          data: {
            student: student,
            setStudent: this.setStudent,
            students: this.state.students,
            setStudents: this.setStudents,
            refreshStudent: this.refreshStudent,
          },
        }}>
        {children}
      </StudentContext.Provider>
    );
  }
}

export default StudentContextProvider;
