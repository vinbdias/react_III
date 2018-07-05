import React, { Component } from 'react';
import FotoItem from './Foto';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class Timeline extends Component {

    constructor(props) {

        super(props);       

        this.state = {fotos: []};        
    }

    componentWillMount() {

        this.props.timelineStore.subscribe(fotos => this.setState({fotos}));
        
        this._carregarFotosDeAcordoComUrlEPropriedade();        
    }  

    _carregarFotosDeAcordoComUrlEPropriedade() {

        let usuario = (this.props.usuario !== undefined) ? this.props.usuario : '';
        this._carregarFotos(usuario);        
    }
    
    componentWillReceiveProps(nextProps) {

        if(nextProps.usuario !== undefined)       
            this._carregarFotos(nextProps.usuario);
    }

    _carregarFotos(usuario) {

        this.props.timelineStore.carregarFotos(usuario);
    }

    curtirFoto(fotoId) {
        
        this.props.timelineStore.curtirFoto(fotoId);
    }

    comentarFoto(fotoId, textoComentario) {

        this.props.timelineStore.comentarFoto(fotoId, textoComentario);
    }

    render() {            

        return (                   
                    <div className="fotos container">
                        <TransitionGroup>
                            {
                                this.state.fotos.map(foto => {

                                    return (   
                                        <CSSTransition key={foto.id} timeout={500} classNames="fade">                                 
                                            <FotoItem foto={foto} curtirFoto={this.curtirFoto.bind(this)} comentarFoto={this.comentarFoto.bind(this)} fotoService={this.props.fotoService} curtida={(foto.likers.find(liker =>this.props.usuarioService.obterUsuarioLogado()) !== undefined) ? true : false} />
                                        </CSSTransition>
                                    );
                                })
                            }                
                        </TransitionGroup>
                    </div>                        
        );        
    }
}