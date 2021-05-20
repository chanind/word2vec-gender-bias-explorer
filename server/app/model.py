from sense2vec import Sense2Vec
from os import path

model = Sense2Vec().from_disk(
    path.join(path.dirname(__file__), "../s2v_reddit_2019_lg")
)
