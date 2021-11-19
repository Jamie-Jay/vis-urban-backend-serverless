var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

/**
 * 
FeedEntity {
  id: 'MTABC_5370',
  vehicle: VehiclePosition {
    trip: TripDescriptor {
      tripId: '32006975-JKPD1-JK_D1-Weekday-41-SDon',
      startDate: '20211115',
      routeId: 'Q52+',
      directionId: 0
    },
    position: Position {
      latitude: 40.65245056152344,
      longitude: -73.8381118774414,
      bearing: 105.19525146484375
    },
    timestamp: Long { low: 1637007878, high: 0, unsigned: true },
    stopId: '553376',
    vehicle: VehicleDescriptor { id: 'MTABC_5370' }
  }
}

check out this posts to understand difference.

What is the difference between synchronous and asynchronous programming (in node.js)
https://stackoverflow.com/questions/16336367/what-is-the-difference-between-synchronous-and-asynchronous-programming-in-node

Synchronous vs Asynchronous code with Node.js
https://stackoverflow.com/questions/13858909/synchronous-vs-asynchronous-code-with-node-js
 */
function queryGTFSData(routeId, callback) {
  var requestSettings = {
    method: 'GET',
    url: 'http://gtfsrt.prod.obanyc.com/vehiclePositions?key=f7f071ba-962a-44ad-8074-d5d64c72ef6f',
    encoding: null
  };

  let data = []
  request(requestSettings, function (error, response, body) {
    if (error) {
      callback(error, null)
    }
    else if (response.statusCode == 200) {
      var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      console.log(feed.header.timestamp)
      feed.entity.forEach(function(entity) {
        if (entity.vehicle.trip) {
          if (routeId === 'ALL' || entity.vehicle.trip.routeId === routeId) {
            data.push(entity.vehicle)
          }
        }
      });

      callback(null, {
        timestamp: feed.header.timestamp.low,
        routeId: routeId,
        positions: data
      });
      // callback(null, JSON.stringify(data));
    }
  });
}

function queryGTFSExtra(callback) {
  var requestSettings = {
    method: 'GET',
    url: 'http://gtfsrt.prod.obanyc.com/tripUpdates?key=f7f071ba-962a-44ad-8074-d5d64c72ef6f',
    encoding: null
  };

  let data = []
  request(requestSettings, function (error, response, body) {
    if (error) {
      callback(error, null)
    }
    else if (response.statusCode == 200) {

      var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      console.log(feed)
      // data = feed
      feed.entity.forEach(function(entity) {
        // if (entity.vehicle.trip && entity.vehicle.trip.routeId === 'BX4') {
        //   data.push(entity.vehicle.trip)
        //   // console.log('data in: ', data)
        // }
        if (entity.tripUpdate) {
          console.log(entity.tripUpdate);
          data.push(entity.tripUpdate);
        }
      });

      callback(null, data);
      // callback(null, JSON.stringify(data));
    }
  });
}

module.exports = {
  queryGTFSData,
  queryGTFSExtra
}