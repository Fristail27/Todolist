export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

type ActionsType = SetAppStatusActionType | setErrorActionType

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetAppStatusActionType = {
    type: 'APP/SET-STATUS';
    status: RequestStatusType;
}
export const setAppStatusAC = (status:RequestStatusType):SetAppStatusActionType => ({type: 'APP/SET-STATUS', status})
export type setErrorActionType = {
    type: 'APP/SET-ERROR'
    error: string | null
}
export const setAppErrorAC = (error: string| null):setErrorActionType => ({type: 'APP/SET-ERROR', error})