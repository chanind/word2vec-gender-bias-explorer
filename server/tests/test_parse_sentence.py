import pytest
from parse_sentence import combine_compound_words, parse_sentence


@pytest.mark.parametrize(
    "original,combined",
    [
        ("I live in New York", "I live in New_York"),
        ("I live in New York City", "I live in New_York_City"),
        (
            "I lived in New York City but now I live in York",
            "I lived in New_York_City but now I live in York",
        ),
        ("I am a banana", "I am a banana"),
        ("I don't know", "I don't know"),
    ],
)
def test_combine_compound_words(original, combined):
    assert combine_compound_words(original) == combined


@pytest.mark.parametrize(
    "original,parsed",
    [
        (
            "I live in New York",
            [
                {"text": "I", "pos": "PRON"},
                {"pos": "VERB", "text": "live"},
                {"pos": "ADP", "text": "in"},
                {"pos": "NOUN", "text": "New_York"},
            ],
        ),
        (
            "Who's there?",
            [
                {"text": "Who's", "pos": "AUX"},
                {"text": "there", "pos": "ADV"},
                {"text": "?", "pos": "PUNCT"},
            ],
        ),
    ],
)
def test_parse_sentence(original, parsed):
    assert parse_sentence(original) == parsed
