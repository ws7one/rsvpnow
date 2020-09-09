import {
    FETCHING_ATTENDEES,
    ATTENDEES_FETCH_FAILURE,
    ATTENDEES_FETCH_SUCCESS
} from '../../ActionTypes';
import { getResource } from '../../../services/ApiService';
import { getAttendeesEndpoint } from '../../../services/Endpoints';

export const getAttendees = () => dispatch => {
    dispatch({ type: FETCHING_ATTENDEES });
    getResource(getAttendeesEndpoint)
        .then(data => {
            dispatch({
                type: ATTENDEES_FETCH_SUCCESS,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: ATTENDEES_FETCH_FAILURE
            });
        });
};
