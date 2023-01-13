import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


function MainForm() {
    
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            area_sqm,
            property_location,
            distance_to_city,
            population,
            property_type,
            furnished,
            shower,
            toilet,
            living_room,
            living_capacity,
            internet,
            energy_label,
            roommates,
            problematic_neighbors,
            air_quality,
            nearby_disturbances,
            apartment_facing,
            balcony_access,
            pets_allowed,
            landlord_tenant_ages,
            near_public_transportation,
            parking_availability,
            garden_or_terrace,
            distance_from_schools,
            security,
            management_fee,
            quality_of_construction,
            renovation_date,
            flood_risk,
            earthquake_risk,
            distance_from_shops,
            distance_from_gym,
            sound_proof,
            storage_room,
            built_appliances,
            elevator,
            pool,
            sauna,
            jacuzzi,
            spa,
            community_facilities,
            distance_from_touristic_area,
            parking_space,
            distance_from_public_transportation,
            distance_from_highway,
            distance_from_airport,
            distance_from_train_station,
            distance_from_bus_station,
            distance_from_ferry,
            distance_from_taxi_stand,
            distance_from_bike_rental,
            distance_from_car_rental,
            lawn,
            landscaping,
            garden,
            distance_from_park,
            distance_from_recreation_area,
            distance_from_zoo,
            view,
            security_features,
            distance_from_shopping_center,
            distance_from_library,
            distance_from_hospital,
            distance_from_pharmacy,
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000', data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    };



    const [step, setStep] = useState(0);

    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [showSubmit, setShowSubmit] = useState(true);

    const nextStep = () => {
        if (step === forms.length - 1) {
            setNextDisabled(true);
        } else {
            if (step + 1 === forms.length - 1) {
                setNextDisabled(true);
                setShowSubmit(true);
            }
            setStep(step + 1);
            setPrevDisabled(false);
        }
    }

    const prevStep = () => {
        // make sure the step is not less than 0
        if (step === 0) {
            setPrevDisabled(true);
        } else {
            if (step - 1 === 0) {
                setPrevDisabled(true);
            }
            setStep((prev) => prev - 1);
            setNextDisabled(false);

        }
    }

    /**
     * convert all the previous states into a form data object
     * 
     */
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                {/* include all the states above */}
            <>
            <Form.Label as='h3'>Area Sqm</Form.Label>
            <Form.Control as="radio" value={area_sqm} placeholder="Enter the Area Sqm" onChange={(e) => set_area_sqm(e.target.value)}>
            <Form.Check type="radio" label="≤ 1" value="1" name="group-0"/>
            <Form.Check type="radio" label="≤ 10" value="10" name="group-0"/>
            <Form.Check type="radio" label="≤ 20" value="20" name="group-0"/>
            <Form.Check type="radio" label="≤ 30" value="30" name="group-0"/>
            <Form.Check type="radio" label="≤ 40" value="40" name="group-0"/>
            <Form.Check type="radio" label="≤ 50" value="50" name="group-0"/>
            <Form.Check type="radio" label="> 50" value="60" name="group-0"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Property Location</Form.Label>
            <Form.Control as="radio" value={property_location} placeholder="Enter the Property Location" onChange={(e) => set_property_location(e.target.value)}>
            <Form.Check type="radio" label="Amsterdam" value="Amsterdam" name="group-1"/>
            <Form.Check type="radio" label="Groningen" value="Groningen" name="group-1"/>
            <Form.Check type="radio" label="Rotterdam" value="Rotterdam" name="group-1"/>
            <Form.Check type="radio" label="Other" value="Other" name="group-1"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance To City</Form.Label>
            <Form.Control as="radio" value={distance_to_city} placeholder="Enter the Distance To City" onChange={(e) => set_distance_to_city(e.target.value)}>
            <Form.Check type="radio" label="≤ 2" value="2" name="group-2"/>
            <Form.Check type="radio" label="≤ 5" value="5" name="group-2"/>
            <Form.Check type="radio" label="≤ 6" value="6" name="group-2"/>
            <Form.Check type="radio" label="> 6" value="7" name="group-2"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Population</Form.Label>
            <Form.Control as="radio" value={population} placeholder="Enter the Population" onChange={(e) => set_population(e.target.value)}>
            <Form.Check type="radio" label="1e6" value="1E6" name="group-3"/>
            <Form.Check type="radio" label="1e6" value="1E6" name="group-3"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Property Type</Form.Label>
            <Form.Control as="radio" value={property_type} placeholder="Enter the Property Type" onChange={(e) => set_property_type(e.target.value)}>
            <Form.Check type="radio" label="Room" value="room" name="group-4"/>
            <Form.Check type="radio" label="Apartment" value="apartment" name="group-4"/>
            <Form.Check type="radio" label="Anti Squat" value="anti-squat" name="group-4"/>
            <Form.Check type="radio" label="Studio" value="studio" name="group-4"/>
            <Form.Check type="radio" label="Student Residence" value="student-residence" name="group-4"/>
            <Form.Check type="radio" label="House" value="house" name="group-4"/>
            <Form.Check type="radio" label="Other" value="other" name="group-4"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Furnished</Form.Label>
            <Form.Control as="radio" value={furnished} placeholder="Enter the Furnished" onChange={(e) => set_furnished(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-5"/>
            <Form.Check type="radio" label="No" value="no" name="group-5"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Shower</Form.Label>
            <Form.Control as="radio" value={shower} placeholder="Enter the Shower" onChange={(e) => set_shower(e.target.value)}>
            <Form.Check type="radio" label="Private" value="private" name="group-6"/>
            <Form.Check type="radio" label="Shared" value="shared" name="group-6"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Toilet</Form.Label>
            <Form.Control as="radio" value={toilet} placeholder="Enter the Toilet" onChange={(e) => set_toilet(e.target.value)}>
            <Form.Check type="radio" label="Private" value="private" name="group-7"/>
            <Form.Check type="radio" label="Shared" value="shared" name="group-7"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Living Room</Form.Label>
            <Form.Control as="radio" value={living_room} placeholder="Enter the Living Room" onChange={(e) => set_living_room(e.target.value)}>
            <Form.Check type="radio" label="Private" value="private" name="group-8"/>
            <Form.Check type="radio" label="Shared" value="shared" name="group-8"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Living Capacity</Form.Label>
            <Form.Control as="radio" value={living_capacity} placeholder="Enter the Living Capacity" onChange={(e) => set_living_capacity(e.target.value)}>
            <Form.Check type="radio" label="1" value="1" name="group-9"/>
            <Form.Check type="radio" label="2" value="2" name="group-9"/>
            <Form.Check type="radio" label="3" value="3" name="group-9"/>
            <Form.Check type="radio" label="4" value="4" name="group-9"/>
            <Form.Check type="radio" label="5" value="5" name="group-9"/>
            <Form.Check type="radio" label="> 5" value="6" name="group-9"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Internet</Form.Label>
            <Form.Control as="radio" value={internet} placeholder="Enter the Internet" onChange={(e) => set_internet(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-10"/>
            <Form.Check type="radio" label="No" value="no" name="group-10"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Energy Label</Form.Label>
            <Form.Control as="radio" value={energy_label} placeholder="Enter the Energy Label" onChange={(e) => set_energy_label(e.target.value)}>
            <Form.Check type="radio" label="A" value="A" name="group-11"/>
            <Form.Check type="radio" label="B" value="B" name="group-11"/>
            <Form.Check type="radio" label="C" value="C" name="group-11"/>
            <Form.Check type="radio" label="D" value="D" name="group-11"/>
            <Form.Check type="radio" label="E" value="E" name="group-11"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Roommates</Form.Label>
            <Form.Control as="radio" value={roommates} placeholder="Enter the Roommates" onChange={(e) => set_roommates(e.target.value)}>
            <Form.Check type="radio" label="1" value="1" name="group-12"/>
            <Form.Check type="radio" label="2" value="2" name="group-12"/>
            <Form.Check type="radio" label="3" value="3" name="group-12"/>
            <Form.Check type="radio" label="4" value="4" name="group-12"/>
            <Form.Check type="radio" label="5" value="5" name="group-12"/>
            <Form.Check type="radio" label="> 5" value="6" name="group-12"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Problematic Neighbors</Form.Label>
            <Form.Control as="radio" value={problematic_neighbors} placeholder="Enter the Problematic Neighbors" onChange={(e) => set_problematic_neighbors(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-13"/>
            <Form.Check type="radio" label="No" value="no" name="group-13"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Air Quality</Form.Label>
            <Form.Control as="radio" value={air_quality} placeholder="Enter the Air Quality" onChange={(e) => set_air_quality(e.target.value)}>
            <Form.Check type="radio" label="Good" value="good" name="group-14"/>
            <Form.Check type="radio" label="Average" value="average" name="group-14"/>
            <Form.Check type="radio" label="Bad" value="bad" name="group-14"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Nearby Disturbances</Form.Label>
            <Form.Control as="radio" value={nearby_disturbances} placeholder="Enter the Nearby Disturbances" onChange={(e) => set_nearby_disturbances(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-15"/>
            <Form.Check type="radio" label="No" value="no" name="group-15"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Apartment Facing</Form.Label>
            <Form.Control as="radio" value={apartment_facing} placeholder="Enter the Apartment Facing" onChange={(e) => set_apartment_facing(e.target.value)}>
            <Form.Check type="radio" label="Sunrise" value="sunrise" name="group-16"/>
            <Form.Check type="radio" label="Sunset" value="sunset" name="group-16"/>
            <Form.Check type="radio" label="Partial sun" value="partial_sun" name="group-16"/>
            <Form.Check type="radio" label="Shadowed" value="shadowed" name="group-16"/>
            <Form.Check type="radio" label="Fully shadowed" value="fully_shadowed" name="group-16"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Balcony Access</Form.Label>
            <Form.Control as="radio" value={balcony_access} placeholder="Enter the Balcony Access" onChange={(e) => set_balcony_access(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-17"/>
            <Form.Check type="radio" label="No" value="no" name="group-17"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Pets Allowed</Form.Label>
            <Form.Control as="radio" value={pets_allowed} placeholder="Enter the Pets Allowed" onChange={(e) => set_pets_allowed(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-18"/>
            <Form.Check type="radio" label="No" value="no" name="group-18"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Landlord Tenant Ages</Form.Label>
            <Form.Control as="radio" value={landlord_tenant_ages} placeholder="Enter the Landlord Tenant Ages" onChange={(e) => set_landlord_tenant_ages(e.target.value)}>
            <Form.Check type="radio" label="16-25" value="16-25" name="group-19"/>
            <Form.Check type="radio" label="16-60" value="16-60" name="group-19"/>
            <Form.Check type="radio" label="18-60" value="18-60" name="group-19"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Near Public Transportation</Form.Label>
            <Form.Control as="radio" value={near_public_transportation} placeholder="Enter the Near Public Transportation" onChange={(e) => set_near_public_transportation(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-20"/>
            <Form.Check type="radio" label="No" value="no" name="group-20"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Parking Availability</Form.Label>
            <Form.Control as="radio" value={parking_availability} placeholder="Enter the Parking Availability" onChange={(e) => set_parking_availability(e.target.value)}>
            <Form.Check type="radio" label="Private" value="private" name="group-21"/>
            <Form.Check type="radio" label="Street" value="street" name="group-21"/>
            <Form.Check type="radio" label="None" value="none" name="group-21"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Garden Or Terrace</Form.Label>
            <Form.Control as="radio" value={garden_or_terrace} placeholder="Enter the Garden Or Terrace" onChange={(e) => set_garden_or_terrace(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-22"/>
            <Form.Check type="radio" label="No" value="no" name="group-22"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Schools</Form.Label>
            <Form.Control as="radio" value={distance_from_schools} placeholder="Enter the Distance From Schools" onChange={(e) => set_distance_from_schools(e.target.value)}>
            <Form.Check type="radio" label="≤ 8" value="8" name="group-23"/>
            <Form.Check type="radio" label="> 8" value="9" name="group-23"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Hospital</Form.Label>
            <Form.Control as="radio" value={distance_from_hospital} placeholder="Enter the Distance From Hospital" onChange={(e) => set_distance_from_hospital(e.target.value)}>
            <Form.Check type="radio" label="≤ 8" value="8" name="group-24"/>
            <Form.Check type="radio" label="> 8" value="9" name="group-24"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Security</Form.Label>
            <Form.Control as="radio" value={security} placeholder="Enter the Security" onChange={(e) => set_security(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-25"/>
            <Form.Check type="radio" label="No" value="no" name="group-25"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Management Fee</Form.Label>
            <Form.Control as="radio" value={management_fee} placeholder="Enter the Management Fee" onChange={(e) => set_management_fee(e.target.value)}>
            <Form.Check type="radio" label="0.5" value="0.4" name="group-26"/>
            <Form.Check type="radio" label="1.0" value="1" name="group-26"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Quality Of Construction</Form.Label>
            <Form.Control as="radio" value={quality_of_construction} placeholder="Enter the Quality Of Construction" onChange={(e) => set_quality_of_construction(e.target.value)}>
            <Form.Check type="radio" label="High" value="high" name="group-27"/>
            <Form.Check type="radio" label="Mid" value="mid" name="group-27"/>
            <Form.Check type="radio" label="Low" value="low" name="group-27"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Renovation Date</Form.Label>
            <Form.Control as="radio" value={renovation_date} placeholder="Enter the Renovation Date" onChange={(e) => set_renovation_date(e.target.value)}>
            <Form.Check type="radio" label="< 5 years" value="5" name="group-28"/>
            <Form.Check type="radio" label="< 8 years" value="8" name="group-28"/>
            <Form.Check type="radio" label="> 8 years" value="10" name="group-28"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Flood Risk</Form.Label>
            <Form.Control as="radio" value={flood_risk} placeholder="Enter the Flood Risk" onChange={(e) => set_flood_risk(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-29"/>
            <Form.Check type="radio" label="No" value="no" name="group-29"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Earthquake Risk</Form.Label>
            <Form.Control as="radio" value={earthquake_risk} placeholder="Enter the Earthquake Risk" onChange={(e) => set_earthquake_risk(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-30"/>
            <Form.Check type="radio" label="No" value="no" name="group-30"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Shops</Form.Label>
            <Form.Control as="radio" value={distance_from_shops} placeholder="Enter the Distance From Shops" onChange={(e) => set_distance_from_shops(e.target.value)}>
            <Form.Check type="radio" label="≤ 2" value="2" name="group-31"/>
            <Form.Check type="radio" label="> 2" value="3" name="group-31"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Gym</Form.Label>
            <Form.Control as="radio" value={distance_from_gym} placeholder="Enter the Distance From Gym" onChange={(e) => set_distance_from_gym(e.target.value)}>
            <Form.Check type="radio" label="≤ 5" value="5" name="group-32"/>
            <Form.Check type="radio" label="> 5" value="6" name="group-32"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Sound Proof</Form.Label>
            <Form.Control as="radio" value={sound_proof} placeholder="Enter the Sound Proof" onChange={(e) => set_sound_proof(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-33"/>
            <Form.Check type="radio" label="No" value="no" name="group-33"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Storage</Form.Label>
            <Form.Control as="radio" value={storage_room} placeholder="Enter the Storage" onChange={(e) => set_storage_room(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-34"/>
            <Form.Check type="radio" label="No" value="no" name="group-34"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Built In Appliances</Form.Label>
            <Form.Control as="radio" value={built_appliances} placeholder="Enter the Built In Appliances" onChange={(e) => set_built_appliances(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-35"/>
            <Form.Check type="radio" label="No" value="no" name="group-35"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Elevator</Form.Label>
            <Form.Control as="radio" value={elevator} placeholder="Enter the Elevator" onChange={(e) => set_elevator(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-36"/>
            <Form.Check type="radio" label="No" value="no" name="group-36"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Pool</Form.Label>
            <Form.Control as="radio" value={pool} placeholder="Enter the Pool" onChange={(e) => set_pool(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-37"/>
            <Form.Check type="radio" label="No" value="no" name="group-37"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Sauna</Form.Label>
            <Form.Control as="radio" value={sauna} placeholder="Enter the Sauna" onChange={(e) => set_sauna(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-38"/>
            <Form.Check type="radio" label="No" value="no" name="group-38"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Jacuzzi</Form.Label>
            <Form.Control as="radio" value={jacuzzi} placeholder="Enter the Jacuzzi" onChange={(e) => set_jacuzzi(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-39"/>
            <Form.Check type="radio" label="No" value="no" name="group-39"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Spa</Form.Label>
            <Form.Control as="radio" value={spa} placeholder="Enter the Spa" onChange={(e) => set_spa(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-40"/>
            <Form.Check type="radio" label="No" value="no" name="group-40"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Community Facilities</Form.Label>
            <Form.Control as="radio" value={community_facilities} placeholder="Enter the Community Facilities" onChange={(e) => set_community_facilities(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-41"/>
            <Form.Check type="radio" label="No" value="no" name="group-41"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Touristic Area</Form.Label>
            <Form.Control as="radio" value={distance_from_touristic_area} placeholder="Enter the Distance From Touristic Area" onChange={(e) => set_distance_from_touristic_area(e.target.value)}>
            <Form.Check type="radio" label="≤ 3" value="3" name="group-42"/>
            <Form.Check type="radio" label="> 3" value="4" name="group-42"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Parking Space</Form.Label>
            <Form.Control as="radio" value={parking_space} placeholder="Enter the Parking Space" onChange={(e) => set_parking_space(e.target.value)}>
            <Form.Check type="radio" label="Garage" value="garage" name="group-43"/>
            <Form.Check type="radio" label="Driveway" value="driveway" name="group-43"/>
            <Form.Check type="radio" label="Carport" value="carport" name="group-43"/>
            <Form.Check type="radio" label="None" value="none" name="group-43"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Public Transportation</Form.Label>
            <Form.Control as="radio" value={distance_from_public_transportation} placeholder="Enter the Distance From Public Transportation" onChange={(e) => set_distance_from_public_transportation(e.target.value)}>
            <Form.Check type="radio" label="≤ 1" value="1" name="group-44"/>
            <Form.Check type="radio" label="> 1" value="2" name="group-44"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Highway</Form.Label>
            <Form.Control as="radio" value={distance_from_highway} placeholder="Enter the Distance From Highway" onChange={(e) => set_distance_from_highway(e.target.value)}>
            <Form.Check type="radio" label="≤ 5" value="5" name="group-45"/>
            <Form.Check type="radio" label="> 5" value="6" name="group-45"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Airport</Form.Label>
            <Form.Control as="radio" value={distance_from_airport} placeholder="Enter the Distance From Airport" onChange={(e) => set_distance_from_airport(e.target.value)}>
            <Form.Check type="radio" label="≤ 15" value="15" name="group-46"/>
            <Form.Check type="radio" label="> 15" value="16" name="group-46"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Train Station</Form.Label>
            <Form.Control as="radio" value={distance_from_train_station} placeholder="Enter the Distance From Train Station" onChange={(e) => set_distance_from_train_station(e.target.value)}>
            <Form.Check type="radio" label="≤ 3" value="3" name="group-47"/>
            <Form.Check type="radio" label="> 3" value="4" name="group-47"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Bus Station</Form.Label>
            <Form.Control as="radio" value={distance_from_bus_station} placeholder="Enter the Distance From Bus Station" onChange={(e) => set_distance_from_bus_station(e.target.value)}>
            <Form.Check type="radio" label="≤ 2" value="2" name="group-48"/>
            <Form.Check type="radio" label="> 2" value="3" name="group-48"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Ferry</Form.Label>
            <Form.Control as="radio" value={distance_from_ferry} placeholder="Enter the Distance From Ferry" onChange={(e) => set_distance_from_ferry(e.target.value)}>
            <Form.Check type="radio" label="≤ 10" value="10" name="group-49"/>
            <Form.Check type="radio" label="> 10" value="11" name="group-49"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Taxi Stand</Form.Label>
            <Form.Control as="radio" value={distance_from_taxi_stand} placeholder="Enter the Distance From Taxi Stand" onChange={(e) => set_distance_from_taxi_stand(e.target.value)}>
            <Form.Check type="radio" label="≤ 1" value="1" name="group-50"/>
            <Form.Check type="radio" label="> 1" value="2" name="group-50"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Bike Rental</Form.Label>
            <Form.Control as="radio" value={distance_from_bike_rental} placeholder="Enter the Distance From Bike Rental" onChange={(e) => set_distance_from_bike_rental(e.target.value)}>
            <Form.Check type="radio" label="≤ 1" value="1" name="group-51"/>
            <Form.Check type="radio" label="> 1" value="2" name="group-51"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Car Rental</Form.Label>
            <Form.Control as="radio" value={distance_from_car_rental} placeholder="Enter the Distance From Car Rental" onChange={(e) => set_distance_from_car_rental(e.target.value)}>
            <Form.Check type="radio" label="≤ 3" value="3" name="group-52"/>
            <Form.Check type="radio" label="> 3" value="4" name="group-52"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Lawn</Form.Label>
            <Form.Control as="radio" value={lawn} placeholder="Enter the Lawn" onChange={(e) => set_lawn(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-53"/>
            <Form.Check type="radio" label="No" value="no" name="group-53"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Landscaping</Form.Label>
            <Form.Control as="radio" value={landscaping} placeholder="Enter the Landscaping" onChange={(e) => set_landscaping(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-54"/>
            <Form.Check type="radio" label="No" value="no" name="group-54"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Garden</Form.Label>
            <Form.Control as="radio" value={garden} placeholder="Enter the Garden" onChange={(e) => set_garden(e.target.value)}>
            <Form.Check type="radio" label="Yes" value="yes" name="group-55"/>
            <Form.Check type="radio" label="No" value="no" name="group-55"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Park</Form.Label>
            <Form.Control as="radio" value={distance_from_park} placeholder="Enter the Distance From Park" onChange={(e) => set_distance_from_park(e.target.value)}>
            <Form.Check type="radio" label="≤ 2" value="2" name="group-56"/>
            <Form.Check type="radio" label="> 2" value="3" name="group-56"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Recreation Area</Form.Label>
            <Form.Control as="radio" value={distance_from_recreation_area} placeholder="Enter the Distance From Recreation Area" onChange={(e) => set_distance_from_recreation_area(e.target.value)}>
            <Form.Check type="radio" label="≤ 5" value="5" name="group-57"/>
            <Form.Check type="radio" label="> 5" value="6" name="group-57"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Zoo</Form.Label>
            <Form.Control as="radio" value={distance_from_zoo} placeholder="Enter the Distance From Zoo" onChange={(e) => set_distance_from_zoo(e.target.value)}>
            <Form.Check type="radio" label="≤ 10" value="10" name="group-58"/>
            <Form.Check type="radio" label="> 10" value="11" name="group-58"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>View</Form.Label>
            <Form.Control as="radio" value={view} placeholder="Enter the View" onChange={(e) => set_view(e.target.value)}>
            <Form.Check type="radio" label="City" value="city" name="group-59"/>
            <Form.Check type="radio" label="Water" value="water" name="group-59"/>
            <Form.Check type="radio" label="Park" value="park" name="group-59"/>
            <Form.Check type="radio" label="Nature" value="nature" name="group-59"/>
            <Form.Check type="radio" label="Other" value="other" name="group-59"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Security Features</Form.Label>
            <Form.Control as="radio" value={security_features} placeholder="Enter the Security Features" onChange={(e) => set_security_features(e.target.value)}>
            <Form.Check type="radio" label="Alarm" value="alarm" name="group-60"/>
            <Form.Check type="radio" label="Surveillance" value="surveillance" name="group-60"/>
            <Form.Check type="radio" label="Guard" value="guard" name="group-60"/>
            <Form.Check type="radio" label="None" value="none" name="group-60"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Schools</Form.Label>
            <Form.Control as="radio" value={distance_from_schools} placeholder="Enter the Distance From Schools" onChange={(e) => set_distance_from_schools(e.target.value)}>
            <Form.Check type="radio" label="≤ 3" value="3" name="group-61"/>
            <Form.Check type="radio" label="> 3" value="4" name="group-61"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Shopping Center</Form.Label>
            <Form.Control as="radio" value={distance_from_shopping_center} placeholder="Enter the Distance From Shopping Center" onChange={(e) => set_distance_from_shopping_center(e.target.value)}>
            <Form.Check type="radio" label="≤ 2" value="2" name="group-62"/>
            <Form.Check type="radio" label="> 2" value="3" name="group-62"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Library</Form.Label>
            <Form.Control as="radio" value={distance_from_library} placeholder="Enter the Distance From Library" onChange={(e) => set_distance_from_library(e.target.value)}>
            <Form.Check type="radio" label="≤ 5" value="5" name="group-63"/>
            <Form.Check type="radio" label="> 5" value="6" name="group-63"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Hospital</Form.Label>
            <Form.Control as="radio" value={distance_from_hospital} placeholder="Enter the Distance From Hospital" onChange={(e) => set_distance_from_hospital(e.target.value)}>
            <Form.Check type="radio" label="≤ 8" value="8" name="group-64"/>
            <Form.Check type="radio" label="> 8" value="9" name="group-64"/>
            </Form.Control>
            </>
            <br/>

            <>
            <Form.Label as='h3'>Distance From Pharmacy</Form.Label>
            <Form.Control as="radio" value={distance_from_pharmacy} placeholder="Enter the Distance From Pharmacy" onChange={(e) => set_distance_from_pharmacy(e.target.value)}>
            <Form.Check type="radio" label="≤ 1" value="1" name="group-65"/>
            <Form.Check type="radio" label="> 1" value="2" name="group-65"/>
            </Form.Control>
            </>
            <br/>
            <br/>
            <ButtonGroup style={{display: 'flex', justifyContent: 'center'}}>
                <Button className="mb-3 me-2" size='lg' type="submit" variant="primary" >Submit</Button>
            </ButtonGroup>
            </Form>
        </Container>
    )
}


export default MainForm;

