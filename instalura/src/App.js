import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import FotoService from './services/FotoService';
import UsuarioService from './services/UsuarioService';
import TimelineStore from './stores/TimelineStore';

export default class App extends Component {

    constructor(props) {

        super(props);

        this.fotoService = new FotoService();
        this.usuarioService = new UsuarioService();
        this.timelineStore = new TimelineStore([]);

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

    render(data) {

        return (
            <div id="root">
                <div data-reactroot="" className="main">
                    <Header fotoService={this.fotoService} />
                    <Timeline usuario={this.state.usuario} usuarioService={this.usuarioService} timelineStore={this.timelineStore} />
                </div>
            </div>
        );
    }
}
