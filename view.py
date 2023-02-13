import streamlit as st
from system_types import Room, OutDoor, Kitchen

def show_title():
    st.title(':house: RetinaNet :dollar:')
    st.write('''
        This is a demo for our expert for rental property valuation.
        ''')
    st.markdown('''
        ---
        ''')



def show_gather_rooms():
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.write('''
            Enter the number of rooms in your property. Please exclude the kitchen, living room, bathroom and bedroom.
            For these rooms, you will be asked for more details later.
            ''')
        number_of_rooms = st.number_input('Number of rooms', min_value=0, max_value=100, value=0, step=1)
        st.write('''You have entered: ''', number_of_rooms, ''' rooms.''')
        
        # add a button to go to the next step
        if st.button('Next'):
            st.session_state.state = 'gather_outdoor_spaces'
            st.experimental_rerun()


    with col2:
        if not hasattr(st.session_state, 'rooms'):
            st.session_state.rooms = {}
    
        # get the number of rooms in the session_state.rooms dictionary
        number_of_rooms_in_session_state = len(st.session_state.rooms)
    
        # while the number of rooms in the session_state.rooms dictionary is bigger than the number of rooms entered by the user
        # delete the last room from the session_state.rooms dictionary
        while number_of_rooms_in_session_state > number_of_rooms:
            del st.session_state.rooms[f'room_{number_of_rooms_in_session_state - 1}']
            number_of_rooms_in_session_state -= 1
        
        # now for every room add a section where you ask for the name, length and width
        for i in range(number_of_rooms):
            st.write(f'Room {i + 1}')
            name = st.text_input('Name of the room', key=f'room_{i}_name', help='This is the name of the room. It is used to identify the room in the report.')
            if name == '':
                name = f'Room {i + 1}'

            length = st.number_input(f'Length of `{name}`', min_value=0.0, max_value=1000.0, value=0.0, step=0.1, key=f'room_{i}_length', help='This is the length of the room in meters. It is used to calculate the area of the room.')
            width = st.number_input(f'Width of `{name}`', min_value=0.0, max_value=1000.0, value=0.0, step=0.1, key=f'room_{i}_width', help='This is the width of the room in meters. It is used to calculate the area of the room.')
            # add a disabled input box for the area and plug in the area calculation
            area = st.number_input(f'Area of `{name}`', min_value=0.0, max_value=1000000.0, value=length * width, step=0.1, disabled=True, key=f'room_{i}_area', format='%.2f', help='This is the area of the room in square meters. It is calculated from the length and width.')
            # add a private checkbox with some help text
            private = st.checkbox(f'Private ?', key=f'room_{i}_private', help='Is this room private or shared with other tenants?')

            room = Room(name, area, length, width, private)
            st.session_state.rooms[f'room_{i}'] = room
            
            st.markdown('---')

    
def show_gather_outdoor_spaces():
    col1, col2 = st.columns(2)

    with col1:
        # remove the previous elements from the page
        st.write('''
            Enter the number of outdoor spaces in your property.
            ''')
        number_of_outdoor_spaces = st.number_input('Number of outdoor spaces', min_value=0, max_value=100, value=0, step=1)
        st.write('''You have entered: ''', number_of_outdoor_spaces, ''' outdoor spaces.''')
        # add a button to go to the next step
        if st.button('Next'):
            st.session_state.state = 'gather_kitchen'
            st.experimental_rerun()
    
    with col2:
        if not hasattr(st.session_state, 'outdoor_spaces'):
            st.session_state.outdoor_spaces = {}
    
        # get the number of outdoor spaces in the session_state.outdoor_spaces dictionary
        number_of_outdoor_spaces_in_session_state = len(st.session_state.outdoor_spaces)
    
        # while the number of outdoor spaces in the session_state.outdoor_spaces dictionary is bigger than the number of outdoor spaces entered by the user
        # delete the last outdoor space from the session_state.outdoor_spaces dictionary
        while number_of_outdoor_spaces_in_session_state > number_of_outdoor_spaces:
            del st.session_state.outdoor_spaces[f'outdoor_space_{number_of_outdoor_spaces_in_session_state - 1}']
            number_of_outdoor_spaces_in_session_state -= 1
        
        # now for every outdoor space add a section where you ask for the name, length and width
        for i in range(number_of_outdoor_spaces):
            st.write(f'Outdoor space {i + 1}')
            name = st.text_input('Name of the outdoor space', key=f'outdoor_space_{i}_name', help='This is the name of the outdoor space. It is used to identify the outdoor space in the report.')
            if name == '':
                name = f'Outdoor space {i + 1}'

            length = st.number_input(f'Length of `{name}`', min_value=0.0, max_value=1000.0, value=0.0, step=0.1, key=f'outdoor_space_{i}_length', help='This is the length of the outdoor space in meters. It is used to calculate the area of the outdoor space.')
            width = st.number_input(f'Width of `{name}`', min_value=0.0, max_value=1000.0, value=0.0, step=0.1, key=f'outdoor_space_{i}_width', help='This is the width of the outdoor space in meters. It is used to calculate the area of the outdoor space.')
            # add a disabled input box for the area and plug in the area calculation
            area = st.number_input(f'Area of `{name}`', min_value=0.0, max_value=1000000.0, value=length * width, step=0.1, disabled=True, key=f'outdoor_space_{i}_area', format='%.2f', help='This is the area of the outdoor space in square meters. It is calculated from the length and width.')
            # add a private checkbox with some help text
            private = st.checkbox(f'Private ?', key=f'outdoor_space_{i}_private', help='Is this outdoor space private or shared with other tenants?')

            outdoor_space = OutDoor(name, area, length, width, private)
            st.session_state.outdoor_spaces[f'outdoor_space_{i}'] = outdoor_space

            st.markdown('---')



def show_gather_kitchen():
    # assume that there can only be one kitchen
    # so we don't need to ask for the number of kitchens, but we can just add a section where you ask for the name, length and width
    st.write(f'Kitchen')
    # put the name of the kitchen as "Kitchen"
    name = "Kitchen"
    length = st.number_input(f'Length of `{name}`', min_value=0.0, max_value=1000.0, value=0.0, step=0.1, key=f'kitchen_length', help='This is the length of the kitchen in meters. It is used to calculate the area of the kitchen.')
    width = st.number_input(f'Width of `{name}`', min_value=0.0, max_value=1000.0, value=0.0, step=0.1, key=f'kitchen_width', help='This is the width of the kitchen in meters. It is used to calculate the area of the kitchen.')
    # add a disabled input box for the area and plug in the area calculation
    area = st.number_input(f'Area of `{name}`', min_value=0.0, max_value=1000000.0, value=length * width, step=0.1, disabled=True, key=f'kitchen_area', format='%.2f', help='This is the area of the kitchen in square meters. It is calculated from the length and width.')
    # add a private checkbox with some help text
    private = st.checkbox(f'Private ?', key=f'kitchen_private', help='Is this kitchen private or shared with other tenants?')

    dishwasher_ready = st.checkbox(f'Dishwasher ready ?', key=f'kitchen_dishwasher_ready', help='Is this kitchen dishwasher ready?')

    kitchen = Kitchen(name, area, length, width, private, dishwasher_ready)
    st.session_state.kitchen = kitchen

    st.markdown('---')

    # add a button to go to the next step
    if st.button('Next'):
        st.session_state.state = 'gather_bathroom'
        st.experimental_rerun()


            
def show_gather_bathroom():
    # TODO