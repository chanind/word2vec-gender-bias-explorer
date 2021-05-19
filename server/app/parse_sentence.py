import spacy


nlp = spacy.load("en_core_web_md")
# avoid doing word splitting and exceptions and crazy stuff, just do a basic whitespace based parse
nlp.tokenizer.rules = {}


def retokenize(sentence):
    doc = nlp(sentence)
    fix_possessive_indices = [
        i for (i, tok) in enumerate(doc) if tok.text == "'s" and i > 0
    ]
    with doc.retokenize() as retokenizer:
        for index in fix_possessive_indices:
            retokenizer.merge(doc[index - 1 : index + 1])
    return doc


def combine_compound_words(sentence):
    doc = retokenize(sentence)
    reformulated_sentence_parts = []
    compound_parts = []
    for token in doc:
        if token.dep_ == "compound":
            compound_parts.append(token.text)
        else:
            if len(compound_parts):
                compound_parts.append(token.text)
                reformulated_sentence_parts.append("_".join(compound_parts))
                compound_parts = []
            else:
                reformulated_sentence_parts.append(token.text)
    return " ".join(reformulated_sentence_parts)


def extract_text_and_pos(token):
    pos = token.pos_
    if pos == "PROPN":
        pos = "NOUN"
    return {"text": token.text, "pos": pos}


def parse_sentence(sentence):
    recombined_sentence = combine_compound_words(sentence)
    doc = retokenize(recombined_sentence)
    return [extract_text_and_pos(token) for token in doc]
