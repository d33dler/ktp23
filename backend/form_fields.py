from dataclasses import dataclass
from math import inf


@dataclass(frozen=True)
class Property_location:
    id = "property_location"
    amsterdam = "Amsterdam"
    rotterdam = "Rotterdam"
    groningen = "Groningen"
    other = "Irrelevant"


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
    id = "energy_label"
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
    opt3 = 6  # > km


@dataclass(frozen=True)
class Area_sqm:
    id = "area_sqm"
    l10 = 1  # <
    m10 = 10
    m20 = 20
    m25 = 25
    m30 = 30
    m50 = 50  # >
    m50_more = inf


@dataclass(frozen=True)
class Population:
    m1 = 1E6  # <
    m2 = 1E6  # <


@dataclass(frozen=True)
class Nearby_public_transport:
    id = 'nearby_public_transport'
    yes = True
    no = False


@dataclass(frozen=True)
class Garden_or_terrace:
    id = 'garden_or_terrace'
    yes = True
    no = False


@dataclass(frozen=True)
class Distance_from_schools:
    id = 'distance_from_schools'
    km1 =8  # <


@dataclass(frozen=True)
class Security:
    id = 'security'
    yes = True
    no = False


@dataclass(frozen=True)
class Management_fee:
    id = 'management_fee'
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
class Pets_allowed:
    id = "pets_allowed"
    yes = True
    no = False


@dataclass(frozen=True)
class Landlord_tenant_ages:
    id = "landlord_tenant_ages"
    age_16_25 = "16-25"
    age_16_60 = "16-60"
    age_18_60 = "18-60"


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
class Management_fee:
    id = "management_fee"
    yes = 0.5  # <
    no = 1  # >


@dataclass(frozen=True)
class View:
    id = "view"
    city = "city"
    water = "water"
    park = "park"
    nature = "nature"
    other = "other"


@dataclass(frozen=True)
class Security_features:
    id = "security_features"
    alarm = "alarm"
    surveillance = "surveillance"
    guard = "guard"
    none = "none"


@dataclass(frozen=True)
class Distance_from_school:
    id = "distance_from_school"
    km3_more = 3  # >


@dataclass(frozen=True)
class Distance_from_shopping_center:
    id = "distance_from_shopping_center"
    km1 = 2  # <


@dataclass(frozen=True)
class Distance_from_gym:
    id = "distance_from_gym"
    km1 = 5  # <


@dataclass(frozen=True)
class Distance_from_library:
    id = "distance_from_library"
    km5 = 5  # <


@dataclass(frozen=True)
class Distance_from_hospital:
    id = "distance_from_hospital"
    km1 = 8  # <

@dataclass(frozen=True)
class Distance_from_pharmacy:
    id = "distance_from_pharmacy"
    km1 = 1  # <


@dataclass(frozen=True)
class Distance_from_airport:
    id = "distance_from_airport"
    km1 = 15  # <


@dataclass(frozen=True)
class Distance_from_train_station:
    id = "distance_from_train_station"
    km1 = 3  # <


@dataclass(frozen=True)
class Distance_from_ferry:
    id = "distance_from_ferry"
    km1 = 10  # <

@dataclass(frozen=True)
class Distance_from_bike_rental:
    id = "distance_from_bike_rental"
    km1 = 1  # <


@dataclass(frozen=True)
class Distance_from_car_rental:
    id = "distance_from_car_rental"
    km1 = 3  # <


@dataclass(frozen=True)
class Distance_from_public_transportation:
    id = "distance_from_public_transportation"
    km1 = 1  # <


@dataclass(frozen=True)
class Distance_from_highway:
    id = "distance_from_highway"
    km5 = 5  # <


@dataclass(frozen=True)
class Distance_from_park:
    id = "distance_from_park"
    km2 = 2  # <


@dataclass(frozen=True)
class Distance_from_taxi_stand:
    id = "distance_from_taxi_stand"
    km1 = 1  # <


@dataclass(frozen=True)
class Distance_from_recreation_area:
    id = "distance_from_recreation_area"
    km5 = 5  # <


@dataclass(frozen=True)
class Distance_from_library:
    id = "distance_from_library"
    km5 = 5  # <


@dataclass(frozen=True)
class Distance_from_touristic_area:
    id = "distance_from_touristic_area"
    km3 = 3  # >


@dataclass(frozen=True)
class Earthquake_risk:
    id = "earthquake_risk"
    yes = True
    no = False


@dataclass(frozen=True)
class Distance_from_bus_station:
    id = "distance_from_bus_station"
    km2 = 2  # <


@dataclass(frozen=True)
class Distance_from_zoo:
    id = "distance_from_zoo"
    km1 = 10  # <


@dataclass(frozen=True)
class Distance_from_shops:
    id = "distance_from_shops"
    km2 = 2  # <


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
    pets = Pets_allowed()
    landlord_tenant_ages = Landlord_tenant_ages()
    distance_to_city = Distance_to_city()
    population = Population()
    balcony = Balcony_access()
    near_pub_transport = Nearby_public_transport()
    parking_avail = Parking_availability()
    parking_space = Parking_space()
    garden_terrace = Garden_or_terrace()
    dist_schools = Distance_from_schools()
    dist_pharmacy = Distance_from_pharmacy()
    dist_hospital = Distance_from_hospital()
    dist_shop_center = Distance_from_shopping_center()
    dist_gym = Distance_from_gym()
    dist_airport = Distance_from_airport()
    dist_train_station = Distance_from_train_station()
    dist_ferry_terminal = Distance_from_ferry()
    dist_bike_rental = Distance_from_bike_rental()
    dist_car_rental = Distance_from_car_rental()
    dist_touristic_area = Distance_from_touristic_area()
    dist_pub_transport = Distance_from_public_transportation()
    dist_highway = Distance_from_highway()
    dist_bus_station = Distance_from_bus_station()
    dist_taxi_stand = Distance_from_taxi_stand()
    dist_park = Distance_from_park()
    dist_recreation_area = Distance_from_recreation_area()
    dist_zoo = Distance_from_zoo()
    dist_library = Distance_from_library()
    security_features = Security_features()
    security = Security()
    management_fee = Management_fee()
    view = View()
    quality_of_constr = Quality_of_construction()
    renovation_date = Renovation_date()
    flood_risk = Flood_risk()
    earthquake_risk = Earthquake_risk()
    dist_shops = Distance_from_shops()
    # booleans
    sound_proof = "sound_proof"
    built_appliances = "built_appliances"
    storage_room = "storage_room"
    elevator = "elevator"
    pool = "pool"
    sauna = "sauna"
    jacuzzi = "jacuzzi"
    spa = "spa"
    community_facilities = "community_facilities"
    lawn = "lawn"
    landscaping = "landscaping"
