import React, {Component} from 'react';
export const StudentContext = React.createContext();

export class StudentContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      student: null,
      loading: true,
    };
  }

  componentDidMount = () => {};

  setStudent = student => {
    this.setState({student});
  };

  //API FOR STUDENT INFO CONTEXT
  refreshStudent = async () => {
    
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
          },
        }}>
        {children}
      </StudentContext.Provider>
    );
  }
}

export default StudentContextProvider;
