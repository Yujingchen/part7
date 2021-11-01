import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from './reducer/blogReducer'
import notificationReducer from './reducer/notificationReducer';

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer
})
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store