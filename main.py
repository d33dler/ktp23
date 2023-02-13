from statistics import mode
import streamlit as st
import view
import model

st.set_page_config(
    page_title='RetinaNet',
    layout='wide'
)

model.set_all_states()

view.show_title()

if st.session_state.state == 'gather_rooms':
    print('gather rooms')
    view.show_gather_rooms()

if st.session_state.state == 'gather_outdoor_spaces':
    # add the rooms to the property
    model.add_rooms_to_property()
    view.show_gather_outdoor_spaces()

if st.session_state.state == 'gather_kitchen':
    model.add_outdoor_spaces_to_property()
    view.show_gather_kitchen()

if st.session_state.state == 'gather_bathroom':
    model.add_kitchen_to_property()
    view.show_gather_bathroom()