import { SMART_REDIRECT } from "../types"

export const smartRedirect = (url) => dispatch =>{
    dispatch({type: SMART_REDIRECT, payload: url
})
}
