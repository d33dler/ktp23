from fastapi import FastAPI
from model import PropertyEvaluationModel
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from pydantic import BaseModel

app = FastAPI()


class Form(BaseModel):
    area_sqm: int
    balcony_access: bool
    community_facilities: bool
    distance_to_city: int
    parking_space: str
    bathrooms: int
    elevator: bool
    flood_risk: str
    furnished: bool
    living_capacity: int
    living_room: str
    pets_allowed: str
    children_allowed: str
    property_location: str
    property_type: str
    quality_of_construction: str
    renovation_date: int
    storage_room: bool
    levels: int
    apartment_level: int
    real_estate_developer: str
    ad_author: str
    housing_fund: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pem = PropertyEvaluationModel("../resources/999MD_apartments_processed.csv", "model.json")


@app.post("/")
async def root(form: Form):
    # convert form to dict
    form = form.dict()
    # form = await form.json()
    print(form)
    rpv = pem.forward(form)
    val = rpv.calculate_valuation()
    return {"message": str(val)}
