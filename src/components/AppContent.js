import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
// import { useSelector } from 'react-redux'


// routes config
import routes from '../routes'

const AppContent = () => {
  console.log("Tracking... AppContent.js")
      
  // let isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
    
  // const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  //   <Route {...rest} render={(props) => (
  //     !isAuthenticated
  //       ? <Component {...props} />
  //       : <Redirect to='/' />
  //   )} />
  // );
  
  // const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  //   <Route {...rest} render={(props) => (
  //     isAuthenticated
  //       ? <Component {...props} />
  //       : <Redirect to='/login' />
  //   )} />
  // );

  return (
    <CContainer fluid>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/landing" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
