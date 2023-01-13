from fastapi import FastAPI
from expert import RentalPropertyValuation
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from pydantic import BaseModel

app = FastAPI()

class Form(BaseModel):
    air_quality : str
    apartment_facing:  str
    area_sqm:  int
    balcony_access:  str
    built_in_appliances:  str
    community_facilities:  str
    distance_from_airport:  int
    distance_from_bike_rental:  int
    distance_from_bus_station:  int
    distance_from_car_rental:  int
    distance_from_ferry:  int
    distance_from_gym:  int
    distance_from_highway:  int
    distance_from_hospital:  int
    distance_from_library:  int
    distance_from_park:  int
    distance_from_pharmacy:  int
    distance_from_public_transportation:  int
    distance_from_recreation_area:  int
    distance_from_schools:  int
    distance_from_shopping_center:  int
    distance_from_shops:  int
    distance_from_taxi_stand:  int
    distance_from_touristic_area:  int
    distance_from_train_station:  int
    distance_from_zoo:  int
    distance_to_city:  int
    earthquake_risk:  str
    elevator:  str
    energy_label:  str
    flood_risk:  str
    furnished:  str
    garden:  str
    garden_or_terrace:  str
    internet:  str
    jacuzzi:  str
    landlord_tenant_ages:  str
    landscaping:  str
    lawn:  str
    living_capacity:  int
    living_room:  str
    management_fee:  float
    near_public_transportation:  bool
    nearby_disturbances:  str
    parking_availability:  str
    parking_space:  str
    pets_allowed:  str
    pool:  str
    population:  float
    problematic_neighbors:  str
    property_location:  str
    property_type:  str
    quality_of_construction:  str
    renovation_date:  str
    roommates:  int
    sauna:  str
    security:  str
    security_features:  str
    shower:  str
    sound_proof:  str
    spa:  str
    storage:  str
    toilet:  str
    view:  str


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/")
async def root(form : Form):
    # convert form to dict
    form = form.dict()
    print(form)
    rpv = RentalPropertyValuation(form)
    val = rpv.calculate_valuation()
    return {"message": str(val)}
