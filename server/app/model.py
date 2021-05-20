from gensim.models import KeyedVectors
from os import path

model = KeyedVectors.load_word2vec_format(
    path.join(path.dirname(__file__), "../GoogleNews-vectors-negative300.bin"),
    binary=True,
)
