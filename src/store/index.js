// import as libs
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

// importação dos reducers
import { reducer as toastrReducer } from 'react-redux-toastr'
import SignReducer from './auth/auth.reducer'
import CategoriaReducer from './categoria/categoria.redux'
import FornecedorReducer from './fornecedor/fornecedor.reducer'
import ProdutoReducer from './produto/produto.reducer'

// Importação dos Reduces
const reducers = combineReducers({
  auth: SignReducer,
  toastr: toastrReducer,
  categoria: CategoriaReducer,
  fornecedor: FornecedorReducer,
  produto: ProdutoReducer
})

// middlewares de redux
const middlewares = [thunk, multi]

// compose junta os middlewares e ferramentas de debug

const compose = composeWithDevTools(applyMiddleware(...middlewares))

// criar a store do redux

const store = createStore(reducers, compose)

export default store
