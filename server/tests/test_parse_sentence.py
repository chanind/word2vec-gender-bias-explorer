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


def textify_tokens(parse_result):
    return [{"text": res["token"].text, "sense": res["sense"]} for res in parse_result]


def test_parse_sentence():
    assert textify_tokens(parse_sentence("I live in New York")) == [
        {"text": "I", "sense": "NOUN"},
        {"sense": "VERB", "text": "live"},
        {"sense": "ADP", "text": "in"},
        {"sense": "GPE", "text": "New_York"},
    ]


def test_parse_sense_with_possessives():
    assert textify_tokens(parse_sentence("Who's there?")) == [
        {"text": "Who", "sense": "NOUN"},
        {"text": "'s", "sense": "VERB"},
        {"text": "there", "sense": "ADV"},
        {"text": "?", "sense": "PUNCT"},
    ]


def test_parse_sentence_uses_named_entities():
    assert textify_tokens(parse_sentence("Mary is in London")) == [
        {"text": "Mary", "sense": "PERSON"},
        {"text": "is", "sense": "VERB"},
        {"text": "in", "sense": "ADP"},
        {"text": "London", "sense": "GPE"},
    ]
