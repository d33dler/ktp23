const fs  = require('fs');


function range (start, end, step = 10) {
    const array = [];

    for (let i = start; i <= end; i += step) {
        if (i === 0) {
            array.push('1');
            continue;  
        }
        // add i but as a string
        array.push(i.toString());
    }
    return array;
}


function distance (start, end, values = [],  step = 10) {
    let array = [];
    for (let i = start; i <= end; i += step) {
        if (i === 0) {
            array.push('<=1');
            continue;  
        }
        // add i but as a string
        array.push('<=' + i.toString());
    }
    array.push('>' + end.toString());
    return array;
}


const form_fields = [
    
    {field :'area_sqm', labels : ['<=1', '<=10', '<=20', '<=30', '<=40', '<=50', '>50'], options : ['1', '10', '20', '30', '40', '50', '60']},
    
    {field :'property_location', options : ['Amsterdam', 'Groningen', 'Rotterdam', 'Other']},
    
    {field :'distance_to_city', labels : ['<=2', '<=5', '<=6', '>6'], options : ['2', '5', '6', '7']},
    
    {field :'population', options : ['1E6', '1E6']},
    
    {field :'property_type', options : ['room', 'apartment', 'anti-squat', 'studio', 'student-residence', 'house', 'other']},
    
    {field :'furnished',  options : ['yes', 'no']},
    
    {field :'shower', options : ['private', 'shared']},
    
    {field :'toilet', options : ['private', 'shared']},
    
    {field :'living_room', options : ['private', 'shared']},
    
    {field :'living_capacity', labels : ['1', '2', '3', '4', '5', '>5'], options : ['1', '2', '3', '4', '5', '6']},
    
    {field :'internet', options : ['yes', 'no']},
    
    {field :'energy_label', options : ['A', 'B', 'C', 'D', 'E']},
    
    {field :'roommates', labels: ['1', '2', '3', '4', '5', '>5'], options : ['1', '2', '3', '4', '5', '6']},
    
    {field :'problematic_neighbors', options : ['yes', 'no']},
    
    {field :'air_quality', options : ['good', 'average', 'bad']},
    
    {field :'nearby_disturbances', options : ['yes', 'no']},
    
    {field :'apartment_facing', labels : ['sunrise', 'sunset', 'partial sun', 'shadowed', 'fully shadowed'], options : ['sunrise', 'sunset', 'partial_sun', 'shadowed', 'fully_shadowed']},
    
    {field :'balcony_access', options : ['yes', 'no']},
    
    {field :'pets_allowed', options : ['yes', 'no']},
    
    {field :'landlord_tenant_ages', options : ["16-25", "16-60", "18-60"]},
    
    {field :'near_public_transportation', options : ['yes', 'no']},
    
    {field :'parking_availability', options : ['private', 'street', 'none']},
    
    {field :'garden_or_terrace', options : ['yes', 'no']},
    
    {field :'distance_from_schools', labels : ['<=8', '>8'], options : ['8', '9']},
    
    {field :'distance_from_hospital', labels : ['<=8', '>8'], options : ['8', '9']},
    
    {field :'security', options : ['yes', 'no']},
    
    {field :'management_fee', options : ['yes', 'no']},
    
    {field :'quality_of_construction', options : ['high', 'mid', 'low']},
    
    {field :'renovation_date', labels : ['<5 years', '<8 years', '>8 years'] , options : ['5', '8', '10']},
    
    {field :'flood_risk', options : ['yes', 'no']},
    
    {field :'earthquake_risk', options : ['yes', 'no']},
    
    {field :'distance_from_shops', labels : ['<=2', '>2'], options : ['2', '3']},
    
    {field :'distance_from_gym', labels : ['<=5', '>5'], options : ['5', '6']},
    
    {field :'sound_proof', options : ['yes', 'no']},
    
    {field :'storage', options : ['yes', 'no']},
    
    {field :'built_in_appliances', options : ['yes', 'no']},
    
    {field :'elevator', options : ['yes', 'no']},
    
    {field :'pool', options : ['yes', 'no']},
    
    {field :'sauna', options : ['yes', 'no']},
    
    {field :'jacuzzi', options : ['yes', 'no']},
    
    {field :'spa', options : ['yes', 'no']},
    
    {field :'community_facilities', options : ['yes', 'no']},
    
    {field :'distance_from_touristic_area', labels : ['<=3', '>3'], options : ['3', '4']},
    
    {field :'parking_space', options : ['garage', 'driveway', 'carport', 'none']},
    
    {field :'distance_from_public_transportation', labels : ['<=1', '>1'], options : ['1', '2']},
    
    {field :'distance_from_highway', labels : ['<=5', '>5'], options : ['5', '6']},
    
    {field :'distance_from_airport', labels : ['<=15', '>15'], options : ['15', '16']},
    
    {field :'distance_from_train_station', labels : ['<=3', '>3'], options : ['3', '4']},
    
    {field :'distance_from_bus_station', labels : ['<=2', '>2'], options : ['2', '3']},
    
    {field :'distance_from_ferry', labels : ['<=10', '>10'], options : ['10', '11']},
    
    {field :'distance_from_taxi_stand', labels : ['<=1', '>1'], options : ['1', '2']},
    
    {field :'distance_from_bike_rental', labels : ['<=1', '>1'], options : ['1', '2']},
    
    {field :'distance_from_car_rental', labels : ['<=3', '>3'], options : ['3', '4']},
    
    {field :'lawn', options : ['yes', 'no']},
    
    {field :'landscaping', options : ['yes', 'no']},
    
    {field :'garden', options : ['yes', 'no']},
    
    {field :'distance_from_park', labels : ['<=2', '>2'], options : ['2', '3']},
    
    {field :'distance_from_recreation_area', labels : ['<=5', '>5'], options : ['5', '6']},
    
    {field :'distance_from_zoo', labels : ['<=10', '>10'], options : ['10', '11']},
    
    {field :'view', options : ["city", "water", "park", "nature", "other",]},
    
    {field :'security_features', options : ["alarm", "surveillance", "guard", "none",]},
    
    {field :'distance_from_schools', labels : ['<=3', '>3'], options : ['3', '4']},
    
    {field :'distance_from_shopping_center', labels : ['<=2', '>2'], options : ['2', '3']},
    
    {field :'distance_from_library', labels : ['<=5', '>5'], options : ['5', '6']},
    
    {field :'distance_from_hospital', labels : ['<=8', '>8'], options : ['8', '9']},
    
    {field :'distance_from_pharmacy', labels : ['<=1', '>1'], options : ['1', '2']},
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
    const setter = `set_${name}`;
    let type = field.type;
    if (!type) {
        type = 'radio'
    }
    const options = field.options;
    // write the form
    const norm = caps(snakeToCamel(name));
    const one = `<>\n<Form.Label as='h1'>${norm}</Form.Label>\n`;
    const two = `<Form.Control as="${type}" placeholder="Enter the ${norm}" onChange={(e) => ${setter}(e.target.value)}>\n`;

    const arr = [];


    for (let index in options) {
        const option = options[index];
        let label = option;
        if (field.labels) {
            label = field.labels[index];
        }
        arr.push(`<Form.Check type="${type}" label="${caps(snakeToCamel(label))}" value="${option}" name="group-${groupNr}"/>\n`);
    }
    groupNr++;
    
    fs.write(form,
        one + two + arr.join('') +
        `</Form.Control>\n</>\n,\n`,
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