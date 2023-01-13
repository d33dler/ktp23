from fastapi import FastAPI
from expert import RentalPropertyValuation

app = FastAPI()


@app.post("/")
async def root(body):
    form = dict(await body.json())
    rpv = RentalPropertyValuation(form)
    val = rpv.calculate_valuation()
    return {"message": str(val)}
