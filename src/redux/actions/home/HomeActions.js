import {
    IS_SUBMITTING_RSVP,
    SUBMIT_RSVP_SUCCESS,
    SUBMIT_RSVP_FAILURE,
    CHANGE_MESSAGE
} from '../../ActionTypes';
import { getResource } from '../../../services/ApiService';
import { submiteRsvpEndpoint } from '../../../services/Endpoints';

export const submitRsvp = (data) => dispatch => {
    dispatch({ type: IS_SUBMITTING_RSVP });
    getResource(submiteRsvpEndpoint)
        .then(() => {
            dispatch({ type: SUBMIT_RSVP_SUCCESS, data });
        })
        .catch(() => {
            dispatch({ type: SUBMIT_RSVP_FAILURE });
        });
};

export const changeMessage = (message) => dispatch => {
    dispatch({ type: CHANGE_MESSAGE, message });
};
