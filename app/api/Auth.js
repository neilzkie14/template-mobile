import Base from './Base';

export default class Auth extends Base {
  login = async data => {
    return this.sendRequest({
      path: `/api/v2/auth/login`,
      method: 'POST',
      data,
    });
  };

  profile = async () => {
    return this.sendRequest({
      path: `/api/v2/auth/profile`,
      method: 'GET',
    });
  };

  register = async data => {
    return this.sendRequest({
      path: `/api/v2/auth/register`,
      method: 'POST',
      data,
    });
  };

  updateProfile = async data => {
    return this.sendRequest({
      path: `/api/v2/auth/update_profile`,
      method: 'PATCH',
      data,
    });
  };

  changePassword = async data => {
    return this.sendRequest({
      path: `/api/v2/auth/change_password`,
      method: 'POST',
      data,
    });
  };
}
