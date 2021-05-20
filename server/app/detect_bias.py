from model import model
import numpy as np
from sklearn.decomposition import PCA

biased_word_pairs = [
    ("she|NOUN", "he|NOUN"),
    ("her|NOUN", "his|NOUN"),
    ("woman|NOUN", "man|NOUN"),
    ("Mary|PERSON", "John|PERSON"),
    ("herself", "himself"),
    ("daughter", "son"),
    ("mother", "father"),
    ("gal", "guy"),
    ("girl", "boy"),
]

biased_pairs = [(model[pair[0]], model[pair[1]]) for pair in biased_word_pairs]
biases = [pair[0] - pair[1] for pair in biased_pairs]
reversed_biases = [pair[1] - pair[0] for pair in biased_pairs]

# simple detection, just use basic subtraction and averaging to get gender vector

bias = sum(biases) / len(biases)
origins = [(pair[0] + pair[1]) / 2 for pair in biased_pairs]
origin = sum(origins) / len(origins)


def detect_bias_simple(word):
    """
    Simple bias algorithm, just average all the bias vectors together and use cosine similarity
    """
    if word not in model:
        return None
    return -1 * model.cosine_similarities(bias, [model[word] - origin])[0].astype(float)


pca = PCA(n_components=1)
pca.fit(np.array(biases + reversed_biases))

female_mean = np.mean(pca.transform(np.array([pair[0] for pair in biased_pairs])))
male_mean = np.mean(pca.transform(np.array([pair[1] for pair in biased_pairs])))


def detect_bias_pca(word):
    """
    Use PCA to find the gender bias vector, and determine bias based on position along the gender vector
    """
    if word not in model:
        return None
    word_val = pca.transform(np.array([model[word]]))[0][0]
    # rescaling word value so that the male/female average maps to 1 and -1
    return (word_val - (male_mean + female_mean) / 2) * 2 / (male_mean - female_mean)
