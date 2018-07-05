import FotoService from "../services/FotoService";

export default class TimelineApi {

    static carregarFotos(usuario) {

        return dispatch => {
            new FotoService().obterFotos(usuario)
            .then(fotos => {

                dispatch({type: 'LISTAGEM', fotos});

                return fotos;
            })
            .catch(erro => console.log(erro));        
        }
    }

    static curtirFoto(fotoId) {
        return dispatch => {

            new FotoService().curtirFoto(fotoId)
            .then(usuarioCurtiu => {

                dispatch({ type: 'CURTIDA', fotoId, usuarioCurtiu });

                return usuarioCurtiu;
            })            
            .catch(erro => console.log(erro));  
        }
    }

    static comentarFoto(fotoId, textoComentario) {

        return dispatch => {
            new FotoService().comentarFoto(fotoId, textoComentario)
            .then(novoComentario => dispatch({type: 'COMENTARIO', fotoId, novoComentario}))  
            .catch(erro => console.log(erro)); 
        }            
    }

}