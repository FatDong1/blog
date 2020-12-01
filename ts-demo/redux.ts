
interface Store {

}

interface Action {
    type: string,
    [propName: string]: any
}

function createStore (reducer, initialStore, enhancer) {
    let state = initialStore
    let listeners = []
    let isDispatching = false

    const getState = () => {
        return state
    }

    const dispatch = (action:Action) => {
        if (isDispatching) return
        try {
            isDispatching = true
            state = reducer(state, action)
        } finally {
            isDispatching = false
        }
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
        isDispatching = false
        return action
    }

    const subscribe = (listener) => {
        listeners.push(listener)
        return function unsubscribe () {
            let index = listener.findIndex(item => {
                return item === listener
            })
            listener.splice(index, 1)
        }
    }

    dispatch({type: 'init'})

    return {
        dispatch,
        getState,
        subscribe
    }
}