    var geocoder;
    var map;
    var markers = [];
    var delay = getParameterByName('delay') || 950;
    var autoZoom = getParameterByName('autozoom') || true;
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
            plotData[i]._id = 'emp_'+i

            if (plotData[i].Address.PostCode == "PE17 5QG") plotData[i].Address.PostCode = "PE28 5QG"

            buildListItem(plotData[i]);

            addresses.push(plotData[i]);
        }

        buildMap();
    }

    function buildListItem(item) {
        // console.log(item)

        var container = $('<div></div>').addClass('pending').addClass('listItem').attr('id', item._id).attr('type', item.type).attr('location', item.Location).addClass('item').attr('PostCode', item['PostCode']);
        var tab = $('<table></table>')
        var who = $('<span></span>').addClass('name').html(item['FirstName'] + ' ' + item.Surname);

        var br = $('<br/>')
        var where = $('<span></span>').addClass('location').html(item.Location);
       

        container.append(who).append(where);

        var list = $('<ul></ul>')
        for (var i = 0; i < item.Locations.length; i++) {
            var details = $('<li>').addClass('details').html(item.Locations[i].Miles.text + ' to ' + item.Locations[i].Office);

            list.append(details)
        }
        container.append(list)
        

        $('#leftNav').append(container)

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
        interval = setInterval(function(){delayCode(addresses);}, delay);
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
        // console.log(item)

        var thePostCode = ''
        if (item.type == "employee") {
            thePostCode = item.Address['PostCode']
        } else if (item.type == "officeBlue" || item.type == "officeGreen") {
            thePostCode = item['PostCode']
        } else {
            console.log('Unhandled type', item)
        }

        geocoder.geocode({address: thePostCode}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // console.log(results)
            // map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                content: item,
                icon: getIcon(item.type)
            });
            markers.push(marker);

            var infowindow = new google.maps.InfoWindow();

            var i = markers.length-1;

            if (autoZoom == 'true') {
                bounds.extend(results[0].geometry.location);
                map.fitBounds(bounds);   
            }
            
            $('#' + item._id).addClass('clickable').addClass('loaded').removeClass('pending')

            $('#' + item._id).click(function(evt) {
                // console.log('click event', $(this).attr('id'))
                var idx = parseInt($(this).attr('id').replace('emp_', '')) + offices.length
                // console.log(idx, markers[idx])
                map.panTo(markers[idx].position);
            })

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    autoZoom = false;
                    // console.log(markers[i])
                    if (markers[i].content.type == 'employee') {

                        var listDistances = "<ul>"
                        for (var j = 0; j < markers[i].content.Locations.length; j++) {
                            var loc = markers[i].content.Locations[j];
                            listDistances += "<li>" + loc.Miles.text + ' to <b>' + loc.Office + "</b><ul><li><i>Normal:</i> " 
                                + loc.Durations[0].normal.text + "</li><li><i>Traffic:</i> " + loc.Durations[0].inTraffic.text + "</li></ul></li>"
                        }
                        listDistances += "</ul>"

                        infowindow.setContent("<b>" + markers[i].content['FirstName'] + ' ' + markers[i].content.Surname 
                            + '</b><br/>Home: ' + markers[i].content.Address.Town + ', ' 
                            + markers[i].content.Address['PostCode'] 
                            + '<br/>Contractual Base: <b>' + markers[i].content.ContractualBase + '</b>'
                            + '<br/>Current Location: <b>' + markers[i].content.Location + '</b>'
                            + '<br/>Distances: ' + listDistances);
                    } else {
                        var listDistances = "<ul>"
                        for (var j = 0; j < markers[i].content.Locations.length; j++) {
                            var loc = markers[i].content.Locations[j];
                            listDistances += "<li>" + loc.Miles.text + ' to <b>' + loc.Office + "</b><ul><li><i>Normal:</i> " 
                                + loc.Durations[0].normal.text + "</li><li><i>Traffic:</i> " + loc.Durations[0].inTraffic.text + "</li></ul></li>"
                        }
                        listDistances += "</ul>"

                        infowindow.setContent("<b>" + markers[i].content.Name + '</b><br/>' + markers[i].content['PostCode'] + '<br/>Distances: ' + listDistances);
                    }
                    
                    infowindow.open(map, marker);
                }
            })(marker, i));
        } else {
            $('#' + item._id).addClass('failed').removeClass('pending')
            console.log("Geocode was not successful for the following reason: " + status, item);
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
