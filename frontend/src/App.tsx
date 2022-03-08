import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import NotFoundPage from './pages/NotFoundPage';
import { IUser } from './types/user';

function App() {
  const [user, setUser] = useState<any>({})

  const handleSetUser = (user: IUser) => {
    setUser(user)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PrivateRoute exact path={'/'}
            component={Dashboard}
            data={{
              user,
              handleSetUser
            }}
          />
          <Route exact path={'/auth'} component={AuthPage} />
          <PrivateRoute exact path={'/edit-profile'}
            component={EditProfile}
            data={{
              userProfile: user
            }}
          />
          <Route exact path={'**'} component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
