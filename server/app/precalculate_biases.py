"""
Helper script to pre-generate all word biases as a big JSON, so the server doesn't need as much memory to run
"""

import json
from model import model
from detect_bias import detect_bias


def preprocess_biases():
    bias_mapping = {word: detect_bias(word) for word in model.vocab.keys()}
    with open("biases.json", "w") as outfile:
        json.dump(bias_mapping, outfile, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    preprocess_biases()
