import React, { Component } from 'react';
import TimelineDispatcher from '../dispatchers/TimelineDispatcher';

export default class Header extends Component {

    constructor(props) {

        super(props);
        this.state = {mensagem: ''};
    }

    componentDidMount() {

        this.props.store.subscribe(() => {

            this.setState({mensagem: this.props.store.getState().header});
        });
    }

    pesquisar(evento) {

        evento.preventDefault();
        this.props.store.dispatch(TimelineDispatcher.pesquisarFotos(this._inputPesquisa.value));
    }

    render() {

        return (
            <header className="header container">
            <h1 className="header-logo">
                Instalura
            </h1>

            <form lpformnum="1" className="header-busca" onSubmit={this.pesquisar.bind(this)}>
                <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this._inputPesquisa = input} />
                <input type="submit" value="Buscar" className="header-busca-submit" />
            </form>

            <nav>
                <ul className="header-nav">
                <li className="header-nav-item">
                    <span>{this.state.mensagem}</span>
                    <a href={null}>
                    ♡
                    </a>
                </li>
                </ul>
            </nav>
            </header>            
        );
    }
}