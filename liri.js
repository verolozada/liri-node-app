// Bands in Town API 173f2037f8ffa320da5b8b977724a13

// OMDb request link 
require("dotenv").config();

const keys = require('./keys')
const Spotify = require('node-spotify-api');
const request = require("request");
const moment = require("moment");
const fs = require("fs");


const [, , command, ...args] = process.argv
const queryName = args.join(" ");

const spotify = new Spotify(keys.spotify);


if (command === "spotify-this-song"){
spotify.search({
    type: 'track',
    query: queryName
})
    .then((response) => {
        {   
            console.log(`Name: ${response.tracks.items[0].name}`);
            console.log(`Artist: ${response.tracks.items[0].album.artists[0].name}`);
            console.log((`Album's name: ${response.tracks.items[0].album.name}`));
            console.log(`Link: ${response.tracks.items[0].preview_url}`);
        }
    })
    .catch((err) => {
        {
            console.log(err);
        }
    });
}


// request("https://rest.bandsintown.com/artists/" + queryName + "/events?app_id=codingbootcamp", function (error, response, body) {
// //   console.log(JSON.parse(body));
//   var data = JSON.parse(body);
//   console.log(moment(data[0].datetime).format("MM/DD/YYYY"));
// });


// request("http://www.omdbapi.com/?t=" + queryName + "&y=&plot=short&" + keys.OMDb.link, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

