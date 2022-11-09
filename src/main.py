from utils.log import Logger
from flask import Flask, render_template, request, redirect, url_for

import arm
import time

log = Logger().setup_logger('Main')
arm = arm.Arm()
app = Flask(__name__, static_folder="/home/pi/ai_rover_arm/templates/static")

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    log.info('Nectarine starting...')

    try:
        arm.boot_pos()
        app.run(host='0.0.0.0', port=80, debug=True)

    except KeyboardInterrupt:
        log.info('Terminated due Control+C was pressed')

    else:
        log.info('Normal termination')

