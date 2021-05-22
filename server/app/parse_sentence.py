import spacy


nlp = spacy.load("en_core_web_md")
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


def parse_sentence(sentence):
    doc = nlp(sentence)
    results = []
    reverse_entities_map = {}
    used_entities = set()
    for entity in doc.ents:
        for token in entity:
            reverse_entities_map[token] = entity

    compound_part_indices = []
    for (i, token) in enumerate(doc):
        if token in reverse_entities_map:
            entity = reverse_entities_map[token]
            if entity not in used_entities:
                results.append(
                    {
                        "tokens": [tok for tok in entity],
                        "text": entity.text,
                    }
                )
                used_entities.add(entity)
        else:
            if token.dep_ == "compound":
                compound_part_indices.append(i)
            else:
                if len(compound_part_indices):
                    compound_part_indices.append(i)
                    tokens = [doc[j] for j in compound_part_indices]
                    span = doc[compound_part_indices[0] : i + 1]
                    results.append(
                        {
                            "tokens": tokens,
                            "text": span.text,
                        }
                    )
                    compound_part_indices = []
                else:
                    results.append(
                        {
                            "tokens": [token],
                            "text": token.text,
                        }
                    )

    return results
