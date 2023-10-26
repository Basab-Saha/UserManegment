const fs = require("fs");

function logReqRes(fileName) {
    return (req, res, next) => {
        fs.appendFile(fileName, `\n ${Date.now()} : ${req.method} : ${req.path} `, (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            }
            next(); // Call next() inside the callback to continue the middleware chain
        });
    }
}

module.exports = logReqRes; // Export the function directly, not wrapped in an object

