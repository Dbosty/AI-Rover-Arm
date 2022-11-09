from constants.arm_constants import ArmConstants
from adafruit_servokit import ServoKit 
from utils.servo import Servo

import json

class ArmContainer():
    
    kit = None

    waist = None
    shoulder = None
    elbow = None

    wrist = None
    end_effector = None

    def __init__(self):
        self.kit = ServoKit(channels=16)

        self.waist = Servo(self.kit, ArmConstants.WAIST_CHANNEL, ArmConstants.WAIST_MIN_PULSE, ArmConstants.WAIST_MAX_PULSE, ArmConstants.WAIST_REST_ANGLE)
        self.shoulder = Servo(self.kit, ArmConstants.SHOULDER_CHANNEL, ArmConstants.SHOULDER_MIN_PULSE, ArmConstants.SHOULDER_MAX_PULSE, ArmConstants.SHOULDER_REST_ANGLE)
        self.elbow = Servo(self.kit, ArmConstants.ELBOW_CHANNEL, ArmConstants.ELBOW_MIN_PULSE, ArmConstants.ELBOW_MAX_PULSE, ArmConstants.ELBOW_REST_ANGLE)

        self.wrist = Servo(self.kit, ArmConstants.WRIST_CHANNEL, ArmConstants.WRIST_MIN_PULSE, ArmConstants.WRIST_MAX_PULSE, ArmConstants.WRIST_REST_ANGLE)
        self.end_effector = Servo(self.kit, ArmConstants.END_EFFECTOR_CHANNEL, ArmConstants.END_EFFECTOR_MIN_PULSE, ArmConstants.END_EFFECTOR_MAX_PULSE, ArmConstants.END_EFFECTOR_REST_ANGLE)
        
    def save_current_position(self, name):
        # Data to be written
        dictionary = {
            "rear_shoulder_left": self.nectarine_container.rear_left_limb.shoulder.get_angle(),
            "rear_leg_left": self.nectarine_container.rear_left_limb.leg.get_angle(),
            "rear_feet_left": self.nectarine_container.rear_left_limb.feet.get_angle(),
            "rear_shoulder_right": self.nectarine_container.rear_right_limb.shoulder.get_angle(),
            "rear_leg_right": self.nectarine_container.rear_right_limb.leg.get_angle(),
            "rear_feet_right": self.nectarine_container.rear_right_limb.feet.get_angle(),
            "front_shoulder_left": self.nectarine_container.front_left_limb.shoulder.get_angle(),
            "front_leg_left": self.nectarine_container.front_left_limb.leg.get_angle(),
            "front_feet_left": self.nectarine_container.front_left_limb.feet.get_angle(),
            "front_shoulder_right": self.nectarine_container.front_right_limb.shoulder.get_angle(),
            "front_leg_right": self.nectarine_container.front_right_limb.leg.get_angle(),
            "front_feet_right": self.nectarine_container.front_right_limb.feet.get_angle(),
            
        }

        filename = name + ".json"
        
        with open(filename, "w") as outfile:
            json.dump(dictionary, outfile)
    
    def apply_to_every_joint(self, func):
        func(self.waist)
        func(self.shoulder)
        func(self.elbow)
        func(self.wrist)
        func(self.end_effector)