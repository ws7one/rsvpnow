import {
    AGE_RANGE_DATA_SUCCESS,
    LOCALITIES_COUNT_SUCCESS,
    CALCULATING_REPORTS,
    AVG_GROUP_DATA_SUCCESS,
    EMPLOYED_COUNT_SUCCESS,
    REPORTS_FAILED
} from '../../ActionTypes';

const INITIAL_STATE = {
    isLoading: false,
    age_range: null,
    localities_count: null,
    avg_group_size: null,
    employed_count: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CALCULATING_REPORTS:
            return {
                ...state,
                isLoading: true
            };

        case AGE_RANGE_DATA_SUCCESS:
            return {
                ...state,
                age_range: action.payload,
                isLoading: false
            };

        case LOCALITIES_COUNT_SUCCESS:
            return {
                ...state,
                localities_count: action.payload,
                isLoading: false
            };

        case AVG_GROUP_DATA_SUCCESS:
            return {
                ...state,
                avg_group_size: action.payload,
                isLoading: false
            };

        case EMPLOYED_COUNT_SUCCESS:
            return {
                ...state,
                employed_count: action.payload,
                isLoading: false
            };

        case REPORTS_FAILED:
            return {
                ...state,
                error: true,
                isLoading: false
            };

        default:
            return state;
    }
};
