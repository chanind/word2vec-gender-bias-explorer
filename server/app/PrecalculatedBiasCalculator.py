import re
import json
from os import path


class PrecalculatedBiasCalculator:
    """
    Helper around loading and using pre-calculated biases
    Useful in production to save server memory
    """

    def __init__(
        self, bias_json=path.join(path.dirname(__file__), "../data/biases.json")
    ):
        with open(bias_json) as json_file:
            self.biases = json.load(json_file)

    def detect_bias(self, raw_word):
        word = re.sub(r"\s+", "_", raw_word)
        if word not in self.biases:
            return None
        return self.biases[word]
