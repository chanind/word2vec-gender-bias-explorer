from app import app
from flask import request, jsonify
import werkzeug
from model import model
from nltk.tokenize import word_tokenize

origin = (model["he"] + model["she"]) / 2
bias = model["he"] - model["she"]


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
