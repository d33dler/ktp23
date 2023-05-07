from dataclasses import dataclass
from math import inf


@dataclass(frozen=True)
class Property_location:
    id = "property_location"
    amsterdam = "Amsterdam"
    rotterdam = "Rotterdam"
    groningen = "Groningen"
    utrecht = "Utrecht"
    enschede = "Enschede"
    hague = "The_Hague"
    other = "Irrelevant"


@dataclass(frozen=True)
class Property_type:
    id = "property_type"
    apartment = "apartment"
    house = "house"


@dataclass(frozen=True)
class Furnished:
    id = "furnished"
    yes = True
    no = False


@dataclass(frozen=True)
class Living_room:
    id = "living_room"
    private = "private"
    shared = "shared"


@dataclass(frozen=True)
class Pets_allowed:
    id = "pets_allowed"
    yes = True
    no = False


@dataclass(frozen=True)
class Deposit_allowed:
    id = "deposit_allowed"
    yes = True
    no = False


@dataclass(frozen=True)
class Living_capacity:
    id = "living_capacity"


@dataclass(frozen=True)
class Distance_to_city:
    id = "distance_to_city"
    opt1 = 2  # < km
    opt2 = 5  # < km
    opt3 = 6  # > km


@dataclass(frozen=True)
class Area_sqm:
    id = "area_sqm"


@dataclass(frozen=True)
class Security:
    id = 'security'
    yes = True
    no = False


@dataclass(frozen=True)
class Quality_of_construction:
    id = "quality_of_construction"
    high = "high"
    mid = "mid"
    low = "low"


@dataclass(frozen=True)
class Renovation_date:
    id = "renovation_date"
    y5 = 5
    y8 = 8
    y8_more = 10


@dataclass(frozen=True)
class Flood_risk:
    id = "flood_risk"
    yes = True
    no = False


@dataclass(frozen=True)
class Balcony_access:
    id = "balcony_access"
    yes = True
    no = False


@dataclass(frozen=True)
class Near_public_transportation:
    yes = True
    no = False


@dataclass(frozen=True)
class Parking_availability:
    id = "parking_availability"
    private = "private"
    street = "street"
    none = "none"


@dataclass(frozen=True)
class Parking_space:
    id = "parking_space"
    garage = "garage"
    driveway = "driveway"
    carport = "carport"
    none = "none"


@dataclass(frozen=True)
class Garden_or_terrace:
    id = "garden_or_terrace"
    yes = True
    no = False


@dataclass(frozen=True)
class Security:
    id = "security"
    yes = True
    no = False


@dataclass(frozen=True)
class Security_features:
    id = "security_features"
    alarm = "alarm"
    surveillance = "surveillance"
    guard = "guard"
    none = "none"


@dataclass(frozen=True)
class Earthquake_risk:
    id = "earthquake_risk"
    yes = True
    no = False


# Dataclasses for newly added fields #TODO update these
@dataclass(frozen=True)
class Balcony_access:
    id = "balcony_access"


@dataclass(frozen=True)
class Community_facilities:
    id = "community_facilities"


@dataclass(frozen=True)
class Bathrooms:
    id = "bathrooms"


@dataclass(frozen=True)
class Elevator:
    id = "elevator"


@dataclass(frozen=True)
class Storage_room:
    id = "storage_room"


@dataclass(frozen=True)
class Levels:
    id = "levels"


@dataclass(frozen=True)
class Apartment_level:
    id = "apartment_level"


@dataclass(frozen=True)
class Real_estate_developer:
    id = "real_estate_developer"


@dataclass(frozen=True)
class Ad_author:
    id = "ad_author"


@dataclass(frozen=True)
class Housing_fund:
    id = "housing_fund"


@dataclass(frozen=True)
class Att:
    id = "__ignore__"
    area_sqm = Area_sqm()
    property_location = Property_location()
    property_type = Property_type()
    furnished = Furnished()
    living_capacity = Living_capacity()
    living_room = Living_room()
    pets_allowed = Pets_allowed()
    distance_to_city = Distance_to_city()
    parking_space = Parking_space()
    flood_risk = Flood_risk()
    renovation_date = Renovation_date()
    quality_of_construction = Quality_of_construction()

    # Newly added fields
    balcony_access = Balcony_access()
    community_facilities = Community_facilities()
    bathrooms = Bathrooms()
    elevator = Elevator()
    storage_room = Storage_room()
    levels = Levels()
    apartment_level = Apartment_level()
    real_estate_developer = Real_estate_developer()
    ad_author = Ad_author()
    housing_fund = Housing_fund()
