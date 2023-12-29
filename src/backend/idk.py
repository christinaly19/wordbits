import numpy as np
from scipy import spatial
import os
import matplotlib.pyplot as plt
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

file_path = "./glove.6B.50d.txt"
embeddings_dict = {}

with open(file_path, 'r') as f:
    for line in f:
        values = line.split()
        word = values[0]
        vector = np.asarray(values[1:], "float32")
        embeddings_dict[word] = vector

def find_closest_embeddings(embedding, n=41):
    # Sort by cosine distance and exclude the first word
    closest_words = sorted(embeddings_dict.keys(), key=lambda word: spatial.distance.cosine(embeddings_dict[word], embedding))[1:]
    return closest_words[:n]

@app.route('/get_closest_embeddings', methods=['GET'])
def get_closest_embeddings():
    word = request.args.get('word')
    if word not in embeddings_dict:
        return jsonify({"error": "Word not found in embeddings dictionary"})

    target_embedding = embeddings_dict[word]
    closest_words = find_closest_embeddings(target_embedding)
    print(closest_words[:1]) 
    return jsonify({"closest_words": closest_words})

if __name__ == '__main__':
    app.run(debug=True)
