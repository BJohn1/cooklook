import React  from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Home'
import Login from '../Login'
import Signup from '../SignUp'
/* import Settings from '../Settings' */
import PasswordForgetForm  from '../PasswordForget'
export default ({ doSetCurrentUser }) => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' render={() => <Login doSetCurrentUser={doSetCurrentUser} />} />
        <Route exact path='/signup' render={() => <Signup doSetCurrentUser={doSetCurrentUser} />} /> 
        {/* <Route exact path='/settings' render={() => <Settings doSetCurrentUser={doSetCurrentUser} />} /> */}
        <Route exact path='/password-forget' component={PasswordForgetForm} />
      </Switch>
)