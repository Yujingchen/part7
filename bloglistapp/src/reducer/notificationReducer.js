const initialState = {notification:'', error:''}
let notificationOn = false

const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {...state, notification: action.data}
        case 'CLEAR_NOTIFICATION':
            return {notification: '', error:''}
        case 'SET_ERROR_MESSAGE':
            return {...state, error: action.data}
        default:
            return state
    }
}

export const setNotification = (message) => {
    return async dispatch => {
        notificationOn = true
        dispatch({
            type: "SET_NOTIFICATION",
            data: message
        })
    }
}

export const setErorrMessage = (message) => {
    return async dispatch => {
        notificationOn = true
        dispatch({
            type: "SET_ERROR_MESSAGE",
            data: message
        })
    }
}

export const clearNotification = (delay) => {
    const delayTime = delay * 1000
    return async dispatch => {
        const timer = setTimeout(()=>{
            dispatch({
                type:'CLEAR_NOTIFICATION'
            })
            notificationOn = false
        }, delayTime)

        // if(notificationOn) {
        //     clearTimeout(timer)
        // }
    }
}

export default reducer