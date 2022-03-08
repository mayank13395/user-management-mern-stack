import { CircularProgress } from '@material-ui/core'
import React, {
  Suspense, useCallback, useEffect, useState,
} from 'react'
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import AuthPage from './pages/AuthPage'
// import Dashboard from './pages/Dashboard'
// import EditProfile from './pages/EditProfile'
// import NotFoundPage from './pages/NotFoundPage'
import { IUser } from './types/user'

const Dashboard = React.lazy(() => import(/* webpackChunkName: "Dashboard" */ './pages/Dashboard'))
const EditProfile = React.lazy(() => import(/* webpackChunkName: "EditProfile" */ './pages/EditProfile'))
const NotFoundPage = React.lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFoundPage'))

function App() {
  const [user, setUser] = useState<any>({})

  const handleSetUser = useCallback((user: IUser) => {
    setUser(user)
  }, [user])

  const storageChange = () => {
    console.log('OnStorage Change:-')

    // listen for token changes in local storage
    const token = JSON.parse(localStorage.getItem('token') as string)
    console.log('token changed:-', token)
    if (!token) {
      setUser({})
    }
  }

  useEffect(() => {
    window.onstorage = storageChange
    return () => {
      window.removeEventListener('storage', storageChange)
    }
  })

  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Dashboard}
              data={{
                user,
                handleSetUser,
              }}
            />
            <Route exact path="/auth" component={AuthPage} />
            <PrivateRoute
              exact
              path="/edit-profile"
              component={EditProfile}
              data={{
                userProfile: user,
              }}
            />
            <Route exact path="**" component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
