from dataclasses import dataclass
from enum import Enum
from math import inf


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


@dataclass(frozen=True)
class Property_location:
    id = "property_location"
    amsterdam = "Amsterdam"
    rotterdam = "Rotterdam"
    groningen = "Groningen"


@dataclass(frozen=True)
class Property_type:
    id = "property_type"
    room = "room"
    apartment = "apartment"
    anti_squat = "anti-squat"
    studio = "studio"
    student_residence = "student-residence"
    house = "house"


@dataclass(frozen=True)
class Furnished:
    id = "furnished"
    yes = True
    no = False


@dataclass(frozen=True)
class Shower:
    id = "shower"
    private = "private"
    shared = "shared"


@dataclass(frozen=True)
class Toilet:
    id = "toilet"
    private = "private"
    shared = "shared"


@dataclass(frozen=True)
class Living_room:
    id = "living_room"
    private = "private"
    shared = "shared"


@dataclass(frozen=True)
class Internet:
    id = "internet"
    yes = True
    no = False


@dataclass(frozen=True)
class Energy_label:
    id = energy_label
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"


@dataclass(frozen=True)
class Problematic_neighbors:
    id = "problematic_neighbors"
    yes = True
    no = False


@dataclass(frozen=True)
class Air_quality:
    id = "air_quality"
    good = "good"
    average = "average"
    bad = "bad"


@dataclass(frozen=True)
class Nearby_disturbances:
    id = "nearby_disturbances"
    yes = True
    no = False


@dataclass(frozen=True)
class Apartment_facing:
    id = "apartment_facing"
    sunrise = "sunrise"
    sunset = "sunset"
    partial_sun = "partial_sun"
    shadowed = "shadowed"
    fully_shadowed = "fully_shadowed"


@dataclass(frozen=True)
class Pets_allowed:
    id = "pets_allowed"
    yes = True
    no = False


@dataclass(frozen=True)
class Landlord_tenant_age:
    id = "landlord_tenant_age"
    all_ages = "all_ages"
    age_16_25 = "age_16_25"
    age_16_60 = "age_16_60"
    age_18_60 = "age_18_60"
    age_25_99 = "age_25_99"


@dataclass(frozen=True)
class Deposit_allowed:
    id = "deposit_allowed"
    yes = True
    no = False


@dataclass(frozen=True)
class Landlord_tenant_ages:
    id = "landlord_tenant_ages"
    all_ages = "all ages"
    ages_16_25 = "16-25"
    ages_16_60 = "16-60"
    ages_18_60 = "18-60"
    ages_25_99 = "25-99"


@dataclass(frozen=True)
class Pets:
    id = "pets"
    allowed = "allowed"
    not_allowed = "not allowed"


@dataclass(frozen=True)
class Living_capacity:
    id = "living_capacity"
    p1 = 1
    p2 = 2
    p3 = 3
    p4 = 4
    p5 = 5
    more = inf


@dataclass(frozen=True)
class Roommates:
    id = "roommates"
    p1 = 1
    p2 = 2
    p3 = 3
    p4 = 4
    p5 = 5
    more = inf


@dataclass(frozen=True)
class Distance_to_city:
    id = "distance_to_city"
    opt1 = 2  # < km
    opt2 = 5  # < km


class Area_sqm:
    id = "area_sqm"
    m10 = 10  # <
    m20 = 20
    m25 = 25
    m30 = 30
    m50 = 50
    ceil = inf


@dataclass(frozen=True)
class Att:
    id = "__ignore__"
    area_sqm = Area_sqm()
    property_location = Property_location()
    property_type = Property_type()
    furnished = Furnished()
    shower = Shower()
    toilet = Toilet()
    living_room = Living_room()
    living_capacity = Living_capacity()
    internet = Internet()
    energy_label = Energy_label()
    roommates = Roommates()
    problematic_neighbors = Problematic_neighbors()
    air_quality = Air_quality()
    nearby_disturbances = Nearby_disturbances()
    apartment_facing = Apartment_facing()
    pets = Pets()
    landlord_tenant_ages = Landlord_tenant_ages()
    distance_to_city = "distance_to_city"
    population = "population"


