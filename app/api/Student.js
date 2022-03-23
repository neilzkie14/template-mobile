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
}
