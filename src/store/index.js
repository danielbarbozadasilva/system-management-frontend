import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

import { reducer as toastrReducer } from 'react-redux-toastr'
import SignReducer from './auth/auth.reducer'
import categoryReducer from './category/category.reducer'
import providerReducer from './provider/provider.reducer'
import productReducer from './product/product.reducer'
import clientReducer from './client/client.reducer'

const reducers = combineReducers({
  auth: SignReducer,
  toastr: toastrReducer,
  category: categoryReducer,
  provider: providerReducer,
  product: productReducer,
  client: clientReducer
})

const middlewares = [thunk, multi]

const compose = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(reducers, compose)

export default store
