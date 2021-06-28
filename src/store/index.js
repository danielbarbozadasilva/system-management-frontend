// import as libs
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

// importação dos reducers
import { reducer as toastrReducer } from 'react-redux-toastr'
import SignReducer from './auth/auth.reducer'
import CategoriaReducer from './categoria/categoria.reducer'
import FornecedorReducer from './fornecedor/fornecedor.reducer'
import ProdutoReducer from './produto/produto.reducer'
import ClienteReducer from './cliente/cliente.reducer'

const reducers = combineReducers({
  auth: SignReducer,
  toastr: toastrReducer,
  categoria: CategoriaReducer,
  fornecedor: FornecedorReducer,
  produto: ProdutoReducer,
  cliente: ClienteReducer
})

const middlewares = [thunk, multi]

const compose = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(reducers, compose)

export default store
