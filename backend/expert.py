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

    def base_valuation(self):
        if self.rental_property.area_sqm < 10:
            return 200
        elif self.rental_property.area_sqm == 10:
            return 200
        elif self.rental_property.area_sqm == 20:
            return 300
        elif self.rental_property.area_sqm == 25:
            return 400
        elif self.rental_property.area_sqm == 30:
            return 500
        elif self.rental_property.area_sqm > 50:
            return 1000 + (self.rental_property.area_sqm - 50) * 10
        else:
            return 0

    def final_valuation(self):
        valuation = self.base_valuation()

        if self.rental_property.property_location == "Amsterdam":
            valuation *= 1.2
        elif self.rental_property.property_location == "Rotterdam":
            valuation *= 1.15
        elif self.rental_property.property_location == "Groningen":
            valuation *= 1.125

        if self.rental_property.population > 1e6:
            valuation *= 1.05

        if self.rental_property.property_type == "room":
            pass
        elif self.rental_property.property_type == "apartment":
            valuation *= 1.3
        elif self.rental_property.property_type == "studio":
            valuation *= 1.35
        elif self.rental_property.property_type == "student-residence":
            valuation *= 1.3
        elif self.rental_property.property_type == "house":
            valuation *= 1.3
        # and so on for the other factors

        return valuation


property = RentalProperty(area_sqm=20, property_type="studio", property_location="Amsterdam", distance_to_city=3,
                          population=800000, furnished=True, shower="private", toilet="private", living_room="private",
                          living_capacity=3, internet=True, energy_label="A", roommates=1, problematic_neighbors=False,
                          air_quality="good", nearby_disturbances=False, facing="sunrise", sun_coverage="partial",
                          balcony=True, pets_allowed=True, landlord_seeks="25-99")
valuation_system = RentalPropertyValuation(property)
final_valuation = valuation_system.final_valuation()
print(final_valuation)
