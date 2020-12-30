import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useGet } from 'restful-react';
import classNames from 'classnames';

import Loading from './components/Loading';
import './Query.css';
import lightenDarkenColor from './lightenDarkenColor';
import Faq from './Faq';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface ApiResults {
  results: {
    token: string;
    bias: number;
  }[];
}

const MAX_BIAS = 0.5;

const normBias = (bias: number): number =>
  Math.min(Math.abs(bias), MAX_BIAS) / MAX_BIAS;

const biasWidth = (bias: number): string => `${50 * normBias(bias)}%`;

const biasColor = (bias: number): string => {
  const baseColor = isMaleBias(bias) ? '#3F8EAA' : '#AA3F8E';
  return lightenDarkenColor(baseColor, (1 - normBias(bias)) * 120);
};

const isUnbiased = (bias: number) => normBias(bias) < 0.1 && bias > 0;

const isMaleBias = (bias: number) => bias > 0;

const biasText = (bias: number): string => {
  if (isUnbiased(bias)) return 'unbiased';
  const gender = isMaleBias(bias) ? 'male' : 'female';
  const norm = normBias(bias);
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
        <Link to="/">Gender Bias Viewer</Link>
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
              'is-maleBias': isMaleBias(result.bias),
              'is-femaleBias': !isMaleBias(result.bias),
              'is-unbiased': isUnbiased(result.bias),
            })}
          >
            <div>{result.token}</div>
            <div
              className="Query-resultBias"
              style={{
                width: biasWidth(result.bias),
                background: biasColor(result.bias),
              }}
            >
              <div
                className="Query-resultBiasPointer"
                style={{
                  [isMaleBias(result.bias)
                    ? 'borderRightColor'
                    : 'borderLeftColor']: biasColor(result.bias),
                }}
              />
            </div>
            <div className="Query-resultBiasText">{biasText(result.bias)}</div>
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
