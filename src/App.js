import React from 'react'
import { BrowserRouter,Redirect,  Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './scss/style.scss'


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// class App extends Component {
//   render() {
const App = () => {

    console.log("Tracking... App.js")

    const loading = (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
    
    let isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
    
    const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        !isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
    );
    
    const AuthenticatedRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    );



    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>

            <UnauthenticatedRoute exact path="/login" name="Login Page" component={Login} />
            <UnauthenticatedRoute exact path="/register" name="Register Page" component={Register} />
            <UnauthenticatedRoute exact path="/404" name="Page 404" component={Page404} />
            <UnauthenticatedRoute exact path="/500" name="Page 500" component={Page500} />
            <AuthenticatedRoute exact path="/defaultlayout" name="Home" component={DefaultLayout}  />
            <AuthenticatedRoute path="/" name="Home" component={DefaultLayout}  />
            {/* <AuthenticatedRoute exact path="/defaultlayout" name="Home" render={(props) => <DefaultLayout {...props} />} />
            <AuthenticatedRoute path="/" name="Home"  render={(props) => <DefaultLayout {...props} />} /> */}
            <UnauthenticatedRoute path="/" name="Login" component={Login} />

            {/* <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={(props) => <Register {...props} />}/>
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} /> */}
            {/* <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} /> */}
            {/* <Route exact path="/defaultlayout" name="Home" render={(props) => <DefaultLayout {...props} />} />
            <Route path="/" name="Login" render={(props) => <Login {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
// }  // class component

export default App
