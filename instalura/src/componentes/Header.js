import React, { Component } from 'react';
import Pubsub from 'pubsub-js'; 

export default class Header extends Component {

    pesquisar(evento) {

        evento.preventDefault();
        this.props.fotoService
            .pesquisarFotos(this._inputPesquisa.value)
            .then(fotos => Pubsub.publish('timeline', fotos))
            .catch(erro => console.log(erro));
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