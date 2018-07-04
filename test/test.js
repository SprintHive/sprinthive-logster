const logger1 = require("../src/index");
const logger2 = require("../src/index");

const log1 = logger1({meta: {appName: "Fred"}});
const log2 = logger2();

log1.debug("Testing 123");
log2.debug("Testing 456");

log1.silly("This is silly");
log2.debug("This is a debug");
log1.verbose("This is a verbose message");
log2.info("This is a info message");
log1.warn("This is a warning");
log2.error("This is a error");
