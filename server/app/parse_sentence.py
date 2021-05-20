import spacy
from os import path


nlp = spacy.load("en_core_web_lg")
# avoid doing word splitting and exceptions and crazy stuff, just do a basic whitespace based parse
nlp.tokenizer.rules = {}
s2v_component = nlp.add_pipe("sense2vec")
s2v_component.from_disk(path.join(path.dirname(__file__), "../s2v_reddit_2019_lg"))

model = s2v_component.s2v


def extract_sense(token):
    sense = token.pos_
    if token.ent_type_:
        sense = token.ent_type_
    return sense


def parse_sentence(sentence):
    doc = nlp(sentence)
    results = []
    reverse_entities_map = {}
    used_entities = set()
    for entity in doc.ents:
        for token in entity:
            reverse_entities_map[token] = entity
    for token in doc:
        if token in reverse_entities_map:
            entity = reverse_entities_map[token]
            if entity not in used_entities:
                results.append(
                    {
                        "tokens": [tok for tok in entity],
                        "text": entity.text,
                        "vec": entity._.s2v_vec,
                    }
                )
                used_entities.add(entity)
        else:
            results.append(
                {
                    "tokens": [token],
                    "text": token.text,
                    "vec": token._.s2v_vec,
                }
            )

    return results
