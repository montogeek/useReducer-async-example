export const initialState = {
  data: [],
  loading: false,
  error: "",
  currentConference: "Conference"
};

export function reducer(state, action) {
  switch (action.type) {
    case "FETCH_CONFERENCES_REQUESTED":
      return { ...state, loading: true };
    case "FETCH_CONFERENCES_SUCCEEDED":
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case "FETCH_CONFERENCES_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "SET_CONFERENCE":
      return { ...state, currentConference: action.payload };
    default:
      throw new Error();
  }
}
