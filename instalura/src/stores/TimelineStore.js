import FotoService from "../services/FotoService";
import Pubsub from 'pubsub-js';

export default class TimelineStore {

    constructor(fotos) {

        this._fotoService = new FotoService();
        this.fotos = fotos;
    }

    carregarFotos(usuario) {

        this._fotoService
        .obterFotos(usuario)
        .then(fotos => {

            this.fotos = fotos;
            Pubsub.publish('timeline', this.fotos);        
        })
        .catch(erro => console.log(erro));        
    }

    curtirFoto(fotoId) {

        this._fotoService.curtirFoto(fotoId)
            .then(usuarioCurtiu => {

                const fotoEncontrada = this.fotos.find(foto => foto.id === fotoId);        

                const possivelCurtida = 
                    fotoEncontrada
                    .likers
                    .find(usuarioCurtiuAtual => 
                        usuarioCurtiuAtual.login === usuarioCurtiu.login);
    
                if(possivelCurtida === undefined)
                    fotoEncontrada.likers.push(usuarioCurtiu);
                else {
    
                    const novasCurtidas = fotoEncontrada.likers.filter(usuarioCurtiuAtual => usuarioCurtiuAtual.login !== usuarioCurtiu.login);                                
                    fotoEncontrada.likers = novasCurtidas;                
                }                
    
                Pubsub.publish('timeline', this.fotos);
            })            
            .catch(erro => console.log(erro));   
    }

    comentarFoto(fotoId, textoComentario) {

        this._fotoService
        .comentarFoto(fotoId, textoComentario)
        .then(novoComentario => {

            const fotoEncontrada = this.fotos.find(foto => foto.id === fotoId);

            const novosComentarios = fotoEncontrada.comentarios.push(novoComentario);

            Pubsub.publish('timeline', this.fotos);
        })  
        .catch(erro => console.log(erro));             
    }

    subscribe(callback) {

        Pubsub.subscribe('timeline', (topico, fotos) => callback(fotos));          
    }

}