import Base from './Base'

export default class Student extends Base {

  getStudentList = async () => {
    return this.sendRequest({
      path: `/api/v2/students`,
      method: 'GET'
    });
  };

  addStudent = async (data) => {
    return this.sendRequest({
      path: `/api/v2/students`,
      method: 'POST',
      data
    });
  };

  getStudentAttendance = async (id) => {
    return this.sendRequest({
      path: `/api/v2/attendance/get_student_attendance/${id}`,
      method: 'GET'
    });
  };
}