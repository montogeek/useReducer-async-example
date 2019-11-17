import React from "react";

function Pagination({ data, pagination, dispatch }) {
  return (
    <div className="row">
      <div className="col-sm"></div>
      <div className="col-sm d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={`page-item ${pagination.currentPage === 0 &&
                "disabled"}`}
            >
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => {
                  dispatch({
                    type: "PREVIOUS_PAGE"
                  });
                }}
              >
                <span aria-hidden="true">&lt;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                {pagination.currentPage + 1} of{" "}
                {Math.ceil(data.length / pagination.pageSize)}
              </a>
            </li>
            <li
              className={`page-item ${pagination.currentPage + 1 ===
                Math.ceil(data.length / pagination.pageSize) && "disabled"}`}
            >
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() =>
                  dispatch({
                    type: "NEXT_PAGE"
                  })
                }
              >
                <span aria-hidden="true">&gt;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-sm d-flex justify-content-center justify-content-md-end">
        <form className="form-inline">
          <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
            Page size
          </label>
          <select
            className="custom-select my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            defaultValue={pagination.pageSize}
            onChange={event => {
              dispatch({
                type: "SET_PAGESIZE",
                payload: event.target.value
              });
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default Pagination;
