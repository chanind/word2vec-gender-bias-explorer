# Gender Bias Viewer

A tool to show gender bias in sentences based on NLP word embeddings from Google News.

Live demo:
https://chanind.github.io/gender-bias-viewer

## Why?

This project is an attempt to use the biases learned by AI algorithms as a way to view the biases in our own language and society. AI learns from us, and learns the biases and prejudices that we ourselves teach it. Rather than trying to debias AI, this project tries to use the biases that are learned by AI as a way to show ourselves how our society and language are biased. Rather than trying to debias AI, we can use biased AI to help debias ourselves.

## How it works

This tool is based on the paper [Man is to Computer Programmer as Woman is to
Homemaker? Debiasing Word Embeddings](https://proceedings.neurips.cc/paper/2016/file/a486cd07e4ac3d270571622f4f316ec5-Paper.pdf). In that paper, the authors looked at word embeddings, a popular AI technique for turning a word into a vector for training AI algorithms, and found that the word embeddings had picked up gender and racial biases from the text it was trained on. Essentially, the algorithm was inadvertently learning the biases that are present in real human language.

The paper tries to remove those biases in the word embeddings, but this tool tries instead to simply show the biases that have been encoded in those word embeddings. This tool uses a pretrained [Google News word2vec dataset](https://code.google.com/archive/p/word2vec/).

This tool works by trying to find a gender vector in the word embeddings by subtracting the vector for `she` from the vector for `he`, since these words should be semantically similar but differ only in the direction of gender. Then, gender bias in a word is determined simply by seeing if that word's vector in the bias direction lies closer to `he` or closer to `she`.

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

Please, submit a PR or open an issue! Any help to make this project better is greatly appreciated!
