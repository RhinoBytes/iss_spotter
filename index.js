const { fetchMyIp, fetchCoordsByIP } = require('./iss');


fetchMyIp((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("It didn't work", error);
      return;
    }
    console.log('It worked! returned coordinates: ', data);
  });
});



