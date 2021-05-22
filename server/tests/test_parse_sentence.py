from parse_sentence import parse_sentence


def textify_tokens(parse_result):
    return [res["text"] for res in parse_result]


def test_parse_sentence():
    assert textify_tokens(parse_sentence("I live in New York")) == [
        "I",
        "live",
        "in",
        "New York",
    ]


def test_compound_place_names():
    assert textify_tokens(parse_sentence("I like New York City")) == [
        "I",
        "like",
        "New York City",
    ]


def test_parse_sense_with_possessives():
    assert textify_tokens(parse_sentence("Who's there?")) == ["Who", "'s", "there", "?"]


def test_parse_sentence_uses_named_entities():
    assert textify_tokens(parse_sentence("Mary is in London")) == [
        "Mary",
        "is",
        "in",
        "London",
    ]


def test_parse_sentence_combines_compound_words():
    assert textify_tokens(parse_sentence("Mary is a computer programmer")) == [
        "Mary",
        "is",
        "a",
        "computer programmer",
    ]
