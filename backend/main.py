from typing import Union
from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pickle
import faiss

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = SentenceTransformer("hkunlp/instructor-base",device='cuda')

with open('anime_data02.pkl', 'rb') as f:
    df,contents, embeddings = pickle.load(f)


index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

import math

def clean_nans(data):
    if isinstance(data, dict):
        return {k: clean_nans(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_nans(item) for item in data]
    elif isinstance(data, float) and (math.isnan(data) or math.isinf(data)):
        return None  
    return data

@app.get("/search")
def search(description:str,num_recs:int=4):
    xq=model.encode([description],prompt="Represent the anime description for recommending similar anime")
    D, I = index.search(xq, num_recs)  
    results=[df.iloc[i].to_dict() for i in I[0]]
    final_results=clean_nans(results)
    return final_results


