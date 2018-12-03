import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
    switch(action.type) {
        case 'kurac': 
            return Object.assign({}, state, {
              count: state.kurac + ' od ovce',
            })
            break;
    }
  return state
}

const initialState = { kurac: 'palac' }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore