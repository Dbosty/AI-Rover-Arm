/* Libraries */
#include "Servo.h"
// #include "IRremote.h"
#include "StepperMotor.h"
#include "Joystick.h"


/* Create IRremote Object */
const int receiver = 15;
IRrecv irrecv(receiver);
decode_results results;


/* Create Servo Objects */

// Servo Objects
Servo servo_1;
Servo servo_2;
Servo servo_3;
Servo servo_4;
Servo servo_5;
Servo servo_6;

// Servo Positions
int serv1Pos, serv2Pos, serv3Pos, serv4Pos, serv5Pos, serv6Pos;   //current
int serv1Ppos, serv2Ppos, serv3Ppos, serv4Ppos, serv5Ppos, serv6Ppos;   //previous

void setup() {
  // Where servos attach
  servo_1.attach(3);
  servo_2.attach(5);
  servo_3.attach(7);
  servo_4.attach(9);
  servo_5.attach(11);
  servo_6.attach(13);

  // Servo initial positions
  serv1Pos = 90;
  servo_1.write(serv1Pos);
  serv2Pos = 10;
  servo_2.write(serv2Pos);
  serv3Pos = 30;
  servo_3.write(serv3Pos);
  serv4Pos = 135;
  servo_4.write(serv4Pos);
  serv5Pos = 75;
  servo_5.write(serv5Pos);
  serv6Pos = 60;
  servo_6.write(serv6Pos);

  // Start the receiver
  irrecv.enableIRIn();
}

void loop() {
  if (irrecv.decode(&results)) { // have we received an IR signal?
    
    switch (results.value) {
      
        /* Servo 1 positioning, Base */ 
        case 0xFF22DD: // "FAST BACK" button pressed, Servo 1 goes CCW
                    serv1Ppos = serv1Pos;
                    if (serv1Pos == 0) {
                      Serial.println("Turn back!");
                      break;                        
                    } 
                    for (int pos = serv1Pos; pos >= serv1Ppos - 30; pos -= 1) {
                      servo_1.write(pos);
                      serv1Pos = pos;
                      delay(10);
                    }                                      
                    Serial.print("Servo 1 is at position: "); 
                    Serial.println(serv1Pos);                     
                    break;

                    
        case 0xFFC23D:  // "FAST FORWARD" button pressed, Servo 1 goes CW         
                    serv1Ppos = serv1Pos;
                    if (serv1Pos == 180) {
                      Serial.println("Turn back!");
                      break;
                    } 
                    for (int pos = serv1Pos; pos <= serv1Ppos + 30; pos += 1) {
                      servo_1.write(pos);
                      serv1Pos = pos;
                      delay(10);
                    }                                                             
                    Serial.print("Servo 1 is at position: "); 
                    Serial.println(serv1Pos);                     
                    break;

        /* Servo 2 Positioning, Shoulder */            
        case 0xFFA857: // "VOL-" button pressed, Servo 2 goes down 
                    serv2Ppos = serv2Pos;
                    if (serv2Pos == 60) {
                      Serial.println("Turn back!");
                      break;                        
                    }
                    for (int pos = serv2Pos; pos >= serv2Ppos - 30; pos -= 1) {
                        servo_2.write(pos);
                        serv2Pos = pos;
                        delay(10);
                    }
                    Serial.print("Servo 2 is at position: "); 
                    Serial.println(serv2Pos);                     
                    break; 
                    
                                                          
        case 0xFF629D: // "VOL+" button pressed, Servo 2 goes up            
                    serv2Ppos = serv2Pos;
                    if (serv2Pos == 150) {
                      Serial.println("Turn back!");
                      break;                       
                    }
                    for (int pos = serv2Pos; pos <= serv2Ppos + 30; pos += 1) {
                        servo_2.write(pos);
                        serv2Pos = pos;
                        delay(10);
                    }
                    Serial.print("Servo 2 is at position: "); 
                    Serial.println(serv2Pos);                     
                    break; 

        /* Servo 3 Positioning, Elbow */             
        case 0xFFE01F: // "DOWN" button pressed, Servo 3 goes down 
                    serv3Ppos = serv3Pos;
                    if (serv3Pos == 0) {
                      Serial.println("Turn back!");
                      break;                        
                    }
                    for (int pos = serv3Pos; pos >= serv3Ppos - 30; pos -= 1) {
                        servo_3.write(pos);
                        serv3Pos = pos;
                        delay(10);
                    }
                    Serial.print("Servo 3 is at position: "); 
                    Serial.println(serv3Pos);                     
                    break; 
                    
                                                          
         case 0xFF906F: // "UP" button pressed, Servo 3 goes up         
                    serv3Ppos = serv3Pos;
                    if (serv3Pos == 150) {
                      Serial.println("Turn back!");
                      break;                       
                    }
                    for (int pos = serv3Pos; pos <= serv3Ppos + 30; pos += 1) {
                        servo_3.write(pos);
                        serv3Pos = pos;
                        delay(10);
                    }
                    Serial.print("Servo 3 is at position: "); 
                    Serial.println(serv3Pos);                     
                    break; 

                   
        /* Servo 4 Positioning, Wrist Lateral */             
        case 0xFF30CF: // "1"  button pressed, Servo 4 goes down
                    serv4Ppos = serv4Pos;
                    if (serv4Pos == 60) {
                      Serial.println("Turn back!");
                      break;                        
                    }
                    for (int pos = serv4Pos; pos >= serv4Ppos - 30; pos -= 1) {
                        servo_4.write(pos);
                        serv4Pos = pos;
                        delay(10);
                    }
                    Serial.print("Servo 4 is at position: "); 
                    Serial.println(serv4Pos);                     
                    break; 
                    
                                                          
        case 0xFF6897: // "0" button pressed, Servo 4 goes up          
                    serv4Ppos = serv4Pos;
                    if (serv4Pos == 150) {
                      Serial.println("Turn back!");
                      break;                       
                    }
                    for (int pos = serv4Pos; pos <= serv4Ppos + 30; pos += 1) {
                        servo_4.write(pos);
                        serv4Pos = pos;
                        delay(10);
                    }
                    Serial.print("Servo 4 is at position: "); 
                    Serial.println(serv4Pos);                     
                    break; 

        /* Servo 5 Positioning, Wrist Rotational */ 
        case 0xFF18E7: // "2" button pressed, Servo 5 goes CCW
                    serv5Ppos = serv5Pos;
                    if (serv5Pos == 60) {
                      Serial.println("Turn back!");
                      break;                        
                    }
                    for (int pos = serv5Pos; pos >= serv5Ppos - 30; pos -= 1) {
                        servo_5.write(pos);
                        serv5Pos = pos;
                        delay(10);
                    }
                    Serial.print("Servo 5 is at position: "); 
                    Serial.println(serv5Pos);                     
                    break; 

         case 0xFF7A85: // "3" button pressed, Servo 5 goes CW 
                    serv5Ppos = serv5Pos;
                    if (serv5Pos == 120) {
                      Serial.println("Turn back!");
                      break;
                    }
                    for (int pos = serv5Pos; pos <= serv5Ppos; pos += 1) {
                      servo_5.write(pos);
                      serv5Pos = pos;
                      delay(10);
                    }
                    Serial.print("Servo 5 is at position: ");
                    Serial.println(serv5Pos);
                    break;

         case 0xXXXXXX: // "4" button pressed, Servo 6 goes CCW
                    servo6Ppos = serv6Pos;
                    if (serv6Pos == 60) {
                      Serial.println("Turn back!");
                      break;
                    }
                    for (int pos = serv6Pos; pos <= serv6Ppos; pos -= 1) {
                      servo_6.write(pos);
                      serv6Pos = pos;
                      delay(10);
                    }
                    Serial.print("Servo 6 is at postion: ");
                    Serial.println(serv6Pos);
                    break;
    }
    irrecv.resume();
  }
}