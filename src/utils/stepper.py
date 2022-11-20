from adafruit_motorkit import MotorKit
from adafruit_motor import stepper
import time 
import board 

class Stepper():
  
  
  kit = None 
  stepper1 = None 
  stepper2 = None
  
  # MotorKit()
  ##  PARAMS:
  ###   address (int) – I2C address of PCA9685 PWM controller. Default address is 0x60.
  ###   i2c (busio.I2C) –
  ###   I2C bus object to use. If not specified, use board.I2C().
  
  # stepper1
  ##  PARAMS:
  ###   direction = { BACKWARDS / FORWARDS }
  ###   style = { SINGLE / DOUBLE / INTERLEAVE / MIRCROSTEP }
  ###   release() --> releases coils so motor spins freely
  
  
  def __init__(self, kit, stepper1, stepper2):
    self.kit = MotorKit(...)
    self.stepper1 = stepper1
    self.stepper2 = stepper2
    
   
  def go_to_pos(self):
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

