# Word2vec Gender Bias Explorer

A tool to explore gender bias in sentences based on NLP word embeddings from Google News.

Live demo:
https://chanind.github.io/word2vec-gender-bias-explorer

## Why?

AI learns from us, and learns the biases and prejudices that we teach it. Rather than trying to debias AI, this project tries to use the biases that are learned by AI as a way to show the that biases appear in human language. Also, I read the paper [Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings](https://proceedings.neurips.cc/paper/2016/file/a486cd07e4ac3d270571622f4f316ec5-Paper.pdf) and really wanted to do something fun with the concept!

## How it works

This tool is based on the paper [Man is to Computer Programmer as Woman is to
Homemaker? Debiasing Word Embeddings](https://proceedings.neurips.cc/paper/2016/file/a486cd07e4ac3d270571622f4f316ec5-Paper.pdf). In that paper, the authors looked at word embeddings, a popular AI technique for turning a word into a vector for training AI algorithms, and found that the word embeddings had picked up gender and racial biases from the text it was trained on. Essentially, the algorithm was inadvertently learning the biases that are present in real human language.

The paper tries to remove those biases in the word embeddings, but this tool tries instead to simply show the biases that have been encoded in those word embeddings. This tool uses a pretrained [Google News word2vec dataset](https://code.google.com/archive/p/word2vec/).

This tool works by trying to find a "gender vector" in the word embeddings by using [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis) between pairs of male and female words, since these words should be semantically similar but differ only in the direction of gender. Then, gender bias in a word is determined simply by projecting it along this gender vector and seeing if it lies closer to the male or female groups of training words. The word pairs used for this are the following:

- "she", "he"
- "her", "his"
- "woman", "man"
- "Mary", "John"
- "herself", "himself"
- "daughter", "son"
- "mother", "father"
- "gal", "guy"
- "girl", "boy"

## Project structure and setup

This project is divided into a website frontend, and a server backend, in respective folders.

The server is written in Python using flask. It exposes a REST API with a single GET endpoint, `/detect` which requires passing a `sentence` query param. For example: `/detect?sentence=She is a nurse`. This endpoint will tokenize the sentence and return biases for each token, like below:

```
{
  "results": [
    {
      "bias": -1,
      "token": "she"
    },
    {
      "bias": 0.22196795046329498,
      "token": "is"
    },
    {
      "bias": null,
      "token": "a"
    },
    {
      "bias": -0.1773415505886078,
      "token": "nurse"
    }
  ]
}
```

The website is a simple React app created using [create-react-app](https://create-react-app.dev). You can install the dependencies for this by running `yarn install`, and can run a development version of the frontend using `yarn start`.

## I have an idea to improve this!

Please, submit a PR or open an issue! Any help or ideas to make this project better is greatly appreciated!

## Work with me!

I'm interested in doing a PhD in NLP in 2022, and would love to work with
researchers doing NLP work in the meantime. Please reach out at
<a href="mailto:chanindav@gmail.com">chanindav@gmail.com</a> if you have a
project I can be a part of.

## License

This project is available under a MIT license
