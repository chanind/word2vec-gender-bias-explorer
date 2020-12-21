from model import model

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

# simple detection, just use basic subtraction and averaging to get gender vector

biases = [pair[0] - pair[1] for pair in biased_pairs]
bias = sum(biases) / len(biases)


def detect_bias(word):
    if word not in model:
        return None
    return -1 * model.cosine_similarities(bias, [model[word] - origin])[0].astype(float)
