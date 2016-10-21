var request = require('request');
var moment = require('moment')

//Add anything you want. 
//Just kidding. Must start with https://www.meetup.com/
//Do it for the vine.
var listOfWebsites =
    `
https://www.meetup.com/mtlecommerce/
http://www.meetup.com/Docker-Montreal/
http://www.meetup.com/Sidechain-Ethereum-Blockchain/
http://www.meetup.com/Montreal-Bleu-Blanc-Tech/
http://www.meetup.com/Bitcoin-Embassy/ 
http://www.meetup.com/mtlnewtech/
http://www.meetup.com/msdevmtl/
http://www.meetup.com/MTL-Machine-Learning/
http://www.meetup.com/LogicielLibre/
http://www.meetup.com/Mentors-Montreal-Meetup/
http://www.meetup.com/Haskellers-Montreal-Meetup/
http://www.meetup.com/pitonneux/
http://www.meetup.com/The-Entrepreneurs-Journey/
http://www.meetup.com/Monteal-MedTech-Network/
http://www.meetup.com/mtldata/ 
http://www.meetup.com/MontrealSemanticWebMeetup/
http://www.meetup.com/Agile-Growth-Montreal/
http://www.meetup.com/HTML5mtl/
http://www.meetup.com/Drupal-Montreal/
http://www.meetup.com/PyLadiesMTL/
http://www.meetup.com/HacksHackersMontreal/
http://www.meetup.com/montreal-jug/
http://www.meetup.com/Papers-We-Love-Montreal/
http://www.meetup.com/Drupal-Montreal/
http://www.meetup.com/DIYBio-Montreal/
http://www.meetup.com/Odoo-Montreal/
http://www.meetup.com/GolangMontreal/
http://www.meetup.com/GDG-Montreal-Android/
http://www.meetup.com/ProductHuntMTL/
http://www.meetup.com/swift-mtl/
http://www.meetup.com/Mentors-Montreal-Meetup/
http://www.meetup.com/protohack-montreal/
http://www.meetup.com/Growth-Hacking-Montreal/
http://www.meetup.com/Hardware-Guild/
http://www.meetup.com/Oracle-Developers-Montreal`;

var test =
    `
https://www.meetup.com/mtlecommerce/
http://www.meetup.com/Docker-Montreal/
http://www.meetup.com/Sidechain-Ethereum-Blockchain/
http://www.meetup.com/Montreal-Bleu-Blanc-Tech/
http://www.meetup.com/Bitcoin-Embassy/ 
http://www.meetup.com/mtlnewtech/
http://www.meetup.com/msdevmtl/
http://www.meetup.com/MTL-Machine-Learning/
http://www.meetup.com/LogicielLibre/
http://www.meetup.com/Mentors-Montreal-Meetup/
http://www.meetup.com/Haskellers-Montreal-Meetup/`


//Changed this.
var arrOfWebsites = test.split("\nhttp://www.meetup.com/");
var arrOfUrlNames = arrOfWebsites.map(function(link) {
    return link.replace("/", "");
});
arrOfUrlNames.splice(0, 1)


var front = "https://api.meetup.com/2/events?key=";
var middle = "&group_urlname="
var end = "&sign=true"
var key = '1c5646f126f7c53745d76345155a39'


arrOfUrlNames.forEach(function(website) {
    request.get(front + key + middle + website + end, function(err, data) {
        if (err) {
            console.log(err)
        }
        else {
            var nicedata = JSON.parse(data.body)
            if (nicedata.results[0]) {
                var placeholdername = nicedata.results.reduce(function(schedule, event, idx) {
                        var moments = moment(event.time);
                        schedule[moments.format('dddd, MMMM Do YYYY')] = {
                            event_name: event.name.substring(0, 40),
                            date: moments.format('dddd, MMMM Do YYYY'),
                            time: moments.format('HH:mm') + ' UTC',
                            description: event['description'],
                            url: event.event_url
                        }
                        if (event.venue) {
                            schedule[moments.format('dddd, MMMM Do YYYY')].location = event.venue.address_1
                        }
                        return schedule
                    }, {})
                console.log(placeholdername)
            }
        }
    })
})
