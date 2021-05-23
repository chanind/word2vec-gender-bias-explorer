import React, { FC } from 'react';
import './Faq.css';

const Faq: FC = () => (
  <div className="Faq">
    <h4 className="Faq-title">How does this work?</h4>
    <p className="Faq-description">
      This tool is based on the paper{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://proceedings.neurips.cc/paper/2016/file/a486cd07e4ac3d270571622f4f316ec5-Paper.pdf"
      >
        Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word
        Embeddings
      </a>
      , and uses pretrained word embeddings from the{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://code.google.com/archive/p/word2vec/"
      >
        Google News word2vec dataset
      </a>
      . It works by looking at differences between male and female word pairs
      like "he" and "she", or "boy" and "girl", and then comparing the
      differences between those words to other word vectors in the word2vec
      dataset.
    </p>

    <h4 className="Faq-title">This code is all wrong!</h4>
    <p className="Faq-description">
      If you think there's a mistake in the way this is coded, or if you have
      ideas for improvement or want to collaborate, please open an issue or make
      a pull request on the{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/chanind/word2vec-gender-bias-explorer"
      >
        Github repo
      </a>
      . Contributions are very welcome :)
    </p>

    <h4 className="Faq-title">Work with me!</h4>
    <p className="Faq-description">
      I'm interested in doing a PhD in NLP in 2022, and would love to work with
      researchers doing NLP work in the meantime. Please reach out at{' '}
      <a href="mailto:chanindav@gmail.com">chanindav@gmail.com</a> if you have a
      project I can be a part of.
    </p>
  </div>
);

export default Faq;
