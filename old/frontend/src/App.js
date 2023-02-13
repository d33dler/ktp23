import MainForm from "./components/MainForm";
import "./App.css";
import React, { useState } from 'react';
import { Button, ButtonGroup, Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  const [area_sqm, set_area_sqm] = useState('');
  const [property_location, set_property_location] = useState('');
  const [distance_to_city, set_distance_to_city] = useState('');
  const [population, set_population] = useState('');
  const [property_type, set_property_type] = useState('');
  const [furnished, set_furnished] = useState('');
  const [shower, set_shower] = useState('');
  const [toilet, set_toilet] = useState('');
  const [living_room, set_living_room] = useState('');
  const [living_capacity, set_living_capacity] = useState('');
  const [internet, set_internet] = useState('');
  const [energy_label, set_energy_label] = useState('');
  const [roommates, set_roommates] = useState('');
  const [problematic_neighbors, set_problematic_neighbors] = useState('');
  const [air_quality, set_air_quality] = useState('');
  const [nearby_disturbances, set_nearby_disturbances] = useState('');
  const [apartment_facing, set_apartment_facing] = useState('');
  const [balcony_access, set_balcony_access] = useState('');
  const [pets_allowed, set_pets_allowed] = useState('');
  const [landlord_tenant_ages, set_landlord_tenant_ages] = useState('');
  const [near_public_transportation, set_near_public_transportation] = useState('');
  const [parking_availability, set_parking_availability] = useState('');
  const [garden_or_terrace, set_garden_or_terrace] = useState('');
  const [distance_from_schools, set_distance_from_schools] = useState('');
  const [security, set_security] = useState('');
  const [management_fee, set_management_fee] = useState('');
  const [quality_of_construction, set_quality_of_construction] = useState('');
  const [renovation_date, set_renovation_date] = useState('');
  const [flood_risk, set_flood_risk] = useState('');
  const [earthquake_risk, set_earthquake_risk] = useState('');
  const [distance_from_shops, set_distance_from_shops] = useState('');
  const [distance_from_gym, set_distance_from_gym] = useState('');
  const [sound_proof, set_sound_proof] = useState('');
  const [storage_room, set_storage_room] = useState('');
  const [built_appliances, set_built_appliances] = useState('');
  const [elevator, set_elevator] = useState('');
  const [pool, set_pool] = useState('');
  const [sauna, set_sauna] = useState('');
  const [jacuzzi, set_jacuzzi] = useState('');
  const [spa, set_spa] = useState('');
  const [community_facilities, set_community_facilities] = useState('');
  const [distance_from_touristic_area, set_distance_from_touristic_area] = useState('');
  const [parking_space, set_parking_space] = useState('');
  const [distance_from_public_transportation, set_distance_from_public_transportation] = useState('');
  const [distance_from_highway, set_distance_from_highway] = useState('');
  const [distance_from_airport, set_distance_from_airport] = useState('');
  const [distance_from_train_station, set_distance_from_train_station] = useState('');
  const [distance_from_bus_station, set_distance_from_bus_station] = useState('');
  const [distance_from_ferry, set_distance_from_ferry] = useState('');
  const [distance_from_taxi_stand, set_distance_from_taxi_stand] = useState('');
  const [distance_from_bike_rental, set_distance_from_bike_rental] = useState('');
  const [distance_from_car_rental, set_distance_from_car_rental] = useState('');
  const [lawn, set_lawn] = useState('');
  const [landscaping, set_landscaping] = useState('');
  const [garden, set_garden] = useState('');
  const [distance_from_park, set_distance_from_park] = useState('');
  const [distance_from_recreation_area, set_distance_from_recreation_area] = useState('');
  const [distance_from_zoo, set_distance_from_zoo] = useState('');
  const [view, set_view] = useState('');
  const [security_features, set_security_features] = useState('');
  const [distance_from_shopping_center, set_distance_from_shopping_center] = useState('');
  const [distance_from_library, set_distance_from_library] = useState('');
  const [distance_from_hospital, set_distance_from_hospital] = useState('');
  const [distance_from_pharmacy, set_distance_from_pharmacy] = useState('');
  
  const [predicted_price, set_predicted_price] = useState(null);

  const [step, setStep] = useState(2);

  const props = {
    area_sqm, property_location, distance_to_city, population, property_type, furnished, shower, toilet, living_room, living_capacity,
    internet, energy_label, roommates, problematic_neighbors, air_quality, nearby_disturbances, apartment_facing, balcony_access, pets_allowed,
    landlord_tenant_ages, near_public_transportation, parking_availability, garden_or_terrace, distance_from_schools, security, management_fee, quality_of_construction, renovation_date,
    flood_risk, earthquake_risk, distance_from_shops, distance_from_gym, sound_proof, storage_room, built_appliances, elevator, pool, sauna,
    jacuzzi, spa, community_facilities, distance_from_touristic_area, parking_space, distance_from_public_transportation, distance_from_highway, distance_from_airport,
    distance_from_train_station, distance_from_bus_station, distance_from_ferry, distance_from_taxi_stand, distance_from_bike_rental, distance_from_car_rental, lawn,
    landscaping, garden, distance_from_park, distance_from_recreation_area, distance_from_zoo, view, security_features,
    distance_from_shopping_center, distance_from_library, distance_from_hospital, distance_from_pharmacy, 
    set_area_sqm, set_property_location, set_distance_to_city, set_population, set_property_type, set_furnished, set_shower, set_toilet, set_living_room, set_living_capacity,
    set_internet, set_energy_label, set_roommates, set_problematic_neighbors, set_air_quality, set_nearby_disturbances, set_apartment_facing, set_balcony_access, set_pets_allowed,
    set_landlord_tenant_ages, set_near_public_transportation, set_parking_availability, set_garden_or_terrace, set_distance_from_schools, set_security, set_management_fee, set_quality_of_construction, set_renovation_date,
    set_flood_risk, set_earthquake_risk, set_distance_from_shops, set_distance_from_gym, set_sound_proof, set_storage_room, set_built_appliances, set_elevator, set_pool, set_sauna,
    set_jacuzzi, set_spa, set_community_facilities, set_distance_from_touristic_area, set_parking_space, set_distance_from_public_transportation, set_distance_from_highway, set_distance_from_airport,
    set_distance_from_train_station, set_distance_from_bus_station, set_distance_from_ferry, set_distance_from_taxi_stand, set_distance_from_bike_rental, set_distance_from_car_rental, set_lawn,
    set_landscaping, set_garden, set_distance_from_park, set_distance_from_recreation_area, set_distance_from_zoo, set_view, set_security_features,
    set_distance_from_shopping_center, set_distance_from_library, set_distance_from_hospital, set_distance_from_pharmacy,
    predicted_price, set_predicted_price,
    step, setStep
  }


  return (
    <div className="App">
      <h1 style={{display: 'flex', justifyContent: 'center'}}>Rental Price Predictor</h1>
      <Container>
      <Row>
      <Col>
        <MainForm props={props}/>
      </Col>
        <ButtonGroup>
          <Button disabled={step === 2} onClick={() => setStep((step_) => step_ - 1)}>Previous</Button>
          <Button disabled={step === 67} onClick={() => setStep((step_) => step_ + 1)}>Next</Button>
        </ButtonGroup>
      </Row>
      </Container>
    </div>
  );
}

export default App;
