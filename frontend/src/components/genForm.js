const fs  = require('fs');

const form_fields = [
    
    {field :'area_sqm', setter: 'set_area_sqm', type : 'radio', options : ['1', '2']},
    
    {field :'property_location', setter: 'set_property_location', type : 'radio', options : ['1', '2']},
    
    {field :'distance_to_city', setter: 'set_distance_to_city', type : 'radio', options : ['1', '2']},
    
    {field :'population', setter: 'set_population', type : 'radio', options : ['1', '2']},
    
    {field :'property_type', setter: 'set_property_type', type : 'radio', options : ['1', '2']},
    
    {field :'furnished', setter: 'set_furnished', type : 'radio', options : ['1', '2']},
    
    {field :'shower', setter: 'set_shower', type : 'radio', options : ['1', '2']},
    
    {field :'toilet', setter: 'set_toilet', type : 'radio', options : ['1', '2']},
    
    {field :'living_room', setter: 'set_living_room', type : 'radio', options : ['1', '2']},
    
    {field :'living_capacity', setter: 'set_living_capacity', type : 'radio', options : ['1', '2']},
    
    {field :'internet', setter: 'set_internet', type : 'radio', options : ['1', '2']},
    
    {field :'energy_label', setter: 'set_energy_label', type : 'radio', options : ['1', '2']},
    
    {field :'roommates', setter: 'set_roommates', type : 'radio', options : ['1', '2']},
    
    {field :'problematic_neighbors', setter: 'set_problematic_neighbors', type : 'radio', options : ['1', '2']},
    
    {field :'air_quality', setter: 'set_air_quality', type : 'radio', options : ['1', '2']},
    
    {field :'nearby_disturbances', setter: 'set_nearby_disturbances', type : 'radio', options : ['1', '2']},
    
    {field :'apartment_facing', setter: 'set_apartment_facing', type : 'radio', options : ['1', '2']},
    
    {field :'balcony_access', setter: 'set_balcony_access', type : 'radio', options : ['1', '2']},
    
    {field :'pets_allowed', setter: 'set_pets_allowed', type : 'radio', options : ['1', '2']},
    
    {field :'landlord_tenant_ages', setter: 'set_landlord_tenant_ages', type : 'radio', options : ['1', '2']},
    
    {field :'near_public_transportation', setter: 'set_near_public_transportation', type : 'radio', options : ['1', '2']},
    
    {field :'parking_availability', setter: 'set_parking_availability', type : 'radio', options : ['1', '2']},
    
    {field :'garden_or_terrace', setter: 'set_garden_or_terrace', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_schools', setter: 'set_distance_from_schools', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_hospitals', setter: 'set_distance_from_hospitals', type : 'radio', options : ['1', '2']},
    
    {field :'security', setter: 'set_security', type : 'radio', options : ['1', '2']},
    
    {field :'management_fee', setter: 'set_management_fee', type : 'radio', options : ['1', '2']},
    
    {field :'quality_of_construction', setter: 'set_quality_of_construction', type : 'radio', options : ['1', '2']},
    
    {field :'renovation_date', setter: 'set_renovation_date', type : 'radio', options : ['1', '2']},
    
    {field :'flood_risk', setter: 'set_flood_risk', type : 'radio', options : ['1', '2']},
    
    {field :'earthquake_risk', setter: 'set_earthquake_risk', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_shops', setter: 'set_distance_from_shops', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_gym', setter: 'set_distance_from_gym', type : 'radio', options : ['1', '2']},
    
    {field :'soundproof', setter: 'set_soundproof', type : 'radio', options : ['1', '2']},
    
    {field :'storage', setter: 'set_storage', type : 'radio', options : ['1', '2']},
    
    {field :'built_in_appliances', setter: 'set_built_in_appliances', type : 'radio', options : ['1', '2']},
    
    {field :'elevator', setter: 'set_elevator', type : 'radio', options : ['1', '2']},
    
    {field :'pool', setter: 'set_pool', type : 'radio', options : ['1', '2']},
    
    {field :'sauna', setter: 'set_sauna', type : 'radio', options : ['1', '2']},
    
    {field :'jacuzzi', setter: 'set_jacuzzi', type : 'radio', options : ['1', '2']},
    
    {field :'spa', setter: 'set_spa', type : 'radio', options : ['1', '2']},
    
    {field :'community_facilities', setter: 'set_community_facilities', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_touristic_area', setter: 'set_distance_from_touristic_area', type : 'radio', options : ['1', '2']},
    
    {field :'parking_space', setter: 'set_parking_space', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_public_transportation', setter: 'set_distance_from_public_transportation', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_highway', setter: 'set_distance_from_highway', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_airport', setter: 'set_distance_from_airport', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_train_station', setter: 'set_distance_from_train_station', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_bus_station', setter: 'set_distance_from_bus_station', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_ferry_terminal', setter: 'set_distance_from_ferry_terminal', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_taxi_stand', setter: 'set_distance_from_taxi_stand', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_bike_rental', setter: 'set_distance_from_bike_rental', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_car_rental', setter: 'set_distance_from_car_rental', type : 'radio', options : ['1', '2']},
    
    {field :'lawn', setter: 'set_lawn', type : 'radio', options : ['1', '2']},
    
    {field :'landscaping', setter: 'set_landscaping', type : 'radio', options : ['1', '2']},
    
    {field :'garden', setter: 'set_garden', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_park', setter: 'set_distance_from_park', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_recreation_area', setter: 'set_distance_from_recreation_area', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_zoo', setter: 'set_distance_from_zoo', type : 'radio', options : ['1', '2']},
    
    {field :'view', setter: 'set_view', type : 'radio', options : ['1', '2']},
    
    {field :'security_features', setter: 'set_security_features', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_school', setter: 'set_distance_from_school', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_shopping_center', setter: 'set_distance_from_shopping_center', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_library', setter: 'set_distance_from_library', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_hospital', setter: 'set_distance_from_hospital', type : 'radio', options : ['1', '2']},
    
    {field :'distance_from_pharmacy', setter: 'set_distance_from_pharmacy', type : 'radio', options : ['1', '2']},
]

const states = {}

// open a file called form
const form = fs.openSync('form.js', 'w');



for (let field of form_fields) {
    const name = field.field;
    const setter = field.setter;
    // write const [name, setter] = useState(null);
    // fs.write(form, `const [${name}, ${setter}] = useState(null);\n`,
    //     (err, written, string) => {
    //         if (err) throw err;
    //         // console.log(written, string);   
    //     });   
}

// write the form
fs.write(form, `\n\n\n`, (err, written, string) => {
    if (err) throw err;
    // console.log(written, string);
});


let groupNr = 0;

const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );

const caps = str =>
        // insert a space before all caps
        str.replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); })



for (let field of form_fields) {
    const name = field.field;
    const setter = field.setter;
    const type = field.type;
    const options = field.options;
    // write the form
    const norm = caps(snakeToCamel(name));
    const one = `<Form.Label>${norm}</Form.Label>\n`;
    const two = `<Form.Control as="${type}" placeholder="Enter the ${norm}" onChange={(e) => ${setter}(e.target.value)}>\n`;

    const arr = [];


    for (let option of options) {
        arr.push(`<Form.Check type="${type}" label="${caps(snakeToCamel(option))}" value={${field.field}} onChange={${setter}} name="group-${groupNr}"/>\n`);
    }
    groupNr++;
    
    fs.write(form,
        one + two + arr.join('') +
        `</Form.Control>\n\n`,
        (err, written, string) => {
            if (err) throw err;
            // console.log(written, string);
        }
    );
}


fs.close(form, (err) => {
    if (err) throw err;
    console.log('file closed');
});