import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import FotoService from './services/FotoService';
import UsuarioService from './services/UsuarioService';

export default class App extends Component {

    constructor(props) {
                
        super(props);

        this.fotoService = new FotoService();
        this.usuarioService = new UsuarioService();        

        let usuario = '';
        if(this.props.usuario !== undefined)
            usuario = this.props.usuario;
        else if(this.props.match.params.usuario !== undefined)
            usuario = this.props.match.params.usuario;

        this.state = { usuario: usuario };    
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.match.params.usuario !== undefined)
           this.setState({ usuario: nextProps.match.params.usuario });
    }

    render() {

        return (
            <div id="root">
                <div data-reactroot="" className="main">
                    <Header fotoService={this.fotoService} store={this.context.store} />
                    <Timeline usuario={this.state.usuario} usuarioService={this.usuarioService} store={this.context.store} />
                </div>
            </div>
        );
    }
}

App.contextTypes = {

    store: PropTypes.object.isRequired
};
