export default class HeaderReducer {

    static main(state='', action) {

        switch(action.type) {

            case 'NOTIFICA':

                return action.mensagem;

            default:

                return state;
        }
    }
}