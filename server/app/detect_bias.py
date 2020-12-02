from model import model

biased_pairs = [
    (model["he"], model["she"]),
]

origins = [(pair[0] + pair[1]) / 2 for pair in biased_pairs]
origin = sum(origins) / len(origins)

# simple detection, just use basic subtraction to get gender vector

biases = [pair[0] - pair[1] for pair in biased_pairs]
bias = sum(biases) / len(biases)


def detect_bias(word):
    if word not in model:
        return None
    return model.cosine_similarities(bias, [model[word] - origin])[0].astype(float)
