import FotoService from "../services/FotoService";
import ActionCreator from "../actions/ActionCreator";

export default class TimelineDispatcher {

    static carregarFotos(usuario) {

        return dispatch => {

            new FotoService().obterFotos(usuario)
            .then(fotos => {

                dispatch(ActionCreator.listagem(fotos));

                return fotos;
            })
            .catch(erro => console.log(erro));        
        }
    }

    static curtirFoto(fotoId) {        

        return dispatch => {

            new FotoService().curtirFoto(fotoId)
            .then(usuarioCurtiu => {

                dispatch(ActionCreator.curtida(fotoId, usuarioCurtiu));

                return usuarioCurtiu;
            })            
            .catch(erro => console.log(erro));  
        }
    }

    static comentarFoto(fotoId, textoComentario) {

        return dispatch => {

            new FotoService().comentarFoto(fotoId, textoComentario)
            .then(novoComentario => dispatch(ActionCreator.comentario(fotoId, novoComentario)))  
            .catch(erro => console.log(erro)); 
        }            
    }

    static pesquisarFotos(termoPesquisa) {

        return dispatch => {

            new FotoService().pesquisarFotos(termoPesquisa)
            .then(fotos => {

                if(fotos.length === 0)
                    dispatch(ActionCreator.notifica('Usuário não encontrado'));
                else
                    dispatch(ActionCreator.notifica(''));

                dispatch(ActionCreator.pesquisa(fotos));
                return fotos;
            })
            .catch(erro => console.log(erro)); 
        }       
    }

}