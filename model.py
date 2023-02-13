import streamlit as st

from system_types import Property

def set_all_states():
    if not hasattr(st.session_state, 'property'):
        st.session_state.property = Property()

    if not hasattr(st.session_state, 'state'):
        st.session_state.state = 'gather_rooms'

def add_rooms_to_property():
    for room in st.session_state.rooms.values():
        st.session_state.property.add_room(room)

def add_outdoor_spaces_to_property():
    for outdoor_space in st.session_state.outdoor_spaces.values():
        st.session_state.property.add_outdoor_space(outdoor_space)

def add_kitchen_to_property():
    st.session_state.property.kitchen = st.session_state.kitchen