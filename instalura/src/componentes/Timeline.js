import React, { Component } from 'react';
import FotoItem from './Foto';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TimelineDispatcher from '../dispatchers/TimelineDispatcher';
import {connect} from 'react-redux';

class Timeline extends Component {

    constructor(props) {

        super(props);       

        this.state = {fotos: []};        
    }

    componentWillMount() {

        this.props.store.subscribe(() => this.setState({ fotos: this.props.store.getState().timeline }));
        
        this._carregarFotosDeAcordoComUrlEPropriedade();        
    }  

    _carregarFotosDeAcordoComUrlEPropriedade() {

        let usuario = (this.props.usuario !== undefined) ? this.props.usuario : '';
        this._carregarFotos(usuario);        
    }
    
    componentWillReceiveProps(nextProps) {

        if(nextProps.usuario !== undefined && nextProps.usuario !== this.usuario)  {

            this.usuario = nextProps.usuario;
            this._carregarFotos(this.usuario);
        }     
            
    }

    _carregarFotos(usuario) {

        this.props.carregarFotos(usuario);                    
    }

    render() {            
        
        return (                   
                    <div className="fotos container">
                        <TransitionGroup>
                            {
                                this.props.fotos.map(foto => {

                                    return (   
                                        <CSSTransition key={foto.id} timeout={500} classNames="fade">                                 
                                            <FotoItem foto={foto} curtirFoto={this.props.curtirFoto} comentarFoto={this.props.comentarFoto} fotoService={this.props.fotoService} curtida={(foto.likers.find(liker => this.props.usuarioService.obterUsuarioLogado() == liker.login) !== undefined) ? true : false} />
                                        </CSSTransition>
                                    );
                                })
                            }                
                        </TransitionGroup>
                    </div>                        
        );        
    }
}

const mapStateToProps = state => {

    return  { fotos: state.timeline };
};

const mapDispatchToProps = dispatch => {

    return {
        curtirFoto: fotoId => dispatch(TimelineDispatcher.curtirFoto(fotoId)),
        comentarFoto: (fotoId, textoComentario) => dispatch(TimelineDispatcher.comentarFoto(fotoId, textoComentario)),
        carregarFotos: usuario => dispatch(TimelineDispatcher.carregarFotos(usuario))
    };
};

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;