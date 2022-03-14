const SET_AGREEMENT = "SET_AGREEMENT";

let initialState = {
    agreement: false
}

const reducerAgreement = (state = initialState, action) => {
    switch (action.type) {
        case SET_AGREEMENT:
            return {
                ...state,
                agreement: action.agreement
            }
        default:
            return state;
    }
}

export const agreementGetters = {
    getAgreement(state) {
        return state.reducerAgreement.agreement;
    }
}

export const setAgreement = (agreement) => ({ type: SET_AGREEMENT, agreement });


export default reducerAgreement;