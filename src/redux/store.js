import { createStore } from 'redux'
import { reducers } from './reducers/index'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   console.log('changeState received type: ' + type);
//   console.log('changeState received rest: ' + JSON.stringify(rest));
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// // const store = createStore(changeState)

const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store
