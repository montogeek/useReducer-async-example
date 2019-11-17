import React, { useEffect, useReducer } from "react";
import {
  FETCH_CONFERENCES_REQUESTED,
  FETCH_CONFERENCES_SUCCEEDED,
  FETCH_CONFERENCES_FAILED,
  initialState as conferencesInitialState,
  reducer as conferencesReducer
} from "../ducks/conferences";
import {
  initialState as paginationInitialState,
  reducer as paginationReducer
} from "../ducks/pagination";
import Pagination from "../components/pagination";

function Conferences() {
  const [state, dispatch] = useReducer(
    conferencesReducer,
    conferencesInitialState
  );

  const [paginationState, paginationDispatch] = useReducer(
    paginationReducer,
    paginationInitialState
  );

  useEffect(() => {
    dispatch({ type: FETCH_CONFERENCES_REQUESTED });

    fetch("https://api.collegefootballdata.com/conferences")
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: FETCH_CONFERENCES_SUCCEEDED,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_CONFERENCES_FAILED,
          payload: error
        });
      });
  }, []);

  const conferencesByPage = state.data.slice(
    paginationState.currentPage * paginationState.pageSize,
    (paginationState.currentPage + 1) * paginationState.pageSize
  );

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Conferences</h1>
      </div>
      <div className="table-responsive">
        {state.loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Abbr.</th>
                  <th>Name</th>
                  <th>Short name</th>
                </tr>
              </thead>
              <tbody>
                {conferencesByPage.map(conference => {
                  return (
                    <tr key={conference.id}>
                      <td>{conference.abbreviation}</td>
                      <td>{conference.name}</td>
                      <td>{conference.short_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {Math.ceil(state.data.length / paginationState.pageSize) !== 0 ? (
              <Pagination
                data={state.data}
                pagination={paginationState}
                dispatch={paginationDispatch}
              />
            ) : (
              "No teams found"
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Conferences;
