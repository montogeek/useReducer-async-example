export const FETCH_CONFERENCES_REQUESTED = "FETCH_CONFERENCES_REQUESTED";
export const FETCH_CONFERENCES_SUCCEEDED = "FETCH_CONFERENCES_SUCCEEDED";
export const FETCH_CONFERENCES_FAILED = "FETCH_CONFERENCES_FAILED";
export const SET_CONFERENCE = "SET_CONFERENCE";

export const INITIAL_CONFERENCE = "Conference";

export const initialState = {
  data: [],
  loading: false,
  error: "",
  currentConference: INITIAL_CONFERENCE
};

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_CONFERENCES_REQUESTED:
      return { ...state, loading: true };
    case FETCH_CONFERENCES_SUCCEEDED:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case FETCH_CONFERENCES_FAILED:
      return { ...state, loading: false, error: action.payload };
    case SET_CONFERENCE:
      return { ...state, currentConference: action.payload };
    default:
      throw new Error();
  }
}
