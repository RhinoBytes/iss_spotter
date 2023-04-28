const { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


fetchMyIp((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work", error);
      return;
    }
    console.log('It worked! returned coordinates: ', coords);
    fetchISSFlyOverTimes(coords, (error, passTimes) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log('It worked! Returned flyover times:', passTimes);
    });
  });

});



