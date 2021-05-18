import { types } from "../types";
import { getToken, getUser } from "../../config/storage";

const INITIAL_STATE = {
    isAdmin: getUser().tipo === '1' || false,
    loading: false,
    token: getToken() || "",
    usuario: getUser() || {},
    registered: false,
    error: []
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case types.SIGN_LOADING:
            state.error = [];
            state.loading = action.status
            return state


        case types.SIGN_IN:
            // atribui apenas o token do back
            state.token = action.data.token

            // atribui apenas o objeto usuario (email, senha, tipo) do back
            state.usuario = action.data.usuario

            // para de carregar
            state.loading = false

            state.isAdmin = action.data.usuario.tipo === '1'

            return state

        case types.SIGN_ERROR:
            const err = [...state.error, action.data]
            state.loading = false
            state.error = err;
            return state

        case types.SIGN_OUT: // disponibiliza na mesa
            state.token = ""
            state.usuario = {}
            state.isAdmin = false
            state.error = []
            return state

        case types.SIGN_UP:
            state.registered = true
            state.token = action.data.token
            state.usuario = action.data.usuario
            state.isAdmin = action.data.usuario.tipo === '1'
            state.loading = false
            return state

        case types.SIGN_UPDATE_REGISTER:
            state.registered = false
            return state;

        default:
            return state;
    }
};

export default reducer;
