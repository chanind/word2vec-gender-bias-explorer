from app import app
from flask import request, jsonify
import werkzeug
from model import model
from nltk.tokenize import word_tokenize

biased_pairs = [
    (model["he"], model["she"]),
    (model["man"], model["woman"]),
    (model["boy"], model["girl"]),
    (model["him"], model["her"]),
    (model["male"], model["female"]),
]

origins = [(pair[0] + pair[1]) / 2 for pair in biased_pairs]
biases = [pair[0] - pair[1] for pair in biased_pairs]

origin = sum(origins) / len(origins)
bias = sum(biases) / len(biases)


@app.route("/")
def index():
    return "OK"


@app.route("/detect", methods=["GET"])
def detect():
    sentence = request.args.get("sentence")
    if not sentence:
        raise werkzeug.exceptions.BadRequest("You must provide a sentence param")
    if len(sentence) > 500:
        raise werkzeug.exceptions.BadRequest(
            "Sentence must be at most 500 characters long"
        )
    tokens = word_tokenize(sentence.lower())
    results = []
    for token in tokens:
        token_result = {"token": token}
        if token in model:
            token_result["bias"] = model.cosine_similarities(
                bias, [model[token] - origin]
            )[0].astype(float)
        results.append(token_result)
    return jsonify({"results": results})
