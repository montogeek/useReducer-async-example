export const initialState = {
  data: [],
  loading: false,
  error: ""
};

export function reducer(state, action) {
  switch (action.type) {
    case "FETCH_TEAMS_REQUESTED":
      return { ...state, loading: true };
    case "FETCH_TEAMS_SUCCEEDED":
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case "FETCH_TEAMS_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error();
  }
}
