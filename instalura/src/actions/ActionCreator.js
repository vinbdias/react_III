export default class ActionCreator {

    static listagem(fotos) {

        return {type: 'LISTAGEM', fotos};
    }

    static comentario(fotoId, novoComentario) {

        return {type: 'COMENTARIO', fotoId, novoComentario};
    }

    static curtida(fotoId, usuarioCurtiu) {

        return { type: 'CURTIDA', fotoId, usuarioCurtiu };
    }

    static pesquisa(fotos) {

        return {type: 'PESQUISA', fotos};
    }

    static notifica(mensagem) {

        return {type: 'NOTIFICA', mensagem};
    }
}