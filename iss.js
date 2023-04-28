/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');


const fetchMyIp = function(callback) {
  request.get('https://api64.ipify.org?format=json', function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request.get(`http://ipwho.is/${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    const JSONBody = JSON.parse(body);
    if (!JSONBody.success) {
      const msg = `Success status was ${JSONBody.success}. Server message says: ${JSONBody.message} when fetching for IP ${JSONBody.ip}`;
      callback(error(msg), null);
      return;
    }
    const {latitude, longitude} = JSONBody;
    callback(null, {latitude, longitude});

  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request.get(URL, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};



module.exports = { nextISSTimesForMyLocation };


// import request library
// create fetchMyIp function that takes a callback
// use request.get for the ipify website for Json
// write if statement for an error
// convert the body to a JSON object and store it in a variable
// assign the value of data.ip to a new variable
//callback(null, ip)