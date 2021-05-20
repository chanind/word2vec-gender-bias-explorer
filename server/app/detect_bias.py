from model import model
import numpy as np
from sklearn.decomposition import PCA

biased_word_pairs = [
    ("she|NOUN", "he|NOUN"),
    # ("her|NOUN", "his|NOUN"),
    ("woman|NOUN", "man|NOUN"),
    # ("Mary|PERSON", "John|PERSON"),
    # ("herself|NOUN", "himself|NOUN"),
    ("daughter|NOUN", "son|NOUN"),
    ("mother|NOUN", "father|NOUN"),
    # ("gal|NOUN", "guy|NOUN"),
    ("girl|NOUN", "boy|NOUN"),
]

neutral_words = [
    "is|VERB",
    "was|VERB",
    "the|DET",
    "a|DET",
    "it|NOUN",
]

biased_pairs = [(model[pair[0]], model[pair[1]]) for pair in biased_word_pairs]
biases = [pair[0] - pair[1] for pair in biased_pairs]
reversed_biases = [pair[1] - pair[0] for pair in biased_pairs]

pca = PCA(n_components=1)
pca.fit(np.array(biases + reversed_biases))
print(pca.explained_variance_ratio_)

female_mean = np.mean(pca.transform(np.array([pair[0] for pair in biased_pairs])))
male_mean = np.mean(pca.transform(np.array([pair[1] for pair in biased_pairs])))
neutral_mean = np.mean(pca.transform(np.array([model[word] for word in neutral_words])))

print(female_mean, neutral_mean, male_mean)


def detect_bias_pca(word):
    """
    Use PCA to find the gender bias vector, and determine bias based on position along the gender vector
    """
    if word not in model:
        return None
    word_val = pca.transform(np.array([model[word]]))[0][0]
    # rescaling word value so that the male/female average maps to 1 and -1, and neutral_mean maps to 0
    if word_val > neutral_mean:
        return float((word_val - neutral_mean) / (male_mean - neutral_mean))
    else:
        return float((neutral_mean - word_val) / (female_mean - neutral_mean))