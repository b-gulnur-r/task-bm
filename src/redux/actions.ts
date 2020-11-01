export const SEARCH_CREW = "SEARCH_CREW"
export const ADD_MY_ADDRESS = "ADD_MY_ADDRESS"
export const CREATE_ORDER = "CREATE_ORDER"

export function searchCrew (data: any) {
    return {
        type: SEARCH_CREW,
        payload: data,
    }
}

export function addMyAddress (data: MyAddressType) {
    return {
        type: ADD_MY_ADDRESS,
        payload: data,
    }
}

export function createOrder (data: MyOrdersType) {
    return {
        type: CREATE_ORDER,
        payload: data,
    }
}