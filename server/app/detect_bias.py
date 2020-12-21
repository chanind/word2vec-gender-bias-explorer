from model import model
import numpy as np
from sklearn.decomposition import PCA

biased_word_pairs = [
    ("she", "he"),
    ("her", "his"),
    ("woman", "man"),
    ("Mary", "John"),
    ("herself", "himself"),
    ("daughter", "son"),
    ("mother", "father"),
    ("gal", "guy"),
    ("girl", "boy"),
]

biased_pairs = [(model[pair[0]], model[pair[1]]) for pair in biased_word_pairs]

origins = [(pair[0] + pair[1]) / 2 for pair in biased_pairs]
origin = sum(origins) / len(origins)

# simple detection, just use basic subtraction to get gender vector

biases = [pair[0] - pair[1] for pair in biased_pairs]
all_gendered_vects = []
for pair in biased_pairs:
    all_gendered_vects.append(pair[0])
    all_gendered_vects.append(pair[1])

bias = sum(biases) / len(biases)

pca = PCA(n_components=1)
pca.fit(np.array(biases))

female_mean = np.mean(pca.transform(np.array([pair[0] for pair in biased_pairs])))
male_mean = np.mean(pca.transform(np.array([pair[1] for pair in biased_pairs])))


def detect_bias(word):
    if word not in model:
        return None
    return -1 * model.cosine_similarities(bias, [model[word] - origin])[0].astype(float)


def detect_bias_pca(word):
    if word not in model:
        return None
    word_val = pca.transform(np.array([model[word]]))[0][0]
    # rescaling word value so that the male/female average maps to 1 and -1
    return (word_val - (male_mean + female_mean) / 2) * 2 / (male_mean - female_mean)


print("PCA training complete! result:")
print(pca.explained_variance_ratio_)
print("Female bias scores, non-pca")
print([detect_bias(p[0]) for p in biased_word_pairs])
print("Male bias scores, non-pca")
print([detect_bias(p[1]) for p in biased_word_pairs])
print("PCA")
print("Female bias scores, pca")
print([detect_bias_pca(p[0]) for p in biased_word_pairs])
print("Male bias scores, pca")
print([detect_bias_pca(p[1]) for p in biased_word_pairs])
