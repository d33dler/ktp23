from enum import Enum


class Room:
    def __init__(self, name, area, length, width, private):
        self.name = name
        self.area = area
        self.length = length
        self.width = width
        self.private = private


class OutDoor:
    def __init__(self, name, area, length, width, private):
        self.number = None
        self.private = private
        self.area = area
        self.length = length
        self.width = width
        self.name = name


class LivingRoom(Room):
    def __init__(self):
        super().__init__()

class Bedroom(Room):
    def __init__(self):
        super().__init__()

class Bathroom(Room):
    def __init__(self):
        super().__init__()

class Kitchen(Room):
    def __init__(self, name, area, length, width, private, dishwasher_ready):
        super().__init__(name, area, length, width, private)
        self.dishwasher_ready = dishwasher_ready


class EnergyTag(Enum):
    A = 1
    B = 2
    C = 3
    D = 4
    E = 5
    F = 6
    G = 7


class Property:
    def __init__(self):
        self.rooms = []
        self.outdoor_spaces = []

        self.kitchen = None
        self.living_room = None
        self.bedroom = None
        self.bathroom = None

        self.energy_performance = None

        self.distance_to_city_center = None

    def add_room(self, room):
        self.rooms.append(room)
    
    def add_outdoor_space(self, outdoor_space):
        self.outdoor_spaces.append(outdoor_space)
    
    def get_rooms(self):
        return self.rooms