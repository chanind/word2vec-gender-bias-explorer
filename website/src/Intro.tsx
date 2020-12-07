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
        <Link to="/query?sentence=The doctor liked to gossip">
          The doctor liked to gossip
        </Link>
        <br />
        <Link to="/query?sentence=The librarian gave him a book about a genius scientist">
          The librarian gave him a book about a genius scientist
        </Link>
      </p>
    </div>
  );
};

export default Intro;
