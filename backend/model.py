from form_fields import Furnished, Att


class RentalPropertyValuation:
    _base_val: float = 0  # BASE VALUATION
    _val: float = 0  # ADDITIVE VALUATION
    rental_property: dict
    _default_ppsqm = 16
    ppsqm = 16  # average price (euro) per square meter 2022 (NL)
    legal_occupy_sqm = 12  # (minimum) legal limit (m^2) occupancy space per person (NL)
    attributes = Att()
    sqm = 1

    def __init__(self, rental_property):
        self.rental_property = rental_property

    def _base_features(self):
        A = self.attributes
        rental_property = self.rental_property
        sqm = rental_property[A.area_sqm.id]
        self.sqm = sqm
        ppsqm = self.ppsqm
        _val_fraq = 1
        base_valuation = 0
        if sqm <= A.area_sqm.m10:
            ppsqm += 1.5
        elif sqm <= A.area_sqm.m20:
            ppsqm -= 0.2
        elif sqm <= A.area_sqm.m30:
            ppsqm -= 0.5
        elif sqm <= A.area_sqm.m50:
            ppsqm -= 1
        elif sqm <= A.area_sqm.m70:
            ppsqm -= 1.2
        elif sqm <= A.area_sqm.m100:
            ppsqm -= 1.5
        else:
            ppsqm -= 2.5
        self.ppsqm = ppsqm

        property_location = A.property_location.id

        if rental_property[property_location] == A.property_location.amsterdam:
            base_valuation = sqm * (ppsqm * 1.4)
        elif rental_property[property_location] == A.property_location.rotterdam:
            base_valuation = sqm * (ppsqm * 1.2)
        elif rental_property[property_location] == A.property_location.groningen:
            base_valuation = sqm * (ppsqm * 1.15)
        elif rental_property[property_location] == A.property_location.utrecht:
            base_valuation = sqm * (ppsqm * 1.25)
        elif rental_property[property_location] == A.property_location.hague:
            base_valuation = sqm * (ppsqm * 1.3)
        elif rental_property[property_location] == A.property_location.enschede:
            base_valuation = sqm * (ppsqm * 1.125)
        else:
            base_valuation = sqm * ppsqm

        property_type = A.property_type.id
        if rental_property[property_type] == A.property_type.room:
            base_valuation *= 0.95
            _val_fraq = 0.25
        elif rental_property[property_type] == A.property_type.apartment:
            base_valuation *= 1.1
            _val_fraq = 0.2
        elif rental_property[property_type] == A.property_type.anti_squat:
            base_valuation *= 0.85
            _val_fraq = 0.2
        elif rental_property[property_type] == A.property_type.studio:
            base_valuation *= 1.25
            _val_fraq = 0.25
        elif rental_property[property_type] == A.property_type.student_residence:
            base_valuation *= 1.25
            _val_fraq = 0.2
        elif rental_property[property_type] == A.property_type.house:
            base_valuation *= 1.2
            _val_fraq = 0.25

        capacity = A.living_capacity.id
        if sqm // rental_property[capacity] <= self.legal_occupy_sqm:
            if rental_property[property_type] == A.property_type.house:
                base_valuation *= 0.9
            else:
                base_valuation *= 0.85

        if rental_property[capacity] > 5:
            if rental_property[property_type] == A.property_type.apartment:
                base_valuation *= 1.1
                _val_fraq *= 0.9
            elif rental_property[property_type] == A.property_type.studio:
                base_valuation *= 1.35
                _val_fraq *= 0.8
            elif rental_property[property_type] == A.property_type.room:
                base_valuation *= 0.75
                _val_fraq *= 0.5
        elif rental_property[capacity] > 2:
            base_valuation *= 1.1
        elif rental_property[capacity] == 1:
            base_valuation *= 0.9

        if rental_property[A.storage_room]:
            base_valuation *= 1.05
        self._val = base_valuation * _val_fraq
        self._base_val = base_valuation
        print("BASE FEATURES:", self._val)
        print("BASE VALUATION:", self._base_val)

    def _location_features(self):
        A = self.attributes
        rental_property = self.rental_property
        base_valuation = self._base_val
        valuation = self._val

        distance_to_city = A.distance_to_city.id

        if rental_property[distance_to_city] <= 2:
            valuation *= 1.15
        elif rental_property[distance_to_city] > 9:
            valuation *= 0.95

        self._val = valuation
        self._base_val = base_valuation
        print("LOCATION FEATURES:", self._val)
        print("BASE VALUATION:", self._base_val)

    def _special_fetures(self):
        A = self.attributes
        rental_property = self.rental_property
        furnished = A.furnished.id
        base_valuation = self._base_val
        valuation = self._val

        self._base_val = base_valuation
        print("SPETIAL FEATURES:", self._val)
        print("BASE VALUATION:", self._base_val)

    def _misc_features(self):
        A = self.attributes
        rental_property = self.rental_property
        energy_label = A.energy_label.id
        el = A.energy_label
        base_valuation = self._base_val
        valuation = self._val

        self._base_val = base_valuation
        print("FINAL VALUATION:", self._val)
        print("BASE_VALUATION:", self._base_val)

    def calculate_valuation(self):
        self._base_features()
        self._location_features()
        self._special_fetures()
        self._misc_features()
        res = self._base_val + self._val
        self._base_val = 0
        self._val = 0
        self.ppsqm = self._default_ppsqm
        return res
