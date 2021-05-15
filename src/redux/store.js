import { createStore, applyMiddleware } from 'redux'
import reducers from './reduces'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['navigation'] // navigation不会被存入缓存中，其他会，适用于少部分数据需要实时更新
    whitelist: ['userInfo', 'login', 'converId', 'chatData'] // 适用于大多数数据并不会实时从后台拿数据
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor }
