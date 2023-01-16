from dataclasses import dataclass

from form_fields import Furnished, Shower, Toilet, Att


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

    def __init__(self, rental_property):
        self.rental_property = rental_property

    def calculate_valuation(self):
        A = Att()
        rental_property = self.rental_property
        sqm = rental_property[A.area_sqm.id]
        if sqm <= A.area_sqm.m10:
            base_valuation = 100
        elif sqm <= A.area_sqm.m10:
            base_valuation = 200
        elif sqm <= A.area_sqm.m20:
            base_valuation = 300
        elif sqm <= A.area_sqm.m30:
            base_valuation = 400
        elif sqm <= A.area_sqm.m50:
            base_valuation = 750  # TODO add 70, 100, 150 to interface
        elif sqm <= A.area_sqm.m70:
            base_valuation = 1000
        elif sqm <= A.area_sqm.m100:
            base_valuation = 1300
        else:
            base_valuation = 2000

        valuation = 100  # BIAS

        property_location = A.property_location.id
        if rental_property[property_location] == A.property_location.amsterdam:
            valuation *= 1.2
        elif rental_property[property_location] == A.property_location.rotterdam:
            valuation *= 1.15
        elif rental_property[property_location] == A.property_location.groningen:
            valuation *= 1.125

        distance_to_city = A.distance_to_city.id
        if rental_property[distance_to_city] < 1:
            valuation *= 1.25
        elif rental_property[distance_to_city] > 9:
            valuation *= 0.95

        if rental_property[A.population.id] > 1e6:
            valuation *= 1.015

        property_type = A.property_type.id
        if rental_property[property_type] == A.property_type.room:
            pass
        elif rental_property[property_type] == A.property_type.apartment:
            base_valuation *= 1.15
        elif rental_property[property_type] == A.property_type.anti_squat:
            base_valuation *= 0.85
        elif rental_property[property_type] == A.property_type.studio:
            base_valuation *= 1.225
        elif rental_property[property_type] == A.property_type.student_residence:
            base_valuation *= 1.2
        elif rental_property[property_type] == A.property_type.house:
            base_valuation *= 1.3

        furnished = A.furnished.id
        if rental_property[furnished] == Furnished.yes:
            base_valuation *= 1.15
        shower = A.shower.id
        if rental_property[shower] == Shower.private:
            valuation *= 1.175

        toilet = A.toilet.id
        if rental_property[toilet] == A.toilet.private:
            valuation *= 1.175
        living = A.living_room.id
        if rental_property[living] == A.living_room.private:
            valuation *= 1.15

        capacity = A.living_capacity.id
        legal_occupy_sqm = 12  # minimum legal limit

        if sqm // rental_property[capacity] <= legal_occupy_sqm:
            valuation *= 0.9

        if rental_property[capacity] > 5:
            if rental_property[property_type] == A.property_type.apartment:
                valuation *= 1.3
            elif rental_property[property_type] == A.property_type.studio:
                valuation *= 1.35
            elif rental_property[property_type] == A.property_type.room:
                valuation *= 0.975
        elif rental_property[capacity] > 2:
            valuation *= 1.1
        elif rental_property[capacity] == 1:
            valuation *= 0.9

        internet = A.internet.id
        if not rental_property[internet]:
            valuation *= 0.95

        energy_label = A.energy_label.id
        el = A.energy_label
        if rental_property[energy_label] in [el.A, el.B]:
            base_valuation *= 0.9
        elif rental_property[energy_label] in [el.C, el.D]:
            base_valuation *= 1.025
        elif rental_property[energy_label] == el.E:
            base_valuation *= 1.075
        elif rental_property[energy_label] == el.F:  # TODO add F & G labels
            base_valuation *= 1.1
        elif rental_property[energy_label] == el.G:
            base_valuation *= 1.12

        roommates = A.roommates.id
        if rental_property[roommates] > 1:
            valuation *= 1 - (rental_property[roommates] * 0.025)

        problem_neighb = A.problematic_neighbors.id
        if rental_property[problem_neighb]:
            valuation *= 0.9

        air_quality = A.air_quality.id
        if rental_property[air_quality] == A.air_quality.good:
            valuation *= 1.05
        elif rental_property[air_quality] == A.air_quality.bad:
            valuation *= 0.9

        nearby_disturb = A.nearby_disturbances.id

        if rental_property[nearby_disturb]:
            valuation *= 0.85

        facing = A.apartment_facing.id
        facing = rental_property[facing]

        if facing == A.apartment_facing.sunrise:
            base_valuation *= 1.05
        elif facing == A.apartment_facing.sunset:
            base_valuation *= 0.925
        elif facing == A.apartment_facing.partial_sun:
            base_valuation *= 1.025
        elif facing == A.apartment_facing.shadowed:
            base_valuation *= 0.875
        elif facing == A.apartment_facing.fully_shadowed:
            base_valuation *= 0.8

        if rental_property[A.balcony.id]:
            valuation *= 1.125

        if rental_property[A.pets.id]:
            valuation *= 1.075

        ll_t_ages = A.landlord_tenant_ages.id
        if rental_property[ll_t_ages] == A.landlord_tenant_ages.age_16_25:
            valuation *= 0.9
        elif rental_property[ll_t_ages] == A.landlord_tenant_ages.age_16_60:
            valuation *= 0.925
        elif rental_property[ll_t_ages] == A.landlord_tenant_ages.age_18_60:  # TODO check frontend
            valuation *= 0.975

        parking_avail = A.parking_avail.id
        if rental_property[parking_avail] == A.parking_avail.private:
            valuation *= 1.15
        elif rental_property[parking_avail] == A.parking_avail.street:
            valuation *= 1.05
        elif rental_property[parking_avail] == A.parking_avail.none:
            valuation *= 0.95

        if rental_property[A.garden_terrace.id]:
            valuation *= 1.1

        if rental_property[A.dist_schools.id] < 3:
            valuation *= 1.05
        if rental_property[A.dist_hospital.id] < 8:
            valuation *= 1.1
        if rental_property[A.security.id]:
            valuation *= 1.05
        if rental_property[A.management_fee.id] < 0.5:  # fraction of the price - aka deposit
            valuation *= 1.1

        view = A.view.id
        if rental_property[view] == A.view.city:
            valuation *= 1.1
        elif rental_property[view] == A.view.water:
            valuation *= 1.25
        elif rental_property[view] == A.view.park:
            valuation *= 1.2
        elif rental_property[view] == A.view.nature:
            valuation *= 1.15

        q_of_constr = A.quality_of_constr.id
        if rental_property[q_of_constr] == A.quality_of_constr.high:
            valuation *= 1.2
        elif rental_property[q_of_constr] == A.quality_of_constr.mid:
            valuation *= 1.1
        elif rental_property[q_of_constr] == A.quality_of_constr.low:
            valuation *= 0.9

        if rental_property[A.renovation_date.id] < 2:
            pass
        elif rental_property[A.renovation_date.id] < 8:
            base_valuation *= 0.90
        else:
            base_valuation *= 0.95
        if rental_property[A.flood_risk.id]:
            valuation *= 0.9
        if rental_property[A.earthquake_risk.id]:
            valuation *= 0.9
        if rental_property[A.dist_shops.id] < 2:
            valuation *= 1.05
        if rental_property[A.dist_gym.id] < 5:
            valuation *= 1.05
        if rental_property[A.sound_proof]:
            valuation *= 1.035
        if rental_property[A.storage_room]:
            valuation *= 1.125
        if rental_property[A.built_appliances]:
            valuation *= 1.15
        else:
            valuation *= 0.925

        if rental_property[A.elevator]:
            base_valuation *= 1.075
        if rental_property[A.pool]:
            base_valuation *= 1.35
        if rental_property[A.sauna]:
            base_valuation *= 1.25
        if rental_property[A.jacuzzi]:
            base_valuation *= 1.2
        if rental_property[A.spa]:
            base_valuation *= 1.2
        if rental_property[A.community_facilities]:
            valuation *= 1.1
        if rental_property[A.dist_touristic_area.id] < 3:
            valuation *= 1.05

        parking_space = A.parking_space.id
        if rental_property[parking_space] == A.parking_space.garage:
            valuation *= 1.2
        elif rental_property[parking_space] == A.parking_space.carport:
            valuation *= 1.1
        elif rental_property[parking_space] == A.parking_space.driveway:
            valuation *= 1.015
        elif rental_property[parking_space] == A.parking_space.none:
            valuation *= 0.95

        if rental_property[A.dist_pub_transport.id] < 1:
            valuation *= 1.1
        if rental_property[A.dist_highway.id] < 5:
            valuation *= 0.95
        if rental_property[A.dist_airport.id] < 15:
            valuation *= 0.95
        if rental_property[A.dist_train_station.id] < 3:
            valuation *= 1.1
        if rental_property[A.dist_bus_station.id] < 2:
            valuation *= 1.1
        if rental_property[A.dist_ferry_terminal.id] < 10:
            valuation *= 1.05
        if rental_property[A.dist_taxi_stand.id] < 1:
            valuation *= 1.01
        if rental_property[A.dist_bike_rental.id] < 1:
            valuation *= 1.01
        if rental_property[A.dist_car_rental.id] < 3:
            valuation *= 1.05
        if rental_property[A.lawn]:
            valuation *= 1.05
        if rental_property[A.landscaping]:
            valuation *= 1.05
        if rental_property[A.dist_park.id] < 2:
            valuation *= 1.1
        if rental_property[A.dist_recreation_area.id] < 5:
            valuation *= 1.05
        if rental_property[A.dist_zoo.id] < 10:
            valuation *= 1.1

        security_features = A.security_features.id
        if rental_property[security_features] == A.security_features.alarm:
            valuation *= 1.1
        elif rental_property[security_features] == A.security_features.surveillance:
            valuation *= 1.05
        elif rental_property[security_features] == A.security_features.guard:
            valuation *= 1.1
        elif rental_property[security_features] == A.security_features.none:
            valuation *= 0.95

        if rental_property[A.dist_schools.id] < 3:
            valuation *= 1.05
        if rental_property[A.dist_shop_center.id] < 2:
            valuation *= 1.1
        if rental_property[A.dist_library.id] < 5:
            valuation *= 1.05
        if rental_property[A.dist_pharmacy.id] < 1:
            valuation *= 1.05
        valuation += base_valuation
        return valuation
