import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, ButtonGroup, Card, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {ImLocation2} from 'react-icons/im';
import {GiModernCity} from 'react-icons/gi';
import {IoPeopleSharp} from 'react-icons/io5';
import {FaCouch} from 'react-icons/fa';
import {GiShower} from 'react-icons/gi';
import {FaToilet} from 'react-icons/fa';
import {FaWifi} from 'react-icons/fa';
import {SlEnergy} from 'react-icons/sl';
import {MdEmojiPeople} from 'react-icons/md';
import {BsFillEmojiAngryFill} from 'react-icons/bs';
import {WiCloudyWindy} from 'react-icons/wi';

function MainForm({props}) {
  
  const {area_sqm, set_area_sqm} = props;
  const {property_location, set_property_location} = props;
  const {distance_to_city, set_distance_to_city} = props;
  const {population, set_population} = props;
  const {property_type, set_property_type} = props;
  const {furnished, set_furnished} = props;
  const {shower, set_shower} = props;
  const {toilet, set_toilet} = props;
  const {living_room, set_living_room} = props;
  const {living_capacity, set_living_capacity} = props;
  const {internet, set_internet} = props;
  const {energy_label, set_energy_label} = props;
  const {roommates, set_roommates} = props;
  const {problematic_neighbors, set_problematic_neighbors} = props;
  const {air_quality, set_air_quality} = props;
  const {nearby_disturbances, set_nearby_disturbances} = props;
  const {apartment_facing, set_apartment_facing} = props;
  const {balcony_access, set_balcony_access} = props;
  const {pets_allowed, set_pets_allowed} = props;
  const {landlord_tenant_ages, set_landlord_tenant_ages} = props;
  const {near_public_transportation, set_near_public_transportation} = props;
  const {parking_availability, set_parking_availability} = props;
  const {garden_or_terrace, set_garden_or_terrace} = props;
  const {distance_from_schools, set_distance_from_schools} = props;
  const {security, set_security} = props;
  const {management_fee, set_management_fee} = props;
  const {quality_of_construction, set_quality_of_construction} = props;
  const {renovation_date, set_renovation_date} = props;
  const {flood_risk, set_flood_risk} = props;
  const {earthquake_risk, set_earthquake_risk} = props;
  const {distance_from_shops, set_distance_from_shops} = props;
  const {distance_from_gym, set_distance_from_gym} = props;
  const {sound_proof, set_sound_proof} = props;
  const {storage_room, set_storage_room} = props;
  const {built_appliances, set_built_appliances} = props;
  const {elevator, set_elevator} = props;
  const {pool, set_pool} = props;
  const {sauna, set_sauna} = props;
  const {jacuzzi, set_jacuzzi} = props;
  const {spa, set_spa} = props;
  const {community_facilities, set_community_facilities} = props;
  const {distance_from_touristic_area, set_distance_from_touristic_area} = props;
  const {parking_space, set_parking_space} = props;
  const {distance_from_public_transportation, set_distance_from_public_transportation} = props;
  const {distance_from_highway, set_distance_from_highway} = props;
  const {distance_from_airport, set_distance_from_airport} = props;
  const {distance_from_train_station, set_distance_from_train_station} = props;
  const {distance_from_bus_station, set_distance_from_bus_station} = props;
  const {distance_from_ferry, set_distance_from_ferry} = props;
  const {distance_from_taxi_stand, set_distance_from_taxi_stand} = props;
  const {distance_from_bike_rental, set_distance_from_bike_rental} = props;
  const {distance_from_car_rental, set_distance_from_car_rental} = props;
  const {lawn, set_lawn} = props;
  const {landscaping, set_landscaping} = props;
  const {garden, set_garden} = props;
  const {distance_from_park, set_distance_from_park} = props;
  const {distance_from_recreation_area, set_distance_from_recreation_area} = props;
  const {distance_from_zoo, set_distance_from_zoo} = props;
  const {view, set_view} = props;
  const {security_features, set_security_features} = props;
  const {distance_from_shopping_center, set_distance_from_shopping_center} = props;
  const {distance_from_library, set_distance_from_library} = props;
  const {distance_from_hospital, set_distance_from_hospital} = props;
  const {distance_from_pharmacy, set_distance_from_pharmacy} = props;

  const {step, set_step} = props;

  const [predicted_price, set_predicted_price] = useState(null);

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
        // let json = {'air_quality': 'good', 'apartment_facing': 'sunset', 'area_sqm': 50, 'balcony_access': 'yes', 'built_appliances': 'yes', 'community_facilities': 'yes', 'distance_from_airport': 15, 'distance_from_bike_rental': 1, 'distance_from_bus_station': 2, 'distance_from_car_rental': 3, 'distance_from_ferry': 10, 'distance_from_gym': 5, 'distance_from_highway': 5, 'distance_from_hospital': 8, 'distance_from_library': 5, 'distance_from_park': 2, 'distance_from_pharmacy': 1, 'distance_from_public_transportation': 1, 'distance_from_recreation_area': 5, 'distance_from_schools': 3, 'distance_from_shopping_center': 2, 'distance_from_shops': 2, 'distance_from_taxi_stand': 1, 'distance_from_touristic_area': 3, 'distance_from_train_station': 3, 'distance_from_zoo': 10, 'distance_to_city': 5, 'earthquake_risk': 'yes', 'elevator': 'yes', 'energy_label': 'B', 'flood_risk': 'yes', 'furnished': 'yes', 'garden': 'yes', 'garden_or_terrace': 'yes', 'internet': 'no', 'jacuzzi': 'yes', 'landlord_tenant_ages': '16-25', 'landscaping': 'yes', 'lawn': 'yes', 'living_capacity': 1, 'living_room': 'private', 'management_fee': 0.4, 'near_public_transportation': 'yes', 'nearby_disturbances': 'yes', 'parking_availability': 'private', 'parking_space': 'garage', 'pets_allowed': 'yes', 'pool': 'yes', 'population': 1000000.0, 'problematic_neighbors': 'yes', 'property_location': 'Groningen', 'property_type': 'room', 'quality_of_construction': 'high', 'renovation_date': 5, 'roommates': 4, 'sauna': 'yes', 'security': 'yes', 'security_features': 'surveillance', 'shower': 'private', 'sound_proof': 'yes', 'spa': 'yes', 'storage_room': 'yes', 'toilet': 'private', 'view': 'city'}
        
        try {
            const response = await axios.post('/api/', data);
            const predicted = response.data.message;
            set_predicted_price(Math.round(predicted * 100) / 100);
        } catch (error) {
            alert(error.message);
        }

    };


    /**
     * convert all the previous states into a form data object
     * 
     */
    return (
        <Container>
                {/* include all the states above */}
        {
            predicted_price != null ?
            <>
            <h1>Your property is worth: € {predicted_price} per month</h1>
            <ButtonGroup style={{display: 'flex', justifyContent: 'center'}}>
                <Button className="mb-3 me-2" size='lg' variant="primary" onClick={(_) => set_predicted_price(null)}>Go Back</Button>
            </ButtonGroup>
            </>
            : 
            <>  
            <Form onSubmit={handleSubmit}>
            {step !== 2 ? null : 
            <Card>
            <Form.Label as='h3'>How many square meters is your property?</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Total Area in Square Meters"
                    aria-label="Total Area in Square Meters"
                    aria-describedby="basic-addon2"
                    value={area_sqm}
                    onChange={(e) => set_area_sqm(e.target.value)}
                />
                <InputGroup.Text id="basic-addon2">
                m<sup>2</sup>

                </InputGroup.Text>
            </InputGroup>
            </Card>
            }
            {/* <br/> */}

            {step !== 3 ? null : 
            <Card>
            <Form.Label as='h3'>Where is your property located? <ImLocation2/> </Form.Label>
            <Form.Control as="radio" value={property_location} placeholder="Enter the Property Location" onChange={(e) => set_property_location(e.target.value)}>
            <Form.Check className='custom-radio' checked={ property_location == "Amsterdam"} type="radio" label="Amsterdam" value="Amsterdam" name="group-1"/>
            <Form.Check className='custom-radio' checked={ property_location == "Groningen"} type="radio" label="Groningen" value="Groningen" name="group-1"/>
            <Form.Check className='custom-radio' checked={ property_location == "Rotterdam"} type="radio" label="Rotterdam" value="Rotterdam" name="group-1"/>
            <Form.Check className='custom-radio' checked={ property_location == "Utrecht"} type="radio" label="Utrecht" value="Utrecht" name="group-1"/>
            <Form.Check className='custom-radio' checked={ property_location == "Enschede"} type="radio" label="Enschede" value="Enschede" name="group-1"/>
            <Form.Check className='custom-radio' checked={ property_location == "The Hague"} type="radio" label="The Hague" value="The_Hague" name="group-1"/>
            <Form.Check className='custom-radio' checked={ property_location == "Other"} type="radio" label="Other" value="Irrelevant" name="group-1"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 4 ? null : 
            <Card>
            <Form.Label as='h3'>What is the distance from your property to the city? <GiModernCity/> </Form.Label>
            <Form.Control as="radio" value={distance_to_city} placeholder="Enter the Distance To City" onChange={(e) => set_distance_to_city(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_to_city == "2"} type="radio" label="≤ 2 km" value="2" name="group-2"/>
            <Form.Check className='custom-radio' checked={ distance_to_city == "5"} type="radio" label="≤ 5 km" value="5" name="group-2"/>
            <Form.Check className='custom-radio' checked={ distance_to_city == "6"} type="radio" label="≤ 6 km" value="6" name="group-2"/>
            <Form.Check className='custom-radio' checked={ distance_to_city == "7"} type="radio" label="> 6 km" value="7" name="group-2"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 5 ? null : 
            <Card>
            <Form.Label as='h3'>What is the population of the area where your property is located? <IoPeopleSharp /> </Form.Label>
            <Form.Control as="radio" value={population} placeholder="Enter the Population" onChange={(e) => set_population(e.target.value)}>
            <Form.Check className='custom-radio' checked={ population == "1E6"} type="radio" label="< 1e6" value="1E6" name="group-3"/>
            <Form.Check className='custom-radio' checked={ population == "1E7"} type="radio" label="> 1e6" value="1E7" name="group-3"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 6 ? null : 
            <Card>
            <Form.Label as='h3'>What type of property is it?</Form.Label>
            <Form.Control as="radio" value={property_type} placeholder="Enter the Property Type" onChange={(e) => set_property_type(e.target.value)}>
            <Form.Check className='custom-radio' checked={ property_type == "room"} type="radio" label="Room" value="room" name="group-4"/>
            <Form.Check className='custom-radio' checked={ property_type == "apartment"} type="radio" label="Apartment" value="apartment" name="group-4"/>
            <Form.Check className='custom-radio' checked={ property_type == "squat"} type="radio" label="Anti Squat" value="anti-squat" name="group-4"/>
            <Form.Check className='custom-radio' checked={ property_type == "studio"} type="radio" label="Studio" value="studio" name="group-4"/>
            <Form.Check className='custom-radio' checked={ property_type == "residence"} type="radio" label="Student Residence" value="student-residence" name="group-4"/>
            <Form.Check className='custom-radio' checked={ property_type == "house"} type="radio" label="House" value="house" name="group-4"/>
            <Form.Check className='custom-radio' checked={ property_type == "other"} type="radio" label="Other" value="other" name="group-4"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 7 ? null : 
            <Card>
            <Form.Label as='h3'>Is the property furnished? <FaCouch/> </Form.Label>
            <Form.Control as="radio" value={furnished} placeholder="Enter the Furnished" onChange={(e) => set_furnished(e.target.value)}>
            <Form.Check className='custom-radio' checked={ furnished == "yes"} type="radio" label="Yes" value="yes" name="group-5"/>
            <Form.Check className='custom-radio' checked={ furnished == "no"} type="radio" label="No" value="no" name="group-5"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 8 ? null :
            <Card>
            <Form.Label as='h3'>Does the property have a shower? <GiShower/> </Form.Label>
            <Form.Control as="radio" value={shower} placeholder="Enter the Shower" onChange={(e) => set_shower(e.target.value)}>
            <Form.Check className='custom-radio' checked={shower == "private"} type="radio" label="Private" value="private" name="group-6"/>
            <Form.Check className='custom-radio' checked={shower == "shared"} type="radio" label="Shared" value="shared" name="group-6"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 9 ? null : 
            <Card>
            <Form.Label as='h3'>Does the property have a toilet? <FaToilet/></Form.Label>
            <Form.Control as="radio" value={toilet} placeholder="Enter the Toilet" onChange={(e) => set_toilet(e.target.value)}>
            <Form.Check className='custom-radio' checked={ toilet == "private"} type="radio" label="Private" value="private" name="group-7"/>
            <Form.Check className='custom-radio' checked={ toilet == "shared"} type="radio" label="Shared" value="shared" name="group-7"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 10 ? null : 
            <Card>
            <Form.Label as='h3'>Does the property have a living room?</Form.Label>
            <Form.Control as="radio" value={living_room} placeholder="Enter the Living Room" onChange={(e) => set_living_room(e.target.value)}>
            <Form.Check className='custom-radio' checked={living_room == "private"} type="radio" label="Private" value="private" name="group-8"/>
            <Form.Check className='custom-radio' checked={living_room == "shared"} type="radio" label="Shared" value="shared" name="group-8"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 11 ? null : 
            <Card>
            <Form.Label as='h3'>How many people can the property accommodate?</Form.Label>
            <Form.Control as="radio" value={living_capacity} placeholder="Enter the Living Capacity" onChange={(e) => set_living_capacity(e.target.value)}>
            <Form.Check className='custom-radio' checked={ living_capacity == "1"} type="radio" label="1" value="1" name="group-9"/>
            <Form.Check className='custom-radio' checked={ living_capacity == "2"} type="radio" label="2" value="2" name="group-9"/>
            <Form.Check className='custom-radio' checked={ living_capacity == "3"} type="radio" label="3" value="3" name="group-9"/>
            <Form.Check className='custom-radio' checked={ living_capacity == "4"} type="radio" label="4" value="4" name="group-9"/>
            <Form.Check className='custom-radio' checked={ living_capacity == "5"} type="radio" label="5" value="5" name="group-9"/>
            <Form.Check className='custom-radio' checked={ living_capacity == "6"} type="radio" label="> 5" value="6" name="group-9"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 12 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have internet access? <FaWifi/> </Form.Label>
            <Form.Control as="radio" value={internet} placeholder="Enter the Internet" onChange={(e) => set_internet(e.target.value)}>
            <Form.Check className='custom-radio' checked={ internet == "yes"} type="radio" label="Yes" value="yes" name="group-10"/>
            <Form.Check className='custom-radio' checked={ internet == "no"} type="radio" label="No" value="no" name="group-10"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 13 ? null :  
            <Card>
            <Form.Label as='h3'>What is the energy label of the property? <SlEnergy/> </Form.Label>
            <Form.Control as="radio" value={energy_label} placeholder="Enter the Energy Label" onChange={(e) => set_energy_label(e.target.value)}>
            <Form.Check className='custom-radio' checked={ energy_label == "A"} type="radio" label="A" value="A" name="group-11"/>
            <Form.Check className='custom-radio' checked={ energy_label == "B"} type="radio" label="B" value="B" name="group-11"/>
            <Form.Check className='custom-radio' checked={ energy_label == "C"} type="radio" label="C" value="C" name="group-11"/>
            <Form.Check className='custom-radio' checked={ energy_label == "D"} type="radio" label="D" value="D" name="group-11"/>
            <Form.Check className='custom-radio' checked={ energy_label == "E"} type="radio" label="E" value="E" name="group-11"/>
            <Form.Check className='custom-radio' checked={ energy_label == "F"} type="radio" label="F" value="F" name="group-11"/>
            <Form.Check className='custom-radio' checked={ energy_label == "G"} type="radio" label="G" value="G" name="group-11"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 14 ? null :  
            <Card>
            <Form.Label as='h3'>Are there roommates in the property? <MdEmojiPeople/> </Form.Label>
            <Form.Control as="radio" value={roommates} placeholder="Enter the Roommates" onChange={(e) => set_roommates(e.target.value)}>
            <Form.Check className='custom-radio' checked={ roommates == "1"} type="radio" label="1" value="1" name="group-12"/>
            <Form.Check className='custom-radio' checked={ roommates == "2"} type="radio" label="2" value="2" name="group-12"/>
            <Form.Check className='custom-radio' checked={ roommates == "3"} type="radio" label="3" value="3" name="group-12"/>
            <Form.Check className='custom-radio' checked={ roommates == "4"} type="radio" label="4" value="4" name="group-12"/>
            <Form.Check className='custom-radio' checked={ roommates == "5"} type="radio" label="5" value="5" name="group-12"/>
            <Form.Check className='custom-radio' checked={ roommates == "6"} type="radio" label="> 5" value="6" name="group-12"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 15 ? null :  
            <Card>
            <Form.Label as='h3'>Are there problematic neighbors in the area?<BsFillEmojiAngryFill/></Form.Label>
            <Form.Control as="radio" value={problematic_neighbors} placeholder="Enter the Problematic Neighbors" onChange={(e) => set_problematic_neighbors(e.target.value)}>
            <Form.Check className='custom-radio' checked={ problematic_neighbors == "yes"} type="radio" label="Yes" value="yes" name="group-13"/>
            <Form.Check className='custom-radio' checked={ problematic_neighbors == "no"} type="radio" label="No" value="no" name="group-13"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 16 ? null :  
            <Card>
            <Form.Label as='h3'>What is the air quality like in the area? <WiCloudyWindy/> </Form.Label>
            <Form.Control as="radio" value={air_quality} placeholder="Enter the Air Quality" onChange={(e) => set_air_quality(e.target.value)}>
            <Form.Check className='custom-radio' checked={ air_quality == "good"} type="radio" label="Good" value="good" name="group-14"/>
            <Form.Check className='custom-radio' checked={ air_quality == "average"} type="radio" label="Average" value="average" name="group-14"/>
            <Form.Check className='custom-radio' checked={ air_quality == "bad"} type="radio" label="Bad" value="bad" name="group-14"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 17 ? null :  
            <Card>
            <Form.Label as='h3'>Are there any nearby disturbances?</Form.Label>
            <Form.Control as="radio" value={nearby_disturbances} placeholder="Enter the Nearby Disturbances" onChange={(e) => set_nearby_disturbances(e.target.value)}>
            <Form.Check className='custom-radio' checked={ nearby_disturbances == "yes"} type="radio" label="Yes" value="yes" name="group-15"/>
            <Form.Check className='custom-radio' checked={ nearby_disturbances == "no"} type="radio" label="No" value="no" name="group-15"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 18 ? null :  
            <Card>
            <Form.Label as='h3'>What direction is the apartment facing?</Form.Label>
            <Form.Control as="radio" value={apartment_facing} placeholder="Enter the Apartment Facing" onChange={(e) => set_apartment_facing(e.target.value)}>
            <Form.Check className='custom-radio' checked={ apartment_facing == "sunrise"} type="radio" label="Sunrise" value="sunrise" name="group-16"/>
            <Form.Check className='custom-radio' checked={ apartment_facing == "sunset"} type="radio" label="Sunset" value="sunset" name="group-16"/>
            <Form.Check className='custom-radio' checked={ apartment_facing == "partial_sun"} type="radio" label="Partial sun" value="partial_sun" name="group-16"/>
            <Form.Check className='custom-radio' checked={ apartment_facing == "shadowed"} type="radio" label="Shadowed" value="shadowed" name="group-16"/>
            <Form.Check className='custom-radio' checked={ apartment_facing == "fully_shadowed"} type="radio" label="Fully shadowed" value="fully_shadowed" name="group-16"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 19 ? null :  
            <Card>
            <Form.Label as='h3'>Is there access to a balcony?</Form.Label>
            <Form.Control as="radio" value={balcony_access} placeholder="Enter the Balcony Access" onChange={(e) => set_balcony_access(e.target.value)}>
            <Form.Check className='custom-radio' checked={ balcony_access == "yes"} type="radio" label="Yes" value="yes" name="group-17"/>
            <Form.Check className='custom-radio' checked={ balcony_access == "no"} type="radio" label="No" value="no" name="group-17"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 20 ? null :  
            <Card>
            <Form.Label as='h3'>Are pets allowed in the property?</Form.Label>
            <Form.Control as="radio" value={pets_allowed} placeholder="Enter the Pets Allowed" onChange={(e) => set_pets_allowed(e.target.value)}>
            <Form.Check className='custom-radio' checked={ pets_allowed == "yes"} type="radio" label="Yes" value="yes" name="group-18"/>
            <Form.Check className='custom-radio' checked={ pets_allowed == "no"} type="radio" label="No" value="no" name="group-18"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 21 ? null :  
            <Card>
            <Form.Label as='h3'>What are the ages of the landlord and tenant?</Form.Label>
            <Form.Control as="radio" value={landlord_tenant_ages} placeholder="Enter the Landlord Tenant Ages" onChange={(e) => set_landlord_tenant_ages(e.target.value)}>
            <Form.Check className='custom-radio' checked={ landlord_tenant_ages == "16-25"} type="radio" label="16-25" value="16-25" name="group-19"/>
            <Form.Check className='custom-radio' checked={ landlord_tenant_ages == "16-60"} type="radio" label="16-60" value="16-60" name="group-19"/>
            <Form.Check className='custom-radio' checked={ landlord_tenant_ages == "18-60"} type="radio" label="18-60" value="18-60" name="group-19"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 22 ? null :  
            <Card>
            <Form.Label as='h3'>Is the property near public transportation?</Form.Label>
            <Form.Control as="radio" value={near_public_transportation} placeholder="Enter the Near Public Transportation" onChange={(e) => set_near_public_transportation(e.target.value)}>
            <Form.Check className='custom-radio' checked={ near_public_transportation == "yes"} type="radio" label="Yes" value="yes" name="group-20"/>
            <Form.Check className='custom-radio' checked={ near_public_transportation == "no"} type="radio" label="No" value="no" name="group-20"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 23 ? null :  
            <Card>
            <Form.Label as='h3'>Is there parking availability near the property?</Form.Label>
            <Form.Control as="radio" value={parking_availability} placeholder="Enter the Parking Availability" onChange={(e) => set_parking_availability(e.target.value)}>
            <Form.Check className='custom-radio' checked={ parking_availability == "private"} type="radio" label="Private" value="private" name="group-21"/>
            <Form.Check className='custom-radio' checked={ parking_availability == "street"} type="radio" label="Street" value="street" name="group-21"/>
            <Form.Check className='custom-radio' checked={ parking_availability == "none"} type="radio" label="None" value="none" name="group-21"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 24 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have a garden or terrace?</Form.Label>
            <Form.Control as="radio" value={garden_or_terrace} placeholder="Enter the Garden Or Terrace" onChange={(e) => set_garden_or_terrace(e.target.value)}>
            <Form.Check className='custom-radio' checked={ garden_or_terrace == "yes"} type="radio" label="Yes" value="yes" name="group-22"/>
            <Form.Check className='custom-radio' checked={ garden_or_terrace == "no"} type="radio" label="No" value="no" name="group-22"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 25 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from schools in the area?</Form.Label>
            <Form.Control as="radio" value={distance_from_schools} placeholder="Enter the Distance From Schools" onChange={(e) => set_distance_from_schools(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_schools == "8"} type="radio" label="≤ 8 km" value="8" name="group-23"/>
            <Form.Check className='custom-radio' checked={ distance_from_schools == "9"} type="radio" label="> 8 km" value="9" name="group-23"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 26 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest hospital?</Form.Label>
            <Form.Control as="radio" value={distance_from_hospital} placeholder="Enter the Distance From Hospital" onChange={(e) => set_distance_from_hospital(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_hospital == "8"} type="radio" label="≤ 8 km" value="8" name="group-24"/>
            <Form.Check className='custom-radio' checked={distance_from_hospital == "9"} type="radio" label="> 8 km" value="9" name="group-24"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 27 ? null :  
            <Card>
            <Form.Label as='h3'>What is the level of security in the area?</Form.Label>
            <Form.Control as="radio" value={security} placeholder="Enter the Security" onChange={(e) => set_security(e.target.value)}>
            <Form.Check className='custom-radio' checked={ security == "yes"} type="radio" label="Yes" value="yes" name="group-25"/>
            <Form.Check className='custom-radio' checked={ security == "no"} type="radio" label="No" value="no" name="group-25"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 28 ? null :  
            <Card>
            <Form.Label as='h3'>What is the management fee for the property?</Form.Label>
            <Form.Text className="text-muted"> This is the fraction of the rent that the property manager takes as a fee per year. </Form.Text>
            <Form.Control as="radio" value={management_fee} placeholder="Enter the Management Fee" onChange={(e) => set_management_fee(e.target.value)}>
            <Form.Check className='custom-radio' checked={management_fee == "0.4"} type="radio" label="0.5" value="0.4" name="group-26"/>
            <Form.Check className='custom-radio' checked={management_fee == "1"} type="radio" label="1.0" value="1" name="group-26"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 29 ? null :  
            <Card>
            <Form.Label as='h3'>What is the quality of construction of the property?</Form.Label>
            <Form.Control as="radio" value={quality_of_construction} placeholder="Enter the Quality Of Construction" onChange={(e) => set_quality_of_construction(e.target.value)}>
            <Form.Check className='custom-radio' checked={ quality_of_construction == "high"} type="radio" label="High" value="high" name="group-27"/>
            <Form.Check className='custom-radio' checked={ quality_of_construction == "mid"} type="radio" label="Mid" value="mid" name="group-27"/>
            <Form.Check className='custom-radio' checked={ quality_of_construction == "low"} type="radio" label="Low" value="low" name="group-27"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 30 ? null :  
            <Card>
            <Form.Label as='h3'>When was the property last renovated?</Form.Label>
            <Form.Control as="radio" value={renovation_date} placeholder="Enter the Renovation Date" onChange={(e) => set_renovation_date(e.target.value)}>
            <Form.Check className='custom-radio' checked={renovation_date  == "5"} type="radio" label="< 5 years" value="5" name="group-28"/>
            <Form.Check className='custom-radio' checked={renovation_date  == "8"} type="radio" label="< 8 years" value="8" name="group-28"/>
            <Form.Check className='custom-radio' checked={renovation_date  == "10"} type="radio" label="> 8 km years" value="10" name="group-28"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 31 ? null :  
            <Card>
            <Form.Label as='h3'>Is the area prone to flooding?</Form.Label>
            <Form.Control as="radio" value={flood_risk} placeholder="Enter the Flood Risk" onChange={(e) => set_flood_risk(e.target.value)}>
            <Form.Check className='custom-radio' checked={ flood_risk == "yes"} type="radio" label="Yes" value="yes" name="group-29"/>
            <Form.Check className='custom-radio' checked={ flood_risk == "no"} type="radio" label="No" value="no" name="group-29"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 32 ? null :  
            <Card>
            <Form.Label as='h3'>Is the area prone to earthquakes?</Form.Label>
            <Form.Control as="radio" value={earthquake_risk} placeholder="Enter the Earthquake Risk" onChange={(e) => set_earthquake_risk(e.target.value)}>
            <Form.Check className='custom-radio' checked={ earthquake_risk == "yes"} type="radio" label="Yes" value="yes" name="group-30"/>
            <Form.Check className='custom-radio' checked={ earthquake_risk == "no"} type="radio" label="No" value="no" name="group-30"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 33 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from shops in the area?</Form.Label>
            <Form.Control as="radio" value={distance_from_shops} placeholder="Enter the Distance From Shops" onChange={(e) => set_distance_from_shops(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_shops == "2"} type="radio" label="≤ 2 km" value="2" name="group-31"/>
            <Form.Check className='custom-radio' checked={distance_from_shops == "3"} type="radio" label="> 2 km" value="3" name="group-31"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 34 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest gym?</Form.Label>
            <Form.Control as="radio" value={distance_from_gym} placeholder="Enter the Distance From Gym" onChange={(e) => set_distance_from_gym(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_gym == "5"} type="radio" label="≤ 5 km" value="5" name="group-32"/>
            <Form.Check className='custom-radio' checked={ distance_from_gym == "6"} type="radio" label="> 5 km" value="6" name="group-32"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 35 ? null :  
            <Card>
            <Form.Label as='h3'>Is the property soundproof?</Form.Label>
            <Form.Control as="radio" value={sound_proof} placeholder="Enter the Sound Proof" onChange={(e) => set_sound_proof(e.target.value)}>
            <Form.Check className='custom-radio' checked={ sound_proof == "yes"} type="radio" label="Yes" value="yes" name="group-33"/>
            <Form.Check className='custom-radio' checked={ sound_proof == "no"} type="radio" label="No" value="no" name="group-33"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 36 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have storage space?</Form.Label>
            <Form.Control as="radio" value={storage_room} placeholder="Enter the Storage" onChange={(e) => set_storage_room(e.target.value)}>
            <Form.Check className='custom-radio' checked={ storage_room == "yes"} type="radio" label="Yes" value="yes" name="group-34"/>
            <Form.Check className='custom-radio' checked={ storage_room == "no"} type="radio" label="No" value="no" name="group-34"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 37 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have built-in appliances?</Form.Label>
            <Form.Control as="radio" value={built_appliances} placeholder="Enter the Built In Appliances" onChange={(e) => set_built_appliances(e.target.value)}>
            <Form.Check className='custom-radio' checked={ built_appliances == "yes"} type="radio" label="Yes" value="yes" name="group-35"/>
            <Form.Check className='custom-radio' checked={ built_appliances == "no"} type="radio" label="No" value="no" name="group-35"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 38 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have an elevator?</Form.Label>
            <Form.Control as="radio" value={elevator} placeholder="Enter the Elevator" onChange={(e) => set_elevator(e.target.value)}>
            <Form.Check className='custom-radio' checked={ elevator == "yes"} type="radio" label="Yes" value="yes" name="group-36"/>
            <Form.Check className='custom-radio' checked={ elevator == "no"} type="radio" label="No" value="no" name="group-36"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 39 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have a pool?</Form.Label>
            <Form.Control as="radio" value={pool} placeholder="Enter the Pool" onChange={(e) => set_pool(e.target.value)}>
            <Form.Check className='custom-radio' checked={ pool == "yes"} type="radio" label="Yes" value="yes" name="group-37"/>
            <Form.Check className='custom-radio' checked={ pool == "no"} type="radio" label="No" value="no" name="group-37"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 40 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have a sauna?</Form.Label>
            <Form.Control as="radio" value={sauna} placeholder="Enter the Sauna" onChange={(e) => set_sauna(e.target.value)}>
            <Form.Check className='custom-radio' checked={ sauna == "yes"} type="radio" label="Yes" value="yes" name="group-38"/>
            <Form.Check className='custom-radio' checked={ sauna == "no"} type="radio" label="No" value="no" name="group-38"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 41 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have a Jacuzzi?</Form.Label>
            <Form.Control as="radio" value={jacuzzi} placeholder="Enter the Jacuzzi" onChange={(e) => set_jacuzzi(e.target.value)}>
            <Form.Check className='custom-radio' checked={ jacuzzi == "yes"} type="radio" label="Yes" value="yes" name="group-39"/>
            <Form.Check className='custom-radio' checked={ jacuzzi == "no"} type="radio" label="No" value="no" name="group-39"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 42 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have a spa?</Form.Label>
            <Form.Control as="radio" value={spa} placeholder="Enter the Spa" onChange={(e) => set_spa(e.target.value)}>
            <Form.Check className='custom-radio' checked={ spa == "yes"} type="radio" label="Yes" value="yes" name="group-40"/>
            <Form.Check className='custom-radio' checked={ spa == "no"} type="radio" label="No" value="no" name="group-40"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 43 ? null :  
            <Card>
            <Form.Label as='h3'>Are there community facilities nearby?</Form.Label>
            <Form.Control as="radio" value={community_facilities} placeholder="Enter the Community Facilities" onChange={(e) => set_community_facilities(e.target.value)}>
            <Form.Check className='custom-radio' checked={ community_facilities == "yes"} type="radio" label="Yes" value="yes" name="group-41"/>
            <Form.Check className='custom-radio' checked={ community_facilities == "no"} type="radio" label="No" value="no" name="group-41"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 44 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest touristic area?</Form.Label>
            <Form.Control as="radio" value={distance_from_touristic_area} placeholder="Enter the Distance From Touristic Area" onChange={(e) => set_distance_from_touristic_area(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_touristic_area == "3"} type="radio" label="≤ 3 km" value="3" name="group-42"/>
            <Form.Check className='custom-radio' checked={distance_from_touristic_area == "4"} type="radio" label="> 3 km" value="4" name="group-42"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 45 ? null :  
            <Card>
            <Form.Label as='h3'>Is there parking space available?</Form.Label>
            <Form.Control as="radio" value={parking_space} placeholder="Enter the Parking Space" onChange={(e) => set_parking_space(e.target.value)}>
            <Form.Check className='custom-radio' checked={ parking_space == "garage"} type="radio" label="Garage" value="garage" name="group-43"/>
            <Form.Check className='custom-radio' checked={ parking_space == "driveway"} type="radio" label="Driveway" value="driveway" name="group-43"/>
            <Form.Check className='custom-radio' checked={ parking_space == "carport"} type="radio" label="Carport" value="carport" name="group-43"/>
            <Form.Check className='custom-radio' checked={ parking_space == "none"} type="radio" label="None" value="none" name="group-43"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 46 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from public transportation?</Form.Label>
            <Form.Control as="radio" value={distance_from_public_transportation} placeholder="Enter the Distance From Public Transportation" onChange={(e) => set_distance_from_public_transportation(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_public_transportation == "1"} type="radio" label="≤ 1 km" value="1" name="group-44"/>
            <Form.Check className='custom-radio' checked={ distance_from_public_transportation == "2"} type="radio" label="> 1 km" value="2" name="group-44"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 47 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest highway?</Form.Label>
            <Form.Control as="radio" value={distance_from_highway} placeholder="Enter the Distance From Highway" onChange={(e) => set_distance_from_highway(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_highway == "5"} type="radio" label="≤ 5 km" value="5" name="group-45"/>
            <Form.Check className='custom-radio' checked={ distance_from_highway == "6"} type="radio" label="> 5 km" value="6" name="group-45"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 48 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest airport?</Form.Label>
            <Form.Control as="radio" value={distance_from_airport} placeholder="Enter the Distance From Airport" onChange={(e) => set_distance_from_airport(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_airport == "15"} type="radio" label="≤ 1 km5" value="15" name="group-46"/>
            <Form.Check className='custom-radio' checked={ distance_from_airport == "16"} type="radio" label="> 15 km" value="16" name="group-46"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 49 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest train station?</Form.Label>
            <Form.Control as="radio" value={distance_from_train_station} placeholder="Enter the Distance From Train Station" onChange={(e) => set_distance_from_train_station(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_train_station == "3"} type="radio" label="≤ 3 km" value="3" name="group-47"/>
            <Form.Check className='custom-radio' checked={distance_from_train_station == "4"} type="radio" label="> 3 km" value="4" name="group-47"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 50 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest bus station?</Form.Label>
            <Form.Control as="radio" value={distance_from_bus_station} placeholder="Enter the Distance From Bus Station" onChange={(e) => set_distance_from_bus_station(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_bus_station == "2"} type="radio" label="≤ 2 km" value="2" name="group-48"/>
            <Form.Check className='custom-radio' checked={distance_from_bus_station == "3"} type="radio" label="> 2 km" value="3" name="group-48"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 51 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest ferry?</Form.Label>
            <Form.Control as="radio" value={distance_from_ferry} placeholder="Enter the Distance From Ferry" onChange={(e) => set_distance_from_ferry(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_ferry == "10"} type="radio" label="≤ 1 km" value="10" name="group-49"/>
            <Form.Check className='custom-radio' checked={distance_from_ferry == "11"} type="radio" label="> 10 km" value="11" name="group-49"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 52 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest taxi stand?</Form.Label>
            <Form.Control as="radio" value={distance_from_taxi_stand} placeholder="Enter the Distance From Taxi Stand" onChange={(e) => set_distance_from_taxi_stand(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_taxi_stand == "1"} type="radio" label="≤ 1 km" value="1" name="group-50"/>
            <Form.Check className='custom-radio' checked={ distance_from_taxi_stand == "2"} type="radio" label="> 1 km" value="2" name="group-50"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 53 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest bike rental?</Form.Label>
            <Form.Control as="radio" value={distance_from_bike_rental} placeholder="Enter the Distance From Bike Rental" onChange={(e) => set_distance_from_bike_rental(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_bike_rental == "1"} type="radio" label="≤ 1 km" value="1" name="group-51"/>
            <Form.Check className='custom-radio' checked={ distance_from_bike_rental == "2"} type="radio" label="> 1 km" value="2" name="group-51"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 54 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest car rental?</Form.Label>
            <Form.Control as="radio" value={distance_from_car_rental} placeholder="Enter the Distance From Car Rental" onChange={(e) => set_distance_from_car_rental(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_car_rental == "3"} type="radio" label="≤ 3 km" value="3" name="group-52"/>
            <Form.Check className='custom-radio' checked={ distance_from_car_rental == "4"} type="radio" label="> 3 km" value="4" name="group-52"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 55 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have a lawn?</Form.Label>
            <Form.Control as="radio" value={lawn} placeholder="Enter the Lawn" onChange={(e) => set_lawn(e.target.value)}>
            <Form.Check className='custom-radio' checked={ lawn == "yes"} type="radio" label="Yes" value="yes" name="group-53"/>
            <Form.Check className='custom-radio' checked={ lawn == "no"} type="radio" label="No" value="no" name="group-53"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 56 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have landscaping?</Form.Label>
            <Form.Control as="radio" value={landscaping} placeholder="Enter the Landscaping" onChange={(e) => set_landscaping(e.target.value)}>
            <Form.Check className='custom-radio' checked={ landscaping == "yes"} type="radio" label="Yes" value="yes" name="group-54"/>
            <Form.Check className='custom-radio' checked={ landscaping == "no"} type="radio" label="No" value="no" name="group-54"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 57 ? null :  
            <Card>
            <Form.Label as='h3'>Does the property have a garden?</Form.Label>
            <Form.Control as="radio" value={garden} placeholder="Enter the Garden" onChange={(e) => set_garden(e.target.value)}>
            <Form.Check className='custom-radio' checked={ garden == "yes"} type="radio" label="Yes" value="yes" name="group-55"/>
            <Form.Check className='custom-radio' checked={ garden == "no"} type="radio" label="No" value="no" name="group-55"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 58 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest park?</Form.Label>
            <Form.Control as="radio" value={distance_from_park} placeholder="Enter the Distance From Park" onChange={(e) => set_distance_from_park(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_park == "2"} type="radio" label="≤ 2 km" value="2" name="group-56"/>
            <Form.Check className='custom-radio' checked={distance_from_park == "3"} type="radio" label="> 2 km" value="3" name="group-56"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 59 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest recreation area?</Form.Label>
            <Form.Control as="radio" value={distance_from_recreation_area} placeholder="Enter the Distance From Recreation Area" onChange={(e) => set_distance_from_recreation_area(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_recreation_area == "5"} type="radio" label="≤ 5 km" value="5" name="group-57"/>
            <Form.Check className='custom-radio' checked={ distance_from_recreation_area == "6"} type="radio" label="> 5 km" value="6" name="group-57"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 60 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest zoo?</Form.Label>
            <Form.Control as="radio" value={distance_from_zoo} placeholder="Enter the Distance From Zoo" onChange={(e) => set_distance_from_zoo(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_zoo == "10"} type="radio" label="≤ 1 km" value="10" name="group-58"/>
            <Form.Check className='custom-radio' checked={distance_from_zoo == "11"} type="radio" label="> 10 km" value="11" name="group-58"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 61 ? null :  
            <Card>
            <Form.Label as='h3'>What is the view like from the property?</Form.Label>
            <Form.Control as="radio" value={view} placeholder="Enter the View" onChange={(e) => set_view(e.target.value)}>
            <Form.Check className='custom-radio' checked={ view == "city"} type="radio" label="City" value="city" name="group-59"/>
            <Form.Check className='custom-radio' checked={ view == "water"} type="radio" label="Water" value="water" name="group-59"/>
            <Form.Check className='custom-radio' checked={ view == "park"} type="radio" label="Park" value="park" name="group-59"/>
            <Form.Check className='custom-radio' checked={ view == "nature"} type="radio" label="Nature" value="nature" name="group-59"/>
            <Form.Check className='custom-radio' checked={ view == "other"} type="radio" label="Other" value="other" name="group-59"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 62 ? null :  
            <Card>
            <Form.Label as='h3'>What security features does the property have?</Form.Label>
            <Form.Control as="radio" value={security_features} placeholder="Enter the Security Features" onChange={(e) => set_security_features(e.target.value)}>
            <Form.Check className='custom-radio' checked={security_features == "alarm"} type="radio" label="Alarm" value="alarm" name="group-60"/>
            <Form.Check className='custom-radio' checked={security_features == "surveillance"} type="radio" label="Surveillance" value="surveillance" name="group-60"/>
            <Form.Check className='custom-radio' checked={security_features == "guard"} type="radio" label="Guard" value="guard" name="group-60"/>
            <Form.Check className='custom-radio' checked={security_features == "none"} type="radio" label="None" value="none" name="group-60"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 63 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from schools in the area?</Form.Label>
            <Form.Control as="radio" value={distance_from_schools} placeholder="Enter the Distance From Schools" onChange={(e) => set_distance_from_schools(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_schools == "3"} type="radio" label="≤ 3 km" value="3" name="group-61"/>
            <Form.Check className='custom-radio' checked={ distance_from_schools == "4"} type="radio" label="> 3 km" value="4" name="group-61"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 64 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest shopping center?</Form.Label>
            <Form.Control as="radio" value={distance_from_shopping_center} placeholder="Enter the Distance From Shopping Center" onChange={(e) => set_distance_from_shopping_center(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_shopping_center == "2"} type="radio" label="≤ 2 km" value="2" name="group-62"/>
            <Form.Check className='custom-radio' checked={ distance_from_shopping_center == "3"} type="radio" label="> 2 km" value="3" name="group-62"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 65 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest library?</Form.Label>
            <Form.Control as="radio" value={distance_from_library} placeholder="Enter the Distance From Library" onChange={(e) => set_distance_from_library(e.target.value)}>
            <Form.Check className='custom-radio' checked={ distance_from_library == "5"} type="radio" label="≤ 5 km" value="5" name="group-63"/>
            <Form.Check className='custom-radio' checked={ distance_from_library == "6"} type="radio" label="> 5 km" value="6" name="group-63"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 66 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest hospital?</Form.Label>
            <Form.Control as="radio" value={distance_from_hospital} placeholder="Enter the Distance From Hospital" onChange={(e) => set_distance_from_hospital(e.target.value)}>
            <Form.Check className='custom-radio' checked={distance_from_hospital == "8"} type="radio" label="≤ 8 km" value="8" name="group-64"/>
            <Form.Check className='custom-radio' checked={distance_from_hospital == "9"} type="radio" label="> 8 km" value="9" name="group-64"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}

            {step !== 67 ? null :  
            <Card>
            <Form.Label as='h3'>What is the distance from the nearest pharmacy?</Form.Label>
            <Form.Control as="radio" value={distance_from_pharmacy} placeholder="Enter the Distance From Pharmacy" onChange={(e) => set_distance_from_pharmacy(e.target.value)}>
            <Form.Check className='custom-radio' checked={  distance_from_pharmacy == "1"} type="radio" label="≤ 1 km" value="1" name="group-65"/>
            <Form.Check className='custom-radio' checked={  distance_from_pharmacy == "2"} type="radio" label="> 1 km" value="2" name="group-65"/>
            </Form.Control>
            </Card>
            }
            {/* <br/> */}
            {/* <br/> */}
            {
                step === 67 ?
                <ButtonGroup style={{display: 'flex', justifyContent: 'center'}}>
                    <Button className="mb-3 me-2" size='lg' type="submit" variant="primary" >Submit</Button>
                </ButtonGroup>
                :
                null
            }
            </Form>

            </>
            }
        </Container>

    )
}


export default MainForm;

