import {
    FETCHING_ATTENDEES,
    ATTENDEES_FETCH_FAILURE,
    ATTENDEES_FETCH_SUCCESS,
    SET_ATTENDEE
} from '../../ActionTypes';

const INITIAL_STATE = {
    isLoading: false,
    attendees: [],
    selectedAttendee: null
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

        case SET_ATTENDEE:
            return {
                ...state,
                selectedAttendee: action.attendee
            };

        default:
            return state;
    }
};
