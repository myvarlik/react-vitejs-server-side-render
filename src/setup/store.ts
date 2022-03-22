import { compose, createStore as createStoreProvider } from 'trim-redux';

interface DefaultStateInterface {
    [key: string]: any
}

export const defaultState: DefaultStateInterface = {
    test: "null",
}

let composeEnhancer = compose;

export const createStore = (state = { ...defaultState }) => createStoreProvider(state, composeEnhancer);

export const clientCreateStore = function () {
    let states;

    if (window.UPDATED_REDUX_STATES !== undefined) {
        states = {
            ...defaultState,
            ...window.UPDATED_REDUX_STATES
        };
        delete window.UPDATED_REDUX_STATES;
    }

    return createStore(states);
}