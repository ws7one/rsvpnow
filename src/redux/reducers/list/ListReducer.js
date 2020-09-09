import {
    FETCHING_ATTENDEES,
    ATTENDEES_FETCH_FAILURE,
    ATTENDEES_FETCH_SUCCESS
} from '../../ActionTypes';

const INITIAL_STATE = {
    isLoading: false,
    attendees: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_ATTENDEES:
            return {
                ...state,
                isLoading: true
            };

        case ATTENDEES_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                attendees: []
            };

        case ATTENDEES_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                attendees: action.payload
            };

        default:
            return state;
    }
};
