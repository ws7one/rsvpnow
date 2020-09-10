import {
    CHANGE_MESSAGE,
    IS_SUBMITTING_RSVP,
    SUBMIT_RSVP_SUCCESS,
    SUBMIT_RSVP_FAILURE
} from '../../ActionTypes';

const INITIAL_STATE = {
    message: '',
    isLoading: false,
    data: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_MESSAGE:
            return {
                ...state,
                message: action.message
            };

        case IS_SUBMITTING_RSVP:
            return {
                ...state,
                isLoading: true
            };

        case SUBMIT_RSVP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data,
                message: "RSVP'ed successfully."
            };

        case SUBMIT_RSVP_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: null,
                error: true,
                message: 'Something went wrong. Please try again'
            };

        default:
            return state;
    }
};
