const request = require('request-promise-native');

const fetchMyIp = function() {
  return request('https://api64.ipify.org?format=json');
}
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
}

const fetchISSFlyOverTimes = function(body) {
  const { longitude, latitude } = JSON.parse(body);
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(URL);
}

const nextISSTimesForMyLocation = function(body) {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const response = JSON.parse(data);
      return response;
    })

  }


module.exports = {nextISSTimesForMyLocation};