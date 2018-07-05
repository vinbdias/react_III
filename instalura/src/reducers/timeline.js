export function timeline (state=[], action) {

    if(action.type === 'LISTAGEM')
        return action.fotos;

    if(action.type === 'COMENTARIO') {

        const fotoEncontrada = state.find(foto => foto.id === action.fotoId);

        console.log(action);

        fotoEncontrada.comentarios.push(action.novoComentario);  
        
        return state;
    }

    if(action.type === 'CURTIDA') {

        const usuarioCurtiu = action.usuarioCurtiu;

        const fotoEncontrada = state.find(foto => foto.id === action.fotoId);        

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
    
        return state;
    }


    return state;
}