import React, { FC } from 'react';
import './Faq.css';

const Faq: FC = () => (
  <div className="Faq">
    <h4 className="Faq-title">How does this work?</h4>
    <p className="Faq-description">
      This tool is based on the paper{' '}
      <a href="https://proceedings.neurips.cc/paper/2016/file/a486cd07e4ac3d270571622f4f316ec5-Paper.pdf">
        Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word
        Embeddings
      </a>
      , and uses pretrained word embeddings from the{' '}
      <a href="https://code.google.com/archive/p/word2vec/">
        Google News word2vec dataset
      </a>
      . It works by looking at differences between male and female word pairs
      like "he" and "she", or "boy" and "girl", and then comparing the
      differences between those words to other word vectors in the word2vec
      dataset.
    </p>

    <h4 className="Faq-title">
      Why do words like "the" and "it" have a male bias?
    </h4>
    <p className="Faq-description">
      I'm not sure, but I think this is because in English, male tends to be
      assumed as a default gender when not specified. Or maybe the Google News
      dataset talks about more men than women? If you have a better idea, please
      share!
    </p>

    <h4 className="Faq-title">This code is all wrong!</h4>
    <p className="Faq-description">
      If you think there's a mistake in the way this is coded, or if you have
      ideas for improvement or want to collaborate, please open an issue or make
      a pull request on the{' '}
      <a href="https://github.com/chanind/gender-bias-viewer">Github repo</a>.
      Contributions are very welcome :)
    </p>
  </div>
);

export default Faq;
