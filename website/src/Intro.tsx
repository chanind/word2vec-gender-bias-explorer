import React, { useState } from 'react';
import './Intro.css';
import { Link, useHistory } from 'react-router-dom';

const Intro = () => {
  const history = useHistory();
  const [sentence, setSentence] = useState('');
  return (
    <div className="Intro">
      <header className="Intro-header">Gender Bias Viewer</header>
      <p className="Intro-subheader">
        Enter a word or sentence below to view the gender bias in each word
      </p>
      <form
        className="Intro-searchForm"
        onSubmit={evt => {
          evt.preventDefault();
          if (sentence.trim() !== '') {
            history.push(`/query?sentence=${encodeURIComponent(sentence)}`);
          }
        }}
      >
        <div className="Intro-searchFormInner">
          <input
            className="Intro-search"
            required
            type="text"
            value={sentence}
            onChange={evt => setSentence(evt.target.value)}
          />
          <button className="Intro-go">Go</button>
        </div>
      </form>
      <p className="Intro-inspiration">
        Need some inspiration? Try these:
        <br />
        <Link to="/query?sentence=The doctor liked to gossip about the nurse">
          The doctor liked to gossip about the nurse
        </Link>
        <br />
        <Link to="/query?sentence=The librarian gave him a book about a bossy scientist">
          The librarian gave him a book about a bossy scientist
        </Link>
        <br />
        <Link to="/query?sentence=She is a professor, not a teacher">
          She is a professor, not a teacher
        </Link>
        <br />
        <Link to="/query?sentence=She is really good at tennis :)">
          She is really good at tennis :)
        </Link>
      </p>
    </div>
  );
};

export default Intro;
