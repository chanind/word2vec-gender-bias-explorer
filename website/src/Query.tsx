import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useGet } from 'restful-react';
import classNames from 'classnames';

import Loading from './components/Loading';
import './Query.css';
import lightenDarkenColor from './lightenDarkenColor';
import Faq from './Faq';
import { API_HOST } from './config';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface TokenPart {
  whitespace: string;
  pos: string;
  dep: string;
  ent: string;
  skip: boolean;
}

interface Token {
  token: string;
  bias: number;
  parts: TokenPart[];
}

interface ApiResults {
  results: Token[];
}

const MAX_BIAS = 0.7;

const normBias = (bias: number): number =>
  Math.min(Math.abs(bias), MAX_BIAS) / MAX_BIAS;

const biasWidth = (token: Token): string => `${50 * normBias(token.bias)}%`;

const biasColor = (token: Token): string => {
  const baseColor = isMaleBias(token) ? '#3F8EAA' : '#AA3F8E';
  return lightenDarkenColor(baseColor, (1 - normBias(token.bias)) * 120);
};

const isUnbiased = (token: Token) => {
  if (token.parts.every(part => part.skip)) {
    return true;
  }
  return token.bias <= 0 && token.bias > -0.2;
};

const isMaleBias = (token: Token) => !isUnbiased(token) && token.bias > 0;

const biasText = (token: Token): string => {
  if (isUnbiased(token)) return 'unbiased';
  const gender = isMaleBias(token) ? 'male' : 'female';
  const norm = normBias(token.bias);
  let amount = 'slight';
  if (norm > 0.3) amount = 'moderate';
  if (norm > 0.6) amount = 'strong';
  return `${amount} ${gender} bias`;
};

const Query = () => {
  const query = useQuery();
  const history = useHistory();
  const [sentence, setSentence] = useState(query.get('sentence') || '');
  const { data, error, loading } = useGet<ApiResults>({
    path: `${API_HOST}/detect?sentence=${encodeURIComponent(
      query.get('sentence') ?? '',
    )}`,
  });
  return (
    <div className="Query">
      <header className="Query-header">
        <Link to="/">Word2Vec Gender Bias Explorer</Link>
      </header>
      <form
        className="Query-searchBox"
        onSubmit={evt => {
          evt.preventDefault();
          if (sentence.trim() !== '') {
            history.push(`/query?sentence=${encodeURIComponent(sentence)}`);
          }
        }}
      >
        <input
          className="Query-search"
          type="text"
          value={sentence}
          onChange={evt => setSentence(evt.target.value)}
        />
        <button className="Query-searchButton">Update</button>
      </form>
      {loading && <Loading />}
      {error && (
        <div className="Query-error">
          <div className="Query-errorInner">{error.message}</div>
        </div>
      )}
      <div className="Query-results">
        {data?.results.map((result, i) => (
          <div
            key={i}
            className={classNames('Query-result', {
              'is-maleBias': isMaleBias(result),
              'is-femaleBias': !isMaleBias(result),
              'is-unbiased': isUnbiased(result),
            })}
          >
            <div>{result.token}</div>
            <div
              className="Query-resultBias"
              style={{
                width: biasWidth(result),
                background: biasColor(result),
              }}
            >
              <div
                className="Query-resultBiasPointer"
                style={{
                  [isMaleBias(result)
                    ? 'borderRightColor'
                    : 'borderLeftColor']: biasColor(result),
                }}
              />
            </div>
            <div className="Query-resultBiasText">{biasText(result)}</div>
          </div>
        ))}
      </div>
      <div className="Query-faqContainer">
        <Faq />
      </div>
    </div>
  );
};

export default Query;
