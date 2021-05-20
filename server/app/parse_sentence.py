import spacy


nlp = spacy.load("en_core_web_lg")
# avoid doing word splitting and exceptions and crazy stuff, just do a basic whitespace based parse
nlp.tokenizer.rules = {}


def combine_compound_words(sentence):
    doc = nlp(sentence)
    reformulated_sentence_parts = []
    compound_parts = []
    for token in doc:
        if token.dep_ == "compound":
            compound_parts.append(token.text)
        else:
            if len(compound_parts):
                compound_parts.append(token.text)
                reformulated_sentence_parts.append(
                    "_".join(compound_parts) + token.whitespace_
                )
                compound_parts = []
            else:
                reformulated_sentence_parts.append(token.text + token.whitespace_)
    return "".join(reformulated_sentence_parts)


def extract_sense(token):
    sense = token.pos_
    # sense2vec doesn't have a lot of the POS tags somehow, need to adjust
    if sense == "PROPN":
        sense = "NOUN"
    if token.tag_[0] == "V":
        sense = "VERB"
    if token.ent_type_:
        sense = token.ent_type_
    if sense == "PRON":
        sense = "NOUN"
    return sense


def parse_sentence(sentence):
    recombined_sentence = combine_compound_words(sentence)
    doc = nlp(recombined_sentence)
    return [{"token": token, "sense": extract_sense(token)} for token in doc]
