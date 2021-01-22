
interface Store<
    S = any,
> {
    getState(): S,
    dispatch: Dispatch,
    subscribe(listener:() => void): Unsubscribe
}

interface Unsubscribe {
    (): void
}

type Dispatch<A extends Action = AnyAction> = (A) => A

interface Action {
    type: string,
}

// action默认值
interface AnyAction extends Action {
    [extraProps:string]: any
}

type Reducer<S = any, A extends Action = AnyAction> = (
    state: S, 
    action:A
) => S


function createStore<
    S = any,
    A extends Action = AnyAction
>(reducer:Reducer<S, A>, initialStore:S, enhancer):Store {
    if (typeof enhancer === 'function') {
        return enhancer(createStore)(
            reducer, 
            initialStore
        ) as Store
    }
    let state:S = initialStore
    let listeners:(()=>void)[] = []
    let isDispatching:Boolean = false

    const getState:() => S = () => {
        return state as S
    }

    const dispatch: (A) => A = (action:A) => {
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
        return action as A
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

    dispatch({
        type: 'init_' + Math.random()
    } as Action)

    return {
        dispatch,
        getState,
        subscribe
    } as Store
}