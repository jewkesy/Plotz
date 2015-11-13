    var geocoder;
    var map;
    var markers = [];
    var delay = 250;
    var nextAddress = 0;
    var addresses = [];
    var plotted = [];
    var bounds = new google.maps.LatLngBounds();
    var interval; 
    
    function initialize() {
        for (var i = 0; i < offices.length; i++) {
            addresses.push(offices[i]);
        }

        for (var i = 0; i < plotData.length; i++) {
            plotData[i].type = 'employee'
            buildListItem(plotData[i]);
            addresses.push(plotData[i]);
        }

        buildMap();
    }

    function buildListItem(item) {

        $('listPlotPoints')

        console.log(item)



var container = $('<div></div>').attr('id', item.Surname).attr('type', item.type).attr('location', item.Location).addClass('item').attr('PostCode', item['Post Code']);
var avatar = $('<img></img>').addClass('avatar').attr('src', './images/avatar.png');
var who = $('<span></span>').addClass('name').html(item['Known As'] + ' ' + item.Surname);

// who.append(' <i>' + drone.ipaddress + '</i>');
// if (drone.bleState && drone.bleState.toLowerCase() == 'poweredon') {
// container.addClass('bleOn');
// }

// var what = $('<span></span>').addClass('beacons').html(drone.pingFreq);
var where = $('<span></span>').addClass('location').html(item.Location);
// var requests = $('<span></span><span class="reqCount"></span>');
// var cancel = $('<span></span>').html('remove').click(function() {
// highway.dom.removeDrone(drone);
// });
container.append(avatar).append(who).append(where);



$('#listPlotPoints').append(container)


// if ( $('#autoAdd').hasClass('is-checked') ) {
//             $('#autoAdd').removeClass('is-checked');
    }


    function buildMap() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(defaults.Lat, defaults.Lon);  // BS16 1EJ
        var myOptions = {
            zoom: defaults.Zoom,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        
        interval = setInterval(function(){delayCode(addresses);}, 900);
    }


    var chunk = 0;
    
    function delayCode(locations2) {
        var step = 1;
        // console.log(markers.length, addresses.length)
        if ((locations2.length+1-chunk) > step) {
            sGroup = locations2.slice(chunk, chunk+step);
            for (x=0; x<sGroup.length; x++) {
                //this is where the OVER_QUERY_LIMIT alert happens
                addToMap(sGroup[x]);
            }
            chunk+=step;
        } else{
            console.log(markers.length, addresses.length, 'finished')
            clearInterval(interval);
        }
    }

    function addToMap(item) {
        console.log(item)

        geocoder.geocode({address: item['Post Code']}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                content: item,
                icon: getIcon(item.type)
            });
            markers.push(marker);

            var infowindow = new google.maps.InfoWindow();

            var i = markers.length-1

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    console.log(markers[i].content)
                    if (markers[i].content.type == 'employee') {
                        infowindow.setContent(markers[i].content['Known As'] + ' ' + markers[i].content.Surname + '<br/>' + markers[i].content.Town + ', ' + markers[i].content['Post Code'] + '<br/>Mileage: ' + markers[i].content.Mileage);
                    } else {
                        infowindow.setContent(markers[i].content.Name + '<br/>' + markers[i].content['Post Code']);
                    }
                    
                    infowindow.open(map, marker);
                }
            })(marker, i));
        } else {
            console.log("Geocode was not successful for the following reason: " + status);
        }
    });
  }

  function getIcon(type) {
    if (type == 'officeBlue') return './images/blue-dot.png';
    if (type == 'officeGreen') return './images/green-dot.png';

    return './images/red-dot.png';
  }

    function checkZip(zip) {
        var distance = Number.MAX_VALUE;
        var index = 0;
        geocoder.geocode( { 'address': zip}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                for(ix=0; ix< markers.length; ix++) {
                    var tmp = getDistance(results[0].geometry.location, markers[ix].position);
                    if (tmp < distance) {
                        distance = tmp;
                        index = ix;
                    }
                }
                alert('nearest zipcode is :' + markers[index].name);
            }
        });
    }

    function getDistance(latlng1, latlng2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (latlng2.lat()-latlng1.lat()) * Math.PI / 180;  // Javascript functions in radians
        var dLon = (latlng2.lng()-latlng1.lng()) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(latlng1.lat()  * Math.PI / 180) * Math.cos(latlng2.lat()  * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        d = d * 0.621371192; // convert to miles
        return d;
    }


