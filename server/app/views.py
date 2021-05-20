from app import app
from flask import request, jsonify
import werkzeug
from detect_bias import detect_bias_pca
from parse_sentence import parse_sentence


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
    objs = parse_sentence(sentence)
    results = []
    for obj in objs:
        token_result = {
            "token": obj["text"],
            "bias": detect_bias_pca(obj["vec"]),
            "parts": [
                {
                    "whitespace": token.whitespace_,
                    "pos": token.pos_,
                    "dep": token.dep_,
                    "ent": token.ent_type_,
                    "skip": token.pos_ in ["AUX", "PUNCT", "SPACE"] or len(token) < 2,
                }
                for token in obj["tokens"]
            ],
        }
        results.append(token_result)
    return jsonify({"results": results})
