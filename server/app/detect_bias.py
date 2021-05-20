from PcaBiasCalculator import PcaBiasCalculator
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
    ("vagina", "penis"),
    ("feminine", "masculine"),
]

neutral_words = [
    "is",
    "was",
    "who",
    "what",
    "where",
    "the",
    "it",
]


calculator = None

PcaBiasCalculator(model, biased_word_pairs, neutral_words)


def detect_bias(raw_word):
    return calculator(raw_word)
