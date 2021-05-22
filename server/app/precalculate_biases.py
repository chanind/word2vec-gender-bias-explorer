"""
Helper script to pre-generate all word biases as a big JSON, so the server doesn't need as much memory to run
"""

import json
from os import path
from PcaBiasCalculator import PcaBiasCalculator


def preprocess_biases():
    print("creating calculator")
    calculator = PcaBiasCalculator()
    print("mapping biases")
    bias_mapping = {}
    count = 0
    total_keys = len(calculator.keys())
    for word in calculator.keys():
        bias_mapping[word] = calculator.detect_bias(word)
        count += 1
        if count % 100000 == 0:
            print(f"done: {count} / {total_keys}")
    print("writing biases")
    output_file = path.join(path.dirname(__file__), "../data/biases.json")
    with open(output_file, "w") as outfile:
        json.dump(bias_mapping, outfile, ensure_ascii=False, indent=2)
    print("done!")


if __name__ == "__main__":
    preprocess_biases()
