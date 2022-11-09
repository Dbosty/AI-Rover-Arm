from arm_container import ArmContainer
from utils.servo import Servo


class Arm():

    arm_container = None
    
    def __init__(self):
        self.arm_container = ArmContainer()

    def boot_pos(self):
        self.arm_container.apply_to_every_joint(Servo.go_to_rest_angle)

        
    