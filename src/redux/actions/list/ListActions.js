import {
    FETCHING_ATTENDEES,
    ATTENDEES_FETCH_FAILURE,
    ATTENDEES_FETCH_SUCCESS,
    AGE_RANGE_DATA_SUCCESS,
    LOCALITIES_COUNT_SUCCESS,
    AVG_GROUP_DATA_SUCCESS,
    EMPLOYED_COUNT_SUCCESS,
    CALCULATING_REPORTS,
    REPORTS_FAILED,
    SET_ATTENDEE
} from '../../ActionTypes';
import { getResource } from '../../../services/ApiService';
import { getAttendeesEndpoint } from '../../../services/Endpoints';
import { AGE_RANGES, LIST_OF_LOCALITIES } from '../../../constants/enumerations';
import NavigationService from '../../../NavigationService';
import { DETAILS } from '../../../navigators/ScreenNames';

export const getAttendees = () => dispatch => {
    dispatch({ type: FETCHING_ATTENDEES });
    getResource(getAttendeesEndpoint)
        .then(data => {
            dispatch({
                type: ATTENDEES_FETCH_SUCCESS,
                payload: data
            });
            dispatch(calculateReports(data));
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: ATTENDEES_FETCH_FAILURE
            });
        });
};

export const setAttendee = (attendee) => dispatch => {
    dispatch({ type: SET_ATTENDEE, attendee });
    NavigationService.navigate(DETAILS);
};

export const calculateReports = (data = null) => (dispatch, getState) => {
    let list;
    if (!data) {
        list = getState().listReducer.attendees;
    } else {
        list = data;
    }

    dispatch({ type: CALCULATING_REPORTS });
    try {
        const ageRange = {
            [AGE_RANGES.RANGE1]: 0,
            [AGE_RANGES.RANGE2]: 0,
            [AGE_RANGES.RANGE3]: 0,
        };
        const localities = {};
        LIST_OF_LOCALITIES.forEach(locale => {
            localities[locale.label] = 0;
        });
        let totalNumberOfAttendees = 0;
        const employedCount = {
            professional: 0,
            student: 0
        };

        list.forEach(attendee => {
            totalNumberOfAttendees += (attendee.number_of_guests + 1);
            localities[attendee.locality] += 1;
            if (attendee.age >= 13 && attendee.age <= 18) {
                ageRange[AGE_RANGES.RANGE1] += 1;
            } else if (attendee.age >= 19 && attendee.age <= 25) {
                ageRange[AGE_RANGES.RANGE2] += 1;
            } else if (attendee.age > 25) {
                ageRange[AGE_RANGES.RANGE3] += 1;
            }
            if (attendee.employed) {
                employedCount.professional += 1;
            } else {
                employedCount.student += 1;
            }
        });

        const avgGrpCount = totalNumberOfAttendees / 100;

        dispatch({ type: AGE_RANGE_DATA_SUCCESS, payload: ageRange });
        dispatch({ type: LOCALITIES_COUNT_SUCCESS, payload: localities });
        dispatch({ type: AVG_GROUP_DATA_SUCCESS, payload: avgGrpCount.toFixed(2) });
        dispatch({ type: EMPLOYED_COUNT_SUCCESS, payload: employedCount });
    } catch (e) {
        dispatch({ type: REPORTS_FAILED });
    }
};
