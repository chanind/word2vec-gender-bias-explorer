import React, { useState } from 'react';
import './Intro.css';
import { Link, useHistory } from 'react-router-dom';

const Intro = () => {
  const history = useHistory();
  const [sentence, setSentence] = useState('');
  return (
    <div className="Intro">
      <header className="Intro-header">Word2Vec Gender Bias Explorer</header>
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
        <Link to="/query?sentence=The librarian punched the firefighter">
          The librarian punched the firefighter
        </Link>
        <br />
        <Link to="/query?sentence=She plays tennis, football, and baseball">
          She plays tennis, football, and baseball
        </Link>
        <br />
        <Link to="/query?sentence=Don't be bossy, be aggressive">
          Don't be bossy, be aggressive
        </Link>
        <br />
        <Link to="/query?sentence=The hero saved everyone using science">
          The hero saved everyone using science
        </Link>
        <br />
        <Link to="/query?sentence=bass, drums, guitar, harmonica, saxophone, banjo, piano, harp, cello, violin, flute">
          bass, drums, guitar, harmonica, saxophone, banjo, piano, harp, cello,
          violin, flute
        </Link>
      </p>
    </div>
  );
};

export default Intro;
