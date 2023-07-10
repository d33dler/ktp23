from fastapi import FastAPI
from model import PropertyEvaluationModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

from typing import List, Dict
from pydantic import BaseModel

class ExtraInfo(BaseModel):
    dist_to_center: float
    num_floors: int
    num_rooms: int
    area_m2: int
    bathroom: int

class Form(BaseModel):
    idx: List[int]
    extra: ExtraInfo

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print('Reading model.json')

pem = PropertyEvaluationModel("../resources/999MD_apartments_processed.csv", "model.json")

print('Model loaded')

@app.post("/")
async def root(form : Form):
    # convert form to dict
    area = form.extra.area_m2
    form = form.dict()
    val = pem.forward(form)
    return {"message": str(val * area)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)