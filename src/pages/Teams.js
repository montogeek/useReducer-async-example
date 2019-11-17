import React, { useReducer, useEffect } from "react";
import {
  FETCH_CONFERENCES_REQUESTED,
  FETCH_CONFERENCES_SUCCEEDED,
  FETCH_CONFERENCES_FAILED,
  SET_CONFERENCE,
  INITIAL_CONFERENCE,
  initialState as conferencesInitialState,
  reducer as conferencesReducer
} from "../ducks/conferences";

import {
  RESET_PAGE,
  initialState as paginationInitialState,
  reducer as paginationReducer
} from "../ducks/pagination";

import {
  FETCH_TEAMS_REQUESTED,
  FETCH_TEAMS_SUCCEEDED,
  FETCH_TEAMS_FAILED,
  initialState as teamsInitialState,
  reducer as teamsReducer
} from "../ducks/teams";

import Pagination from "../components/pagination";

function Teams() {
  const [teamsState, teamsDispatch] = useReducer(
    teamsReducer,
    teamsInitialState
  );

  const [conferencesState, conferencesDispatch] = useReducer(
    conferencesReducer,
    conferencesInitialState
  );

  const [paginationState, paginationDispatch] = useReducer(
    paginationReducer,
    paginationInitialState
  );

  useEffect(() => {
    conferencesDispatch({ type: FETCH_CONFERENCES_REQUESTED });

    fetch("https://api.collegefootballdata.com/conferences")
      .then(response => response.json())
      .then(data => {
        conferencesDispatch({
          type: FETCH_CONFERENCES_SUCCEEDED,
          payload: data
        });
      })
      .catch(error => {
        conferencesDispatch({
          type: FETCH_CONFERENCES_FAILED,
          payload: error
        });
      });
  }, []);

  useEffect(() => {
    teamsDispatch({ type: FETCH_TEAMS_REQUESTED });

    const conferenceFilter =
      conferencesState.currentConference !== INITIAL_CONFERENCE
        ? `?conference=${conferencesState.currentConference}`
        : "";

    fetch(`https://api.collegefootballdata.com/teams${conferenceFilter}`)
      .then(response => response.json())
      .then(data => {
        teamsDispatch({
          type: FETCH_TEAMS_SUCCEEDED,
          payload: data
        });
      })
      .catch(error =>
        teamsDispatch({ type: FETCH_TEAMS_FAILED, payload: error })
      );
  }, [conferencesState.currentConference]);

  const teamsByPage = teamsState.data.slice(
    paginationState.currentPage * paginationState.pageSize,
    (paginationState.currentPage + 1) * paginationState.pageSize
  );

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Teams</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <form className="form-inline">
            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
              Filters
            </label>
            {conferencesState.loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <select
                className="custom-select my-1 mr-sm-2"
                onChange={event => {
                  conferencesDispatch({
                    type: SET_CONFERENCE,
                    payload: event.target.value
                  });

                  paginationDispatch({
                    type: RESET_PAGE
                  });
                }}
              >
                <option value="Conference">Conference</option>
                {conferencesState.data.map(conference => {
                  return (
                    <option key={conference.id} value={conference.abbreviation}>
                      {conference.short_name}
                    </option>
                  );
                })}
              </select>
            )}
          </form>
        </div>
      </div>
      <div className="table-responsive">
        {teamsState.loading ? (
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
                  <th></th>
                  <th>Abbr.</th>
                  <th>School</th>
                  <th>Mascot</th>
                  <th>Division</th>
                  <th>Conference</th>
                </tr>
              </thead>
              <tbody>
                {teamsByPage.map(team => {
                  return (
                    <tr key={team.id}>
                      <td className="d-flex align-items-center w-50">
                        <img
                          src={team.logos && team.logos[0]}
                          alt={team.school}
                          className="img-thumbnail"
                          width="60px"
                        />
                      </td>
                      <td>{team.abbreviation}</td>
                      <td>{team.school}</td>
                      <td>{team.mascot}</td>
                      <td>{team.division}</td>
                      <td>{team.conference}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {Math.ceil(teamsState.data.length / paginationState.pageSize) !==
            0 ? (
              <Pagination
                data={teamsState.data}
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

export default Teams;
