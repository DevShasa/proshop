import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer } from './reducers/productReducer'

const initialState = {}
const middleware = [thunk]
const reducer  = combineReducers({
        productList: productListReducer
})
const store  = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store 