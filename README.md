# sprinthive-logster

The intention of this package is to be used internally at SprintHive, 
to send log messages to a fluentd deamon over TCP.

This project makes it easy to send extra meta data along with every 
log message.
   
Feel free to use it if it works for you.

## Basic Usage

    npm i sprinthive-logster
    
    const logster = require("sprinthive-logster");
    const log = logster();
    log.debug("Hellow world!");

## Testing

    # Start a listener 