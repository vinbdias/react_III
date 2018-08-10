export default class HttpService {

    constructor() {

        this._publicApiUrl = `http://localhost:8080/api/public/`;
        this._privateApiUrl = `http://localhost:8080/api/`;        
    }

    _handleErrors(res) {

        if(!res.ok) 
            throw new Error(res.statusText);

        switch(res.status) {

            case 403:
                throw new Error(`403, Proibido: ${res.error}` );

            case 404:
                throw new Error(`404, Não encontrado: ${res.error}`);
        
            case 500:
                throw new Error(`500, Erro interno do servidor: ${res.error}`);                

            default:
                return res;
        }        
    }

    get(url) {

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dados) {

        return fetch(url, {

            headers: new Headers({ 'Content-type': 'application/json' }),
            method: 'post',
            body: JSON.stringify(dados)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json())
        .catch(erro => { throw new Error(erro.message) });
    }
}
