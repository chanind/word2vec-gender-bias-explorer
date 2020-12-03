import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useGet } from "restful-react";

import Loading from "./components/Loading";
import "./Query.css";

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:5000";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Query() {
  const query = useQuery();
  const sentence = query.get("sentence");
  const { data, error, loading } = useGet({
    path: `${API_HOST}/detect?sentence=${encodeURIComponent(sentence ?? "")}`,
  });
  if (!sentence) {
    return <Redirect to="/" />;
  }
  return (
    <div className="Query">
      <header className="Query-header">Gender Bias Viewer</header>
      <form>
        <input className="Query-search" type="text" defaultValue={sentence} />
        <button className="Query-searchButton">Update</button>
      </form>
      {loading && <Loading />}
      {error && (
        <div className="Query-error">
          <div className="Query-errorInner">{error.message}</div>
        </div>
      )}
    </div>
  );
}

export default Query;
