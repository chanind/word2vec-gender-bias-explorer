"""
Helper script to pre-generate all word biases as a big JSON, so the server doesn't need as much memory to run
"""

import json
from os import path
from PcaBiasCalculator import PcaBiasCalculator


def preprocess_biases():
    calculator = PcaBiasCalculator()
    bias_mapping = {word: calculator.detect_bias(word) for word in calculator.keys()}
    output_file = path.join(path.dirname(__file__), "../data/biases.json")
    with open(output_file, "w") as outfile:
        json.dump(bias_mapping, outfile, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    preprocess_biases()