class RentalPropertyValuation:

    def __init__(self, rental_property: RentalProperty):
        self.rental_property = rental_property

    def calculate_valuation(self, rental_property: dict):
        A = Att()

        if rental_property[A.area_sqm] < A.area_sqm.m10:
            base_valuation = 100
        elif rental_property[A.area_sqm] < A.area_sqm.m10:
            base_valuation = 200
        elif rental_property[A.area_sqm] < A.area_sqm.m20:
            base_valuation = 300
        elif rental_property[A.area_sqm] < A.area_sqm.m30:
            base_valuation = 400
        elif rental_property[A.area_sqm] < A.area_sqm.m50:
            base_valuation = 500
        else:
            base_valuation = 1000 + 10 * (rental_property["area_sqm"] - 50)

        valuation = base_valuation
        property_location = A.property_location.id
        if rental_property[property_location] == A.property_location.amsterdam:
            valuation *= 1.2
        elif rental_property[property_location] == A.property_location.rotterdam:
            valuation *= 1.15
        elif rental_property[property_location] == A.property_location.groningen:
            valuation *= 1.125

        distance_to_city = A.distance_to_city
        if rental_property[distance_to_city] < 1:
            valuation *= 1.1
        elif rental_property[distance_to_city] > 9:
            valuation *= 0.95

        if rental_property[A.population] > 1e6:
            valuation *= 1.05

        property_type = A.property_type.id
        if rental_property[property_type] == A.property_type.room:
            pass
        elif rental_property[property_type] == A.property_type.apartment:
            valuation *= 1.3
        elif rental_property[property_type] == A.property_type.anti_squat:
            valuation *= 0.85
        elif rental_property[property_type] == A.property_type.studio:
            valuation *= 1.35
        elif rental_property[property_type] == A.property_type.student_residence:
            valuation *= 1.3
        elif rental_property[property_type] == A.property_type.house:
            valuation *= 1.3

        furnished = Att.furnished
        if rental_property[furnished] == Furnished.yes:
            valuation *= 1.1
        shower = Shower.id
        if rental_property[shower] == Shower.private:
            valuation *= 1.1

        toilet = Toilet.id
        if rental_property[toilet] == A.toilet.private:
            valuation *= 1.05
        living = A.living_room.id
        if rental_property[living] == A.living_room.private:
            valuation *= 1.1

        capacity = A.living_capacity.id
        if rental_property[capacity] > 5:
            valuation *= 1.15
        elif rental_property[capacity] > 2:
            valuation *= 1.1
        internet = A.internet.id
        if not rental_property[internet]:
            valuation *= 0.95

        energy_label = A.energy_label.id
        el = A.energy_label
        if rental_property[energy_label] in [el.A, el.B]:
            valuation *= 0.95
        elif rental_property[energy_label] in [el.C, el.D]:
            valuation *= 1.05
        elif rental_property[energy_label] == el.E:
            valuation *= 1.08
        roommates = A.roommates.id
        if rental_property[roommates] > 1:
            valuation *= 1 - (rental_property[roommates] * 0.025)

        problem_neighb = A.problematic_neighbors.id
        if rental_property[problem_neighb]:
            valuation *= 0.9

        air_quality = A.air_quality.id
        if rental_property[air_quality] == A.air_quality.average:
            valuation *= 0.9
        elif rental_property[air_quality] == A.air_quality.bad:
            valuation *= 0.85

        nearby_disturb = A.nearby_disturbances.id
        if rental_property[nearby_disturb]:
            valuation *= 0.85
        facing = A.apartment_facing.id
        if rental_property[facing] == A.apartment_facing.sunrise:
            valuation *= 1.05
        elif rental_property[facing] == A.apartment_facing.sunset:
            valuation *= 0.975
        elif rental_property[facing] == A.apartment_facing.partial_sun:
            valuation *= 1.025
        elif rental_property[facing] == A.apartment_facing.shadowed:
            valuation *= 0.9
        elif rental_property[facing] == A.apartment_facing.fully_shadowed:
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


# property = RentalProperty(area_sqm=20, property_type="studio", property_location="Amsterdam", distance_to_city=3,
#                           population=800000, furnished=True, shower="private", toilet="private", living_room="private",
#                           living_capacity=3, internet=True, energy_label="A", roommates=1, problematic_neighbors=False,
#                           air_quality="good", nearby_disturbances=False, facing="sunrise", sun_coverage="partial",
#                           balcony=True, pets_allowed=True, landlord_seeks="25-99")
valuation_system = RentalPropertyValuation(property)
final_valuation = valuation_system.calculate_valuation(dict())
print(final_valuation)
