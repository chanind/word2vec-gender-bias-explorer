import React, { useState } from 'react';
import './Intro.css';
import { Link, useHistory } from 'react-router-dom';

const Intro = () => {
  const history = useHistory();
  const [sentence, setSentence] = useState('');
  return (
    <div className="Intro">
      <header className="Intro-header">Gender Bias Viewer</header>
      <p>
        Enter a sentence in English below to view the gender bias in each word
      </p>
      <form
        className="Intro-searchForm"
        onSubmit={evt => {
          evt.preventDefault();
          history.push(`/query?sentence=${encodeURIComponent(sentence)}`);
        }}
      >
        <input
          className="Intro-search"
          required
          type="text"
          value={sentence}
          onChange={evt => setSentence(evt.target.value)}
        />
        <button className="Intro-go">Go</button>
      </form>
      <p className="Intro-inspiration">
        Need some inspiration? Try these:
        <br />
        <Link to="/query?sentence=She is a genius doctor">
          She is a genius doctor
        </Link>
        <br />
        <Link to="/query?sentence=John couldn't handle the stress and broke down in tears">
          John couldn't handle the stress and broke down in tears
        </Link>
      </p>
    </div>
  );
};

export default Intro;
