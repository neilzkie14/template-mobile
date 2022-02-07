// import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
// import {API_URL} from '../api/Base';
import Auth from '../api/Auth';
export const UserContext = React.createContext();

export class UserContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true,
    };
  }

  componentDidMount = () => {};

  setUser = user => {
    this.setState({user});
  };

  refreshUser = async () => {
    console.log('Refreshing user');
    await this.setState({loading: true});
    let response = await new Auth().profile();
    if (response.ok) {
      await this.setState({user: response.data});
    } else {
      await this.setState({user: null});
    }
    await this.setState({loading: false});
    return response;
  };

  render() {
    const {children} = this.props;
    const {user, loading} = this.state;
    return (
      <UserContext.Provider
        value={{
          data: {
            user: user,
            setUser: this.setUser,
            refreshUser: this.refreshUser,
          },
        }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
