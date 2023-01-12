import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


function MainForm() {
    
    const [area_sqm, set_area_sqm] = useState(null);
    const [property_location, set_property_location] = useState(null);
    const [distance_to_city, set_distance_to_city] = useState(null);
    const [population, set_population] = useState(null);
    const [property_type, set_property_type] = useState(null);
    const [furnished, set_furnished] = useState(null);
    const [shower, set_shower] = useState(null);
    const [toilet, set_toilet] = useState(null);
    const [living_room, set_living_room] = useState(null);
    const [living_capacity, set_living_capacity] = useState(null);
    const [internet, set_internet] = useState(null);
    const [energy_label, set_energy_label] = useState(null);
    const [roommates, set_roommates] = useState(null);
    const [problematic_neighbors, set_problematic_neighbors] = useState(null);
    const [air_quality, set_air_quality] = useState(null);
    const [nearby_disturbances, set_nearby_disturbances] = useState(null);
    const [apartment_facing, set_apartment_facing] = useState(null);
    const [balcony_access, set_balcony_access] = useState(null);
    const [pets_allowed, set_pets_allowed] = useState(null);
    const [landlord_tenant_ages, set_landlord_tenant_ages] = useState(null);
    const [near_public_transportation, set_near_public_transportation] = useState(null);
    const [parking_availability, set_parking_availability] = useState(null);
    const [garden_or_terrace, set_garden_or_terrace] = useState(null);
    const [distance_from_schools, set_distance_from_schools] = useState(null);
    const [distance_from_hospitals, set_distance_from_hospitals] = useState(null);
    const [security, set_security] = useState(null);
    const [management_fee, set_management_fee] = useState(null);
    const [quality_of_construction, set_quality_of_construction] = useState(null);
    const [renovation_date, set_renovation_date] = useState(null);
    const [flood_risk, set_flood_risk] = useState(null);
    const [earthquake_risk, set_earthquake_risk] = useState(null);
    const [distance_from_shops, set_distance_from_shops] = useState(null);
    const [distance_from_gym, set_distance_from_gym] = useState(null);
    const [soundproof, set_soundproof] = useState(null);
    const [storage, set_storage] = useState(null);
    const [built_in_appliances, set_built_in_appliances] = useState(null);
    const [elevator, set_elevator] = useState(null);
    const [pool, set_pool] = useState(null);
    const [sauna, set_sauna] = useState(null);
    const [jacuzzi, set_jacuzzi] = useState(null);
    const [spa, set_spa] = useState(null);
    const [community_facilities, set_community_facilities] = useState(null);
    const [distance_from_touristic_area, set_distance_from_touristic_area] = useState(null);
    const [parking_space, set_parking_space] = useState(null);
    const [distance_from_public_transportation, set_distance_from_public_transportation] = useState(null);
    const [distance_from_highway, set_distance_from_highway] = useState(null);
    const [distance_from_airport, set_distance_from_airport] = useState(null);
    const [distance_from_train_station, set_distance_from_train_station] = useState(null);
    const [distance_from_bus_station, set_distance_from_bus_station] = useState(null);
    const [distance_from_ferry_terminal, set_distance_from_ferry_terminal] = useState(null);
    const [distance_from_taxi_stand, set_distance_from_taxi_stand] = useState(null);
    const [distance_from_bike_rental, set_distance_from_bike_rental] = useState(null);
    const [distance_from_car_rental, set_distance_from_car_rental] = useState(null);
    const [lawn, set_lawn] = useState(null);
    const [landscaping, set_landscaping] = useState(null);
    const [garden, set_garden] = useState(null);
    const [distance_from_park, set_distance_from_park] = useState(null);
    const [distance_from_recreation_area, set_distance_from_recreation_area] = useState(null);
    const [distance_from_zoo, set_distance_from_zoo] = useState(null);
    const [view, set_view] = useState(null);
    const [security_features, set_security_features] = useState(null);
    const [distance_from_school, set_distance_from_school] = useState(null);
    const [distance_from_shopping_center, set_distance_from_shopping_center] = useState(null);
    const [distance_from_library, set_distance_from_library] = useState(null);
    const [distance_from_hospital, set_distance_from_hospital] = useState(null);
    const [distance_from_pharmacy, set_distance_from_pharmacy] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    /**
     * convert all the previous states into a form data object
     * 
     */
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                {/* include all the states above */}
            <Form.Label>Area Sqm</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Area Sqm" onChange={(e) => set_area_sqm(e.target.value)}>
            <Form.Check type="radio" label="10" value={area_sqm} onChange={set_area_sqm} name="group-0"/>
            <Form.Check type="radio" label="20" value={area_sqm} onChange={set_area_sqm} name="group-0"/>
            <Form.Check type="radio" label="25" value={area_sqm} onChange={set_area_sqm} name="group-0"/>
            <Form.Check type="radio" label="30" value={area_sqm} onChange={set_area_sqm} name="group-0"/>
            <Form.Check type="radio" label="50" value={area_sqm} onChange={set_area_sqm} name="group-0"/>
            <Form.Check type="radio" label=">50" value={area_sqm} onChange={set_area_sqm} name="group-0"/>
            </Form.Control>

            <Form.Label>Property Location</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Property Location" onChange={(e) => set_property_location(e.target.value)}>
            <Form.Check type="radio" label = "Amsterdam" value={property_location} onChange={set_property_location} name="group-1"/>
            <Form.Check type="radio" label = "Rotterdam" value={property_location} onChange={set_property_location} name="group-1"/>
            <Form.Check type="radio" label = "Groningen" value={property_location} onChange={set_property_location} name="group-1"/>
            </Form.Control>

            <Form.Label>Distance To City</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance To City" onChange={(e) => set_distance_to_city(e.target.value)}>
            <Form.Check type="radio" label="2" value={distance_to_city} onChange={set_distance_to_city} name="group-2"/>
            <Form.Check type="radio" label="5" value={distance_to_city} onChange={set_distance_to_city} name="group-2"/>
            </Form.Control>

            <Form.Label>Population</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Population" onChange={(e) => set_population(e.target.value)}>
            <Form.Check type="radio" label="yes" value={population} onChange={set_population} name="group-3"/>
            <Form.Check type="radio" label="no" value={population} onChange={set_population} name="group-3"/>
            </Form.Control>

            <Form.Label>Property Type</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Property Type" onChange={(e) => set_property_type(e.target.value)}>
            <Form.Check type="radio" label = "room" value={property_type} onChange={set_property_type} name="group-4"/>
            <Form.Check type="radio" label = "apartment" value={property_type} onChange={set_property_type} name="group-4"/>
            <Form.Check type="radio" label = "anti-squat" value={property_type} onChange={set_property_type} name="group-4"/>
            <Form.Check type="radio" label = "studio" value={property_type} onChange={set_property_type} name="group-4"/>
            <Form.Check type="radio" label = "student-residence" value={property_type} onChange={set_property_type} name="group-4"/>
            <Form.Check type="radio" label = "house" value={property_type} onChange={set_property_type} name="group-4"/>
            </Form.Control>

            <Form.Label>Furnished</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Furnished" onChange={(e) => set_furnished(e.target.value)}>
            <Form.Check type="radio" label="yes" value={furnished} onChange={set_furnished} name="group-5"/>
            <Form.Check type="radio" label="no" value={furnished} onChange={set_furnished} name="group-5"/>
            </Form.Control>

            <Form.Label>Shower</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Shower" onChange={(e) => set_shower(e.target.value)}>
            <Form.Check type="radio" label = "private" value={shower} onChange={set_shower} name="group-6"/>
            <Form.Check type="radio" label = "shared" value={shower} onChange={set_shower} name="group-6"/>
            </Form.Control>

            <Form.Label>Living Room</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Living Room" onChange={(e) => set_living_room(e.target.value)}>
            <Form.Check type="radio" label = "private" value={living_room} onChange={set_living_room} name="group-8"/>
            <Form.Check type="radio" label = "shared" value={living_room} onChange={set_living_room} name="group-8"/>
            </Form.Control>

            <Form.Label>Toilet</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Toilet" onChange={(e) => set_toilet(e.target.value)}>
            <Form.Check type="radio" label = "private" value={toilet} onChange={set_toilet} name="group-7"/>
            <Form.Check type="radio" label = "shared" value={toilet} onChange={set_toilet} name="group-7"/>
            </Form.Control>

            <Form.Label>Living Capacity</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Living Capacity" onChange={(e) => set_living_capacity(e.target.value)}>
            <Form.Check type="radio" label="<=4" value={living_capacity} onChange={set_living_capacity} name="group-9"/>
            <Form.Check type="radio" label=">4" value={living_capacity} onChange={set_living_capacity} name="group-9"/>
            </Form.Control>

            <Form.Label>Internet</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Internet" onChange={(e) => set_internet(e.target.value)}>
            <Form.Check type="radio" label="yes" value={internet} onChange={set_internet} name="group-10"/>
            <Form.Check type="radio" label="no" value={internet} onChange={set_internet} name="group-10"/>
            </Form.Control>

            <Form.Label>Energy Label</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Energy Label" onChange={(e) => set_energy_label(e.target.value)}>
            <Form.Check type="radio" label = "A" value={energy_label} onChange={set_energy_label} name="group-11"/>
            <Form.Check type="radio" label = "B" value={energy_label} onChange={set_energy_label} name="group-11"/>
            <Form.Check type="radio" label = "C" value={energy_label} onChange={set_energy_label} name="group-11"/>
            <Form.Check type="radio" label = "D" value={energy_label} onChange={set_energy_label} name="group-11"/>
            <Form.Check type="radio" label = "E" value={energy_label} onChange={set_energy_label} name="group-11"/>
            </Form.Control>

            <Form.Label>Roommates</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Roommates" onChange={(e) => set_roommates(e.target.value)}>
            <Form.Check type="radio" label="yes" value={roommates} onChange={set_roommates} name="group-12"/>
            <Form.Check type="radio" label="no" value={roommates} onChange={set_roommates} name="group-12"/>
            </Form.Control>

            <Form.Label>Problematic Neighbors</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Problematic Neighbors" onChange={(e) => set_problematic_neighbors(e.target.value)}>
            <Form.Check type="radio" label="yes" value={problematic_neighbors} onChange={set_problematic_neighbors} name="group-13"/>
            <Form.Check type="radio" label="no" value={problematic_neighbors} onChange={set_problematic_neighbors} name="group-13"/>
            </Form.Control>

            <Form.Label>Air Quality</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Air Quality" onChange={(e) => set_air_quality(e.target.value)}>
            <Form.Check type="radio" label = "good" value={air_quality} onChange={set_air_quality} name="group-14"/>
            <Form.Check type="radio" label = "average" value={air_quality} onChange={set_air_quality} name="group-14"/>
            <Form.Check type="radio" label = "bad" value={air_quality} onChange={set_air_quality} name="group-14"/>
            </Form.Control>

            <Form.Label>Nearby Disturbances</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Nearby Disturbances" onChange={(e) => set_nearby_disturbances(e.target.value)}>
            <Form.Check type="radio" label="yes" value={nearby_disturbances} onChange={set_nearby_disturbances} name="group-15"/>
            <Form.Check type="radio" label="no" value={nearby_disturbances} onChange={set_nearby_disturbances} name="group-15"/>
            </Form.Control>

            <Form.Label>Apartment Facing</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Apartment Facing" onChange={(e) => set_apartment_facing(e.target.value)}>
            <Form.Check type="radio" label = "sunrise" value={apartment_facing} onChange={set_apartment_facing} name="group-16"/>
            <Form.Check type="radio" label = "sunset" value={apartment_facing} onChange={set_apartment_facing} name="group-16"/>
            <Form.Check type="radio" label = "partial_sun" value={apartment_facing} onChange={set_apartment_facing} name="group-16"/>
            <Form.Check type="radio" label = "shadowed" value={apartment_facing} onChange={set_apartment_facing} name="group-16"/>
            <Form.Check type="radio" label = "fully_shadowed" value={apartment_facing} onChange={set_apartment_facing} name="group-16"/>
            </Form.Control>

            <Form.Label>Balcony Access</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Balcony Access" onChange={(e) => set_balcony_access(e.target.value)}>
            <Form.Check type="radio" label="yes" value={balcony_access} onChange={set_balcony_access} name="group-17"/>
            <Form.Check type="radio" label="no" value={balcony_access} onChange={set_balcony_access} name="group-17"/>
            </Form.Control>

            <Form.Label>Pets Allowed</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Pets Allowed" onChange={(e) => set_pets_allowed(e.target.value)}>
            <Form.Check type="radio" label = "allowed" value={pets_allowed} onChange={set_pets_allowed} name="group-18"/>
            <Form.Check type="radio" label = "not allowed" value={pets_allowed} onChange={set_pets_allowed} name="group-18"/>
            </Form.Control>

            <Form.Label>Landlord Tenant Ages</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Landlord Tenant Ages" onChange={(e) => set_landlord_tenant_ages(e.target.value)}>
            <Form.Check type="radio" label = "all ages" value={landlord_tenant_ages} onChange={set_landlord_tenant_ages} name="group-19"/>
            <Form.Check type="radio" label = "16-25" value={landlord_tenant_ages} onChange={set_landlord_tenant_ages} name="group-19"/>
            <Form.Check type="radio" label = "16-60" value={landlord_tenant_ages} onChange={set_landlord_tenant_ages} name="group-19"/>
            <Form.Check type="radio" label = "18-60" value={landlord_tenant_ages} onChange={set_landlord_tenant_ages} name="group-19"/>
            <Form.Check type="radio" label = "25-99" value={landlord_tenant_ages} onChange={set_landlord_tenant_ages} name="group-19"/>
            </Form.Control>

            <Form.Label>Near Public Transportation</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Near Public Transportation" onChange={(e) => set_near_public_transportation(e.target.value)}>
            <Form.Check type="radio" label="yes" value={near_public_transportation} onChange={set_near_public_transportation} name="group-20"/>
            <Form.Check type="radio" label="no" value={near_public_transportation} onChange={set_near_public_transportation} name="group-20"/>
            </Form.Control>

            <Form.Label>Parking Availability</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Parking Availability" onChange={(e) => set_parking_availability(e.target.value)}>
            <Form.Check type="radio" label="yes" value={parking_availability} onChange={set_parking_availability} name="group-21"/>
            <Form.Check type="radio" label="no" value={parking_availability} onChange={set_parking_availability} name="group-21"/>
            </Form.Control>

            <Form.Label>Garden Or Terrace</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Garden Or Terrace" onChange={(e) => set_garden_or_terrace(e.target.value)}>
            <Form.Check type="radio" label="yes" value={garden_or_terrace} onChange={set_garden_or_terrace} name="group-22"/>
            <Form.Check type="radio" label="no" value={garden_or_terrace} onChange={set_garden_or_terrace} name="group-22"/>
            </Form.Control>

            <Form.Label>Distance From Schools</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Schools" onChange={(e) => set_distance_from_schools(e.target.value)}>
            <Form.Check type="radio" label="yes" value={distance_from_schools} onChange={set_distance_from_schools} name="group-23"/>
            <Form.Check type="radio" label="no" value={distance_from_schools} onChange={set_distance_from_schools} name="group-23"/>
            </Form.Control>

            <Form.Label>Distance From Hospitals</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Hospitals" onChange={(e) => set_distance_from_hospitals(e.target.value)}>
            <Form.Check type="radio" label="yes" value={distance_from_hospitals} onChange={set_distance_from_hospitals} name="group-24"/>
            <Form.Check type="radio" label="no" value={distance_from_hospitals} onChange={set_distance_from_hospitals} name="group-24"/>
            </Form.Control>

            <Form.Label>Security</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Security" onChange={(e) => set_security(e.target.value)}>
            <Form.Check type="radio" label="yes" value={security} onChange={set_security} name="group-25"/>
            <Form.Check type="radio" label="no" value={security} onChange={set_security} name="group-25"/>
            </Form.Control>

            <Form.Label>Management Fee</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Management Fee" onChange={(e) => set_management_fee(e.target.value)}>
            <Form.Check type="radio" label="yes" value={management_fee} onChange={set_management_fee} name="group-26"/>
            <Form.Check type="radio" label="no" value={management_fee} onChange={set_management_fee} name="group-26"/>
            </Form.Control>

            <Form.Label>Quality Of Construction</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Quality Of Construction" onChange={(e) => set_quality_of_construction(e.target.value)}>
            <Form.Check type="radio" label="high" value={quality_of_construction} onChange={set_quality_of_construction} name="group-27"/>
            <Form.Check type="radio" label="mid" value={quality_of_construction} onChange={set_quality_of_construction} name="group-27"/>
            <Form.Check type="radio" label="low" value={quality_of_construction} onChange={set_quality_of_construction} name="group-27"/>
            </Form.Control>

            <Form.Label>Renovation Date</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Renovation Date" onChange={(e) => set_renovation_date(e.target.value)}>
            <Form.Check type="radio" label="<=5" value={renovation_date} onChange={set_renovation_date} name="group-28"/>
            <Form.Check type="radio" label="<=8" value={renovation_date} onChange={set_renovation_date} name="group-28"/>
            <Form.Check type="radio" label=">8" value={renovation_date} onChange={set_renovation_date} name="group-28"/>
            </Form.Control>

            <Form.Label>Flood Risk</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Flood Risk" onChange={(e) => set_flood_risk(e.target.value)}>
            <Form.Check type="radio" label="high" value={flood_risk} onChange={set_flood_risk} name="group-29"/>
            <Form.Check type="radio" label="mid" value={flood_risk} onChange={set_flood_risk} name="group-29"/>
            <Form.Check type="radio" label="low" value={flood_risk} onChange={set_flood_risk} name="group-29"/>
            </Form.Control>

            <Form.Label>Earthquake Risk</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Earthquake Risk" onChange={(e) => set_earthquake_risk(e.target.value)}>
            <Form.Check type="radio" label="high" value={earthquake_risk} onChange={set_earthquake_risk} name="group-30"/>
            <Form.Check type="radio" label="mid" value={earthquake_risk} onChange={set_earthquake_risk} name="group-30"/>
            <Form.Check type="radio" label="low" value={earthquake_risk} onChange={set_earthquake_risk} name="group-30"/>
            </Form.Control>

            <Form.Label>Distance From Shops</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Shops" onChange={(e) => set_distance_from_shops(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_shops} onChange={set_distance_from_shops} name="group-31"/>
            <Form.Check type="radio" label="<5km" value={distance_from_shops} onChange={set_distance_from_shops} name="group-31"/>
            <Form.Check type="radio" label=">5km" value={distance_from_shops} onChange={set_distance_from_shops} name="group-31"/>
            </Form.Control>

            <Form.Label>Distance From Gym</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Gym" onChange={(e) => set_distance_from_gym(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_gym} onChange={set_distance_from_gym} name="group-32"/>
            <Form.Check type="radio" label="<5km" value={distance_from_gym} onChange={set_distance_from_gym} name="group-32"/>
            <Form.Check type="radio" label=">5km" value={distance_from_gym} onChange={set_distance_from_gym} name="group-32"/>
            </Form.Control>

            <Form.Label>Soundproof</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Soundproof" onChange={(e) => set_soundproof(e.target.value)}>
            <Form.Check type="radio" label="yes" value={soundproof} onChange={set_soundproof} name="group-33"/>
            <Form.Check type="radio" label="no" value={soundproof} onChange={set_soundproof} name="group-33"/>
            </Form.Control>

            <Form.Label>Storage</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Storage" onChange={(e) => set_storage(e.target.value)}>
            <Form.Check type="radio" label="yes" value={storage} onChange={set_storage} name="group-34"/>
            <Form.Check type="radio" label="no" value={storage} onChange={set_storage} name="group-34"/>
            </Form.Control>

            <Form.Label>Built In Appliances</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Built In Appliances" onChange={(e) => set_built_in_appliances(e.target.value)}>
            <Form.Check type="radio" label="yes" value={built_in_appliances} onChange={set_built_in_appliances} name="group-35"/>
            <Form.Check type="radio" label="no" value={built_in_appliances} onChange={set_built_in_appliances} name="group-35"/>
            </Form.Control>

            <Form.Label>Elevator</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Elevator" onChange={(e) => set_elevator(e.target.value)}>
            <Form.Check type="radio" label="yes" value={elevator} onChange={set_elevator} name="group-36"/>
            <Form.Check type="radio" label="no" value={elevator} onChange={set_elevator} name="group-36"/>
            </Form.Control>

            <Form.Label>Pool</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Pool" onChange={(e) => set_pool(e.target.value)}>
            <Form.Check type="radio" label="yes" value={pool} onChange={set_pool} name="group-37"/>
            <Form.Check type="radio" label="no" value={pool} onChange={set_pool} name="group-37"/>
            </Form.Control>

            <Form.Label>Sauna</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Sauna" onChange={(e) => set_sauna(e.target.value)}>
            <Form.Check type="radio" label="yes" value={sauna} onChange={set_sauna} name="group-38"/>
            <Form.Check type="radio" label="no" value={sauna} onChange={set_sauna} name="group-38"/>
            </Form.Control>

            <Form.Label>Jacuzzi</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Jacuzzi" onChange={(e) => set_jacuzzi(e.target.value)}>
            <Form.Check type="radio" label="yes" value={jacuzzi} onChange={set_jacuzzi} name="group-39"/>
            <Form.Check type="radio" label="no" value={jacuzzi} onChange={set_jacuzzi} name="group-39"/>
            </Form.Control>

            <Form.Label>Spa</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Spa" onChange={(e) => set_spa(e.target.value)}>
            <Form.Check type="radio" label="yes" value={spa} onChange={set_spa} name="group-40"/>
            <Form.Check type="radio" label="no" value={spa} onChange={set_spa} name="group-40"/>
            </Form.Control>

            <Form.Label>Community Facilities</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Community Facilities" onChange={(e) => set_community_facilities(e.target.value)}>
            <Form.Check type="radio" label="yes" value={community_facilities} onChange={set_community_facilities} name="group-41"/>
            <Form.Check type="radio" label="no" value={community_facilities} onChange={set_community_facilities} name="group-41"/>
            </Form.Control>

            <Form.Label>Distance From Touristic Area</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Touristic Area" onChange={(e) => set_distance_from_touristic_area(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_touristic_area} onChange={set_distance_from_touristic_area} name="group-42"/>
            <Form.Check type="radio" label="<5km" value={distance_from_touristic_area} onChange={set_distance_from_touristic_area} name="group-42"/>
            <Form.Check type="radio" label=">5km" value={distance_from_touristic_area} onChange={set_distance_from_touristic_area} name="group-42"/>
            </Form.Control>

            <Form.Label>Parking Space</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Parking Space" onChange={(e) => set_parking_space(e.target.value)}>
            <Form.Check type="radio" label="yes" value={parking_space} onChange={set_parking_space} name="group-43"/>
            <Form.Check type="radio" label="no" value={parking_space} onChange={set_parking_space} name="group-43"/>
            </Form.Control>

            <Form.Label>Distance From Public Transportation</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Public Transportation" onChange={(e) => set_distance_from_public_transportation(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_public_transportation} onChange={set_distance_from_public_transportation} name="group-44"/>
            <Form.Check type="radio" label="<5km" value={distance_from_public_transportation} onChange={set_distance_from_public_transportation} name="group-44"/>
            <Form.Check type="radio" label=">5km" value={distance_from_public_transportation} onChange={set_distance_from_public_transportation} name="group-44"/>
            </Form.Control>

            <Form.Label>Distance From Highway</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Highway" onChange={(e) => set_distance_from_highway(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_highway} onChange={set_distance_from_highway} name="group-45"/>
            <Form.Check type="radio" label="<5km" value={distance_from_highway} onChange={set_distance_from_highway} name="group-45"/>
            <Form.Check type="radio" label=">5km" value={distance_from_highway} onChange={set_distance_from_highway} name="group-45"/>
            
            </Form.Control>

            <Form.Label>Distance From Airport</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Airport" onChange={(e) => set_distance_from_airport(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_airport} onChange={set_distance_from_airport} name="group-46"/>
            <Form.Check type="radio" label="<5km" value={distance_from_airport} onChange={set_distance_from_airport} name="group-46"/>
            <Form.Check type="radio" label=">5km" value={distance_from_airport} onChange={set_distance_from_airport} name="group-46"/>
            </Form.Control>

            <Form.Label>Distance From Train Station</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Train Station" onChange={(e) => set_distance_from_train_station(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_train_station} onChange={set_distance_from_train_station} name="group-47"/>
            <Form.Check type="radio" label="<5km" value={distance_from_train_station} onChange={set_distance_from_train_station} name="group-47"/>
            <Form.Check type="radio" label=">5km" value={distance_from_train_station} onChange={set_distance_from_train_station} name="group-47"/>
            </Form.Control>

            <Form.Label>Distance From Bus Station</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Bus Station" onChange={(e) => set_distance_from_bus_station(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_bus_station} onChange={set_distance_from_bus_station} name="group-48"/>
            <Form.Check type="radio" label="<5km" value={distance_from_bus_station} onChange={set_distance_from_bus_station} name="group-48"/>
            <Form.Check type="radio" label=">5km" value={distance_from_bus_station} onChange={set_distance_from_bus_station} name="group-48"/>
            </Form.Control>

            <Form.Label>Distance From Ferry Terminal</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Ferry Terminal" onChange={(e) => set_distance_from_ferry_terminal(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_ferry_terminal} onChange={set_distance_from_ferry_terminal} name="group-49"/>
            <Form.Check type="radio" label="<5km" value={distance_from_ferry_terminal} onChange={set_distance_from_ferry_terminal} name="group-49"/>
            <Form.Check type="radio" label=">5km" value={distance_from_ferry_terminal} onChange={set_distance_from_ferry_terminal} name="group-49"/>
            </Form.Control>

            <Form.Label>Distance From Taxi Stand</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Taxi Stand" onChange={(e) => set_distance_from_taxi_stand(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_taxi_stand} onChange={set_distance_from_taxi_stand} name="group-50"/>
            <Form.Check type="radio" label="<5km" value={distance_from_taxi_stand} onChange={set_distance_from_taxi_stand} name="group-50"/>
            <Form.Check type="radio" label=">5km" value={distance_from_taxi_stand} onChange={set_distance_from_taxi_stand} name="group-50"/>
            </Form.Control>

            <Form.Label>Distance From Bike Rental</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Bike Rental" onChange={(e) => set_distance_from_bike_rental(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_bike_rental} onChange={set_distance_from_bike_rental} name="group-51"/>
            <Form.Check type="radio" label="<5km" value={distance_from_bike_rental} onChange={set_distance_from_bike_rental} name="group-51"/>
            <Form.Check type="radio" label=">5km" value={distance_from_bike_rental} onChange={set_distance_from_bike_rental} name="group-51"/>
            </Form.Control>

            <Form.Label>Distance From Car Rental</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Car Rental" onChange={(e) => set_distance_from_car_rental(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_car_rental} onChange={set_distance_from_car_rental} name="group-52"/>
            <Form.Check type="radio" label="<5km" value={distance_from_car_rental} onChange={set_distance_from_car_rental} name="group-52"/>
            <Form.Check type="radio" label=">5km" value={distance_from_car_rental} onChange={set_distance_from_car_rental} name="group-52"/>
            </Form.Control>

            <Form.Label>Lawn</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Lawn" onChange={(e) => set_lawn(e.target.value)}>
            <Form.Check type="radio" label="yes" value={lawn} onChange={set_lawn} name="group-53"/>
            <Form.Check type="radio" label="no" value={lawn} onChange={set_lawn} name="group-53"/>
            </Form.Control>

            <Form.Label>Landscaping</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Landscaping" onChange={(e) => set_landscaping(e.target.value)}>
            <Form.Check type="radio" label="yes" value={landscaping} onChange={set_landscaping} name="group-54"/>
            <Form.Check type="radio" label="no" value={landscaping} onChange={set_landscaping} name="group-54"/>
            </Form.Control>

            <Form.Label>Garden</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Garden" onChange={(e) => set_garden(e.target.value)}>
            <Form.Check type="radio" label="yes" value={garden} onChange={set_garden} name="group-55"/>
            <Form.Check type="radio" label="no" value={garden} onChange={set_garden} name="group-55"/>
            </Form.Control>

            <Form.Label>Distance From Park</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Park" onChange={(e) => set_distance_from_park(e.target.value)}>
            <Form.Check type="radio" label="yes" value={distance_from_park} onChange={set_distance_from_park} name="group-56"/>
            <Form.Check type="radio" label="no" value={distance_from_park} onChange={set_distance_from_park} name="group-56"/>
            </Form.Control>

            <Form.Label>Distance From Recreation Area</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Recreation Area" onChange={(e) => set_distance_from_recreation_area(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_recreation_area} onChange={set_distance_from_recreation_area} name="group-57"/>
            <Form.Check type="radio" label="<5km" value={distance_from_recreation_area} onChange={set_distance_from_recreation_area} name="group-57"/>
            <Form.Check type="radio" label=">5km" value={distance_from_recreation_area} onChange={set_distance_from_recreation_area} name="group-57"/>
            </Form.Control>

            <Form.Label>Distance From Zoo</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Zoo" onChange={(e) => set_distance_from_zoo(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_zoo} onChange={set_distance_from_zoo} name="group-58"/>
            <Form.Check type="radio" label="<5km" value={distance_from_zoo} onChange={set_distance_from_zoo} name="group-58"/>
            <Form.Check type="radio" label=">5km" value={distance_from_zoo} onChange={set_distance_from_zoo} name="group-58"/>
            </Form.Control>

            <Form.Label>View</Form.Label>
            <Form.Control as="radio" placeholder="Enter the View" onChange={(e) => set_view(e.target.value)}>
            <Form.Check type="radio" label="good" value={view} onChange={set_view} name="group-59"/>
            <Form.Check type="radio" label="bad" value={view} onChange={set_view} name="group-59"/>
            </Form.Control>

            <Form.Label>Security Features</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Security Features" onChange={(e) => set_security_features(e.target.value)}>
            <Form.Check type="radio" label="yes" value={security_features} onChange={set_security_features} name="group-60"/>
            <Form.Check type="radio" label="no" value={security_features} onChange={set_security_features} name="group-60"/>
            </Form.Control>

            <Form.Label>Distance From School</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From School" onChange={(e) => set_distance_from_school(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_school} onChange={set_distance_from_school} name="group-61"/>
            <Form.Check type="radio" label="<5km" value={distance_from_school} onChange={set_distance_from_school} name="group-61"/>
            <Form.Check type="radio" label=">5km" value={distance_from_school} onChange={set_distance_from_school} name="group-61"/>
            </Form.Control>

            <Form.Label>Distance From Shopping Center</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Shopping Center" onChange={(e) => set_distance_from_shopping_center(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_shopping_center} onChange={set_distance_from_shopping_center} name="group-62"/>
            <Form.Check type="radio" label="<5km" value={distance_from_shopping_center} onChange={set_distance_from_shopping_center} name="group-62"/>
            <Form.Check type="radio" label=">5km" value={distance_from_shopping_center} onChange={set_distance_from_shopping_center} name="group-62"/>
            </Form.Control>

            <Form.Label>Distance From Library</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Library" onChange={(e) => set_distance_from_library(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_library} onChange={set_distance_from_library} name="group-63"/>
            <Form.Check type="radio" label="<5km" value={distance_from_library} onChange={set_distance_from_library} name="group-63"/>
            <Form.Check type="radio" label=">5km" value={distance_from_library} onChange={set_distance_from_library} name="group-63"/>
            </Form.Control>

            <Form.Label>Distance From Hospital</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Hospital" onChange={(e) => set_distance_from_hospital(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_hospital} onChange={set_distance_from_hospital} name="group-64"/>
            <Form.Check type="radio" label="<5km" value={distance_from_hospital} onChange={set_distance_from_hospital} name="group-64"/>
            <Form.Check type="radio" label=">5km" value={distance_from_hospital} onChange={set_distance_from_hospital} name="group-64"/>
            </Form.Control>

            <Form.Label>Distance From Pharmacy</Form.Label>
            <Form.Control as="radio" placeholder="Enter the Distance From Pharmacy" onChange={(e) => set_distance_from_pharmacy(e.target.value)}>
            <Form.Check type="radio" label="<2km" value={distance_from_pharmacy} onChange={set_distance_from_pharmacy} name="group-65"/>
            <Form.Check type="radio" label="<5km" value={distance_from_pharmacy} onChange={set_distance_from_pharmacy} name="group-65"/>
            <Form.Check type="radio" label=">5km" value={distance_from_pharmacy} onChange={set_distance_from_pharmacy} name="group-65"/>
            </Form.Control>


            </Form>
        </Container>
    )
}


export default MainForm;