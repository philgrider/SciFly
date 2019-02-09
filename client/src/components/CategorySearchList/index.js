import React from "react";
// import { Link } from "react-router-dom";
// import "./style.css";

function CategorySearchList(props) {
  return (
    <div className="container">
      <div className="row">
        <form>
          <select id="ddlCatList" className="browser-default custom-select" onChange={props.catSearchEvent}>
          <option>Select a Category</option>
          <option>All</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default CategorySearchList;