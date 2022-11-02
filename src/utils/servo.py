import time
import threading

class Servo():

    servo_kit = None
    pin = None
    min_pulse = None
    max_pulse = None
    rest_angle = None

    def __init__(self, servo_kit, pin, min_pulse, max_pulse, rest_angle):
        self.servo_kit = servo_kit
        self.pin = pin
        self.min_pulse = min_pulse
        self.max_pulse = max_pulse
        self.rest_angle = rest_angle
        self.servo_kit.servo[pin].set_pulse_width_range(min_pulse, max_pulse)

    def go_to(self, angle, isBoot = False):
        # if(not isBoot):
        #     t1 = threading.Thread(target=self.servo_easing, args=(angle,))
        #     t1.start()
        # else:
        self.servo_kit.servo[self.pin].angle = angle
            
    def servo_easing(self, angle):
        ease_speed = 0.1
        num_ease_slices = 50
        secs = 0.05
        for i in range(num_ease_slices):
            self.servo_kit.servo[self.pin].angle += (angle - self.get_angle()) * ease_speed
            time.sleep(secs/num_ease_slices)

    def go_to_rest_angle(self):
        self.go_to(self.rest_angle)

    def get_angle(self):
        return self.servo_kit.servo[self.pin].angle
    
    def increase_angle_by(self, difference):
        self.go_to((int(self.get_angle()) + difference), True)
                   
    def decrease_angle_by(self, difference):
        self.go_to((int(self.get_angle()) - difference), True)