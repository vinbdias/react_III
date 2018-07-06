import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/reset.min.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import UsuarioService from './services/UsuarioService';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import TimelineReducer from './reducers/TimelineReducer';
import HeaderReducer from './reducers/HeaderReducer';
import {Provider} from 'react-redux';

const usuarioService = new UsuarioService();

const reducers = combineReducers({timeline: TimelineReducer.main, header: HeaderReducer.main});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" render={(props) => usuarioService.obterToken() ? (<App {...props} />) : (<Login />)} />  
                <Route path="/login" component={Login} />  
                <Route path="/logout" component={Logout} />  
                <Route path="/timeline/:usuario?" render={(props) =>
                    ((props.match.params.usuario !== undefined) || (props.usuario !== undefined) || usuarioService.obterToken()) ?
                    (<App {...props} />) :
                    (<Login mensagem="Favor autenticar para acessar o endereço" />)} />                
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();