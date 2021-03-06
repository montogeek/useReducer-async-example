export const SET_PAGESIZE = "SET_PAGESIZE";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const RESET_PAGE = "RESET_PAGE";

export const initialState = {
  currentPage: 0,
  pageSize: 3
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_PAGESIZE:
      return { ...state, pageSize: action.payload };
    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case PREVIOUS_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };
    case RESET_PAGE:
      return { ...state, currentPage: 0 };
    default:
      throw new Error();
  }
}
