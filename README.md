# sprinthive-logster

The intention of this package is to be used internally at SprintHive, 
to send log messages to a fluentd deamon over TCP.

This project makes it easy to send extra meta data along with every 
log message.

## Basic Usage

By default sprinthive-logster only prints out to the console.

    mkdir logster-usage-test
    cd logster-usage-test
                  
    npm i sprinthive-logster
    
    # create index.js file with the following contents
    const logster = require("sprinthive-logster");
    const log = logster();
    log.debug("Hellow world!");

    # run the app       
    node basic.js 
    # this will output
    > debug: Hello world!

To enable the sending of logs to a TCP socket and sending extra metadata, try the following:

    # create testTcp.js file with the following contents
    const logster = require("sprinthive-logster");
    const log = logster({tcpEnabled: true, meta: {appName: "UsageTest"}});
    
    log.debug("Hello world!");
    
To run it open one terminal and use net cat to receive the tcp data. 
    
    nc -l 5710
    
Then run the testTcp.js

    node testTcp.js   
    
    # The log message Hello World! is sent to the console and the TCP socket.
    # On the console you will see
    debug: Hello world! appName=UsageTest

    # In the net cat console you should see
    {"appName":"UsageTest","level":"debug","message":"Hello world!","label":"winston"}