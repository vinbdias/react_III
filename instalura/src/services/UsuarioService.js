import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {

    autenticar(dadosAutenticacaoUsuario) {
        return fetch(`${this._publicApiUrl}login`, {
    
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: 'post',
            body: JSON.stringify(dadosAutenticacaoUsuario)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.text())
        .catch(erro => { throw new Error('Não foi possível autenticar o usuário.'); });      
    }

    obterToken() {

        if(localStorage.getItem('auth-token') !== null)
            return localStorage.getItem('auth-token');

        return false;          
    }

    obterUsuarioLogado() {

        if(localStorage.getItem('usuarioLogado') !== null)
            return localStorage.getItem('usuarioLogado');

        return '';          
    }

    removerToken() {

        localStorage.removeItem('auth-token');
    }
}