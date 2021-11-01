const initialState = ''
let notificationOn = false

const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'RESET_NOTIFICATION':
            return ''
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

export const clearNotification = (delay) => {
    const delayTime = delay * 1000
    return dispatch => {
        const timer = setTimeout(()=>{
            dispatch({
                type:'CLEAR_NOTIFICATION'
            })
            notificationOn = false
        }, delayTime)
        if(notificationOn) {
            clearTimeout(timer)
        }
    }
}

export default reducer