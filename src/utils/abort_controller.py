import signal
import RPi.GPIO as GPIO
import sys
from utils.log import Logger

log = Logger().setup_logger('Abort controller')

class AbortController:
    gpio_port = None

    def __init__(self, gpio_port):

        try:
            
            self.gpio_port = gpio_port

            log.debug('Starting controller...')

            signal.signal(signal.SIGINT, self.exit_gracefully)
            signal.signal(signal.SIGTERM, self.exit_gracefully)

            GPIO.setmode(GPIO.BCM)
            GPIO.setup(self.gpio_port, GPIO.OUT)

            self.abort()


        except Exception as e:
            log.error('Abort controller initialization problem', e)
            try:
                self.abort()
            finally:
                sys.exit(1)

    def exit_gracefully(self, signum, frame):
        try:
            self.abort()
        finally:
            log.info('Terminated')
            sys.exit(0)

    def do_process_events_from_queue(self):

        try:
            while True:
                event = self._abort_queue.get()

                if event == queues.ABORT_CONTROLLER_ACTION_ACTIVATE:
                    self.activate_servos()

                if event == queues.ABORT_CONTROLLER_ACTION_ABORT:
                    self.abort()

        except Exception as e:
            log.error('Unknown problem while processing the queue of the abort controller', e)
            sys.exit(1)

    def activate_servos(self):
        GPIO.output(self.gpio_port, GPIO.LOW)

    def abort(self):
        GPIO.output(self.gpio_port, GPIO.HIGH)
