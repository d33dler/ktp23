from dataclasses import dataclass


@dataclass
class RentalProperty:
    area_sqm: int
    property_type: str
    property_location: str
    distance_to_city: float
    population: int
    furnished: bool
    shower: str
    toilet: str
    living_room: str
    living_capacity: int
    internet: bool
    energy_label: str
    roommates: int
    problematic_neighbors: bool
    air_quality: str
    nearby_disturbances: bool
    facing: str
    sun_coverage: str
    balcony: bool
    pets_allowed: bool
    landlord_seeks: str


class RentalPropertyValuation:
    def __init__(self, rental_property: RentalProperty):
        self.rental_property = rental_property
    def calculate_valuation(self, rental_property):
        base_valuation = 0
        if rental_property["area_sqm"] < 10:
            base_valuation = 200
        elif rental_property["area_sqm"] < 20:
            base_valuation = 200
        elif rental_property["area_sqm"] < 25:
            base_valuation = 300
        elif rental_property["area_sqm"] < 30:
            base_valuation = 400
        elif rental_property["area_sqm"] < 50:
            base_valuation = 500
        else:
            base_valuation = 1000 + 10 * (rental_property["area_sqm"] - 50)

        valuation = base_valuation

        if rental_property["property_location"] == "Amsterdam":
            valuation *= 1.2
        elif rental_property["property_location"] == "Rotterdam":
            valuation *= 1.15
        elif rental_property["property_location"] == "Groningen":
            valuation *= 1.125
        if rental_property["distance_to_city"] < 1:
            valuation *= 1.1
        elif rental_property["distance_to_city"] > 9:
            valuation *= 0.95

        if rental_property["population"] > 1e6:
            valuation *= 1.05

        if rental_property["property_type"] == "room":
            pass
        elif rental_property["property_type"] == "apartment":
            valuation *= 1.3
        elif rental_property["property_type"] == "anti-squat":
            valuation *= 0.85
        elif rental_property["property_type"] == "studio":
            valuation *= 1.35
        elif rental_property["property_type"] == "student-residence":
            valuation *= 1.3
        elif rental_property["property_type"] == "house":
            valuation *= 1.3
        if rental_property["furnished"]:
            valuation *= 1.1
        if rental_property["shower"] == "private":
            valuation *= 1.1
        if rental_property["toilet"] == "private":
            valuation *= 1.05
        if rental_property["living_room"] == "private":
            valuation *= 1.1
        if rental_property["living_capacity"] > 5:
            valuation *= 1.15
        elif rental_property["living_capacity"] > 2:
            valuation *= 1.1
        if not rental_property["internet"]:
            valuation *= 0.95
        if rental_property["energy_label"] in ["A","B"]:
            valuation *= 0.95
        elif rental_property["energy_label"] in ["C","D"]:
            valuation *= 1.05
        elif rental_property["energy_label"] == "E":
            valuation *= 1.08
        if rental_property["roommates"] > 1:
            valuation *= 1 - (rental_property["roommates"] * 0.025)
        if rental_property["problematic_neighbors"]:
            valuation *= 0.9
        if rental_property["air_quality"] == "average":
            valuation *= 0.9
        elif rental_property["air_quality"] == "bad":
            valuation *= 0.85
        if rental_property["nearby_disturbances"]:
            valuation *= 0.85
        if rental_property["apartment_facing"] == "sunrise":
            valuation *= 1.05
        elif rental_property["apartment_facing"] == "sunset":
            valuation *= 0.975
        elif rental_property["apartment_facing"] == "partial_sun":
            valuation *= 1.025
        elif rental_property["apartment_facing"] == "shadowed":
            valuation *= 0.9
        elif rental_property["apartment_facing"] == "completely_shadowed":
            valuation *= 0.85
        if rental_property["balcony_access"]:
            valuation *= 1.05
        if rental_property["pets_allowed"]:
            valuation *= 1.05
        if rental_property["landlord_tenant_ages"] == "16-25":
            valuation *= 0.95
        elif rental_property["landlord_tenant_ages"] == "16-60":
            valuation *= 0.975
        elif rental_property["landlord_tenant_ages"] == "18-60":
            valuation *= 0.975
        if rental_property["near_public_transportation"]:
            valuation *= 1.1
        if rental_property["parking_availability"] == "private":
            valuation *= 1.15
        elif rental_property["parking_availability"] == "street":
            valuation *= 1.05
        elif rental_property["parking_availability"] == "none":
            valuation *= 0.95
        if rental_property["garden_or_terrace"]:
            valuation *= 1.1
        if rental_property["distance_from_schools"] < 3:
            valuation *= 1.05
        if rental_property["distance_from_hospitals"] < 8:
            valuation *= 1.1
        if rental_property["security"]:
            valuation *= 1.05
        if rental_property["management_fee"] < 0.5:
            valuation *= 1.1
        if rental_property["view"] == "city":
            valuation *= 1.15
        elif rental_property["view"] == "water":
            valuation *= 1.25
        elif rental_property["view"] == "park":
            valuation *= 1.2
        elif rental_property["view"] == "none":
            valuation *= 1.05
        if rental_property["quality_of_construction"] == "luxury":
            valuation *= 1.2
        elif rental_property["quality_of_construction"] == "standard":
            valuation *= 1.1
        elif rental_property["quality_of_construction"] == "budget":
            valuation *= 0.9
        if rental_property["renovation_date"] < 2010:
            valuation *= 0.95
        if rental_property["flood_risk"]:
            valuation *= 0.9
        if rental_property["earthquake_risk"]:
            valuation *= 0.9
        if rental_property["distance_from_shops"] < 2:
            valuation *= 1.05
        if rental_property["distance_from_gym"] < 5:
            valuation *= 1.05
        if rental_property["soundproof"]:
            valuation *= 1.05
        if rental_property["storage"]:
            valuation *= 1.05
        if rental_property["built_in_appliances"]:
            valuation *= 1.1
        if rental_property["elevator"]:
            valuation *= 1.05
        if rental_property["pool"]:
            valuation *= 1.2
        if rental_property["sauna"]:
            valuation *= 1.1
        if rental_property["jacuzzi"]:
            valuation *= 1.15
        if rental_property["spa"]:
            valuation *= 1.2
        if rental_property["community_facilities"]:
            valuation *= 1.1
        if rental_property["distance_from_touristic_area"] < 3:
            valuation *= 1.05
        if rental_property["parking_space"] == "garage":
            valuation *= 1.2
        elif rental_property["parking_space"] == "carport":
            valuation *= 1.1
        elif rental_property["parking_space"] == "driveway":
            valuation *= 1.05
        elif rental_property["parking_space"] == "none":
            valuation *= 0.95
        if rental_property["distance_from_public_transportation"] < 1:
            valuation *= 1.1
        if rental_property["distance_from_highway"] < 5:
            valuation *= 0.95
        if rental_property["distance_from_airport"] < 15:
            valuation *= 0.95
        if rental_property["distance_from_train_station"] < 3:
            valuation *= 1.1
        if rental_property["distance_from_bus_station"] < 2:
            valuation *= 1.1
        if rental_property["distance_from_ferry_terminal"] < 10:
            valuation *= 1.05
        if rental_property["distance_from_taxi_stand"] < 1:
            valuation *= 1.05
        if rental_property["distance_from_bike_rental"] < 1:
            valuation *= 1.05
        if rental_property["distance_from_car_rental"] < 3:
            valuation *= 1.05
        if rental_property["lawn"]:
            valuation *= 1.05
        if rental_property["landscaping"]:
            valuation *= 1.05
        if rental_property["garden"]:
            valuation *= 1.1
        if rental_property["distance_from_park"] < 2:
            valuation *= 1.1
        if rental_property["distance_from_recreation_area"] < 5:
            valuation *= 1.05
        if rental_property["distance_from_zoo"] < 10:
            valuation *= 1.1
        if rental_property["view"] == "ocean":
            valuation *= 1.2
        elif rental_property["view"] == "mountain":
            valuation *= 1.15
        elif rental_property["view"] == "city":
            valuation *= 1.1
        elif rental_property["view"] == "none":
            valuation *= 0.95
        if rental_property["security_features"] == "alarm":
            valuation *= 1.1
        elif rental_property["security_features"] == "surveillance":
            valuation *= 1.05
        elif rental_property["security_features"] == "guard":
            valuation *= 1.1
        elif rental_property["security_features"] == "none":
            valuation *= 0.95
        if rental_property["distance_from_school"] < 3:
            valuation *= 1.05
        if rental_property["distance_from_shopping_center"] < 2:
            valuation *= 1.1
        if rental_property["distance_from_gym"] < 3:
            valuation *= 1.05
        if rental_property["distance_from_library"] < 5:
            valuation *= 1.05
        if rental_property["distance_from_hospital"] < 10:
            valuation *= 1.05
        if rental_property["distance_from_pharmacy"] < 2:
            valuation *= 1.05
        return valuation


property = RentalProperty(area_sqm=20, property_type="studio", property_location="Amsterdam", distance_to_city=3,
                          population=800000, furnished=True, shower="private", toilet="private", living_room="private",
                          living_capacity=3, internet=True, energy_label="A", roommates=1, problematic_neighbors=False,
                          air_quality="good", nearby_disturbances=False, facing="sunrise", sun_coverage="partial",
                          balcony=True, pets_allowed=True, landlord_seeks="25-99")
valuation_system = RentalPropertyValuation(property)
final_valuation = valuation_system.final_valuation()
print(final_valuation)
