require("dotenv").config();

const keys = require('./keys')
const Spotify = require('node-spotify-api');
const request = require("request");
const moment = require("moment");
const fs = require("fs");
let [, , command, ...args] = process.argv
let queryName = args.join(" ");
const spotify = new Spotify(keys.spotify);

switch (command) {
    case "spotify-this-song":
        song();
        break;
    case "concert-this":
        concert();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doWhat();
        break;
}

function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        const data1 = data.split(", ")
        command = data1[0];
        queryName = data1[1];
        switch (command) {
            case "spotify-this-song":
                song();
                break;
            case "concert-this":
                concert();
                break;
            case "movie-this":
                movie();
                break;
        }
    });
}

function movie() {
    if (queryName === "") {
        queryName = "Mr.Nobody"
    }
    request("http://www.omdbapi.com/?t=" + queryName + "&y=&plot=short&" + keys.OMDb.link, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(`Title of the movie: ${data.Title}`);
        console.log(`Year: ${data.Year}`);
        console.log(`IMDb Rating: ${data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating of the Movie: ${data.Ratings[1].Value}`);
        console.log(`Country where the movie was produced: ${data.Country}`);
        console.log(`Language: ${data.Language}`);
        console.log(`Plot: ${data.Plot}`);
        console.log(`Actors: ${data.Actors}`);
    });
}

function concert() {
    request("https://rest.bandsintown.com/artists/" + queryName + "/events?app_id=codingbootcamp", function (error, response, body) {
        var data = JSON.parse(body);
        console.log(`Venue name: ${data[0].venue.name}`);
        console.log(`Location: ${data[0].venue.city},${data[0].venue.region}`)
        console.log(`Date of the event: ${moment(data[0].datetime).format("MM/DD/YYYY")}`);
    });
}

function song() {
    if (queryName === "") {
        queryName = "The Sing Ace of Base"
    }
    spotify.search({
        type: 'track',
        query: queryName
    })
        .then((response) => {
            {
                var data = response.tracks.items[0];
                console.log(`Song's name: ${data.name}`);
                console.log(`Artist: ${data.album.artists[0].name}`);
                console.log((`Album's name: ${data.album.name}`));
                console.log(`Preview: ${data.preview_url}`);
            }
        })
        .catch((err) => {
            {
                console.log(err);
            }
        });
}