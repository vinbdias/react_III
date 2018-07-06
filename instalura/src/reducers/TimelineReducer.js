import {List} from 'immutable';

export default class TimelineReducer {

    static main(state=new List(), action) {

        switch(action.type) {

            case 'LISTAGEM':
            
                return new List(action.fotos);

            case 'COMENTARIO':               
                
                return TimelineReducer.trocarEstadoFoto(state, action.fotoId, fotoEstadoAntigo => {

                    const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario);   
                    return {comentarios: novosComentarios};                                               
                });                 

            case 'CURTIDA': 

                return TimelineReducer.trocarEstadoFoto(state, action.fotoId, fotoEstadoAntigo => {                    

                    const usuarioCurtiu = action.usuarioCurtiu; 
                    const possivelCurtida = 
                    fotoEstadoAntigo
                    .likers
                    .find(usuarioCurtiuAtual => 
                        usuarioCurtiuAtual.login === usuarioCurtiu.login);                        
                    let novasCurtidas;

                    if(possivelCurtida === undefined)
                        novasCurtidas = fotoEstadoAntigo.likers.concat(usuarioCurtiu);
                    else 
                        novasCurtidas = fotoEstadoAntigo.likers.filter(usuarioCurtiuAtual => usuarioCurtiuAtual.login !== usuarioCurtiu.login);                     
                    
                        return {likers: novasCurtidas}
                });   
                
            case 'PESQUISA':

                return new List(action.fotos);
                
            default:
                return state;
        }
    }

    static trocarEstadoFoto(lista, fotoId, callbackAtualizaPropriedades) {

        const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);
        const novasPropriedades = callbackAtualizaPropriedades(fotoEstadoAntigo);
        const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades);            
        const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);

        return lista.set(indiceDaLista, fotoEstadoNovo);
    }
}