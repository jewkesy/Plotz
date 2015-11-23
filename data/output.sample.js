var defaults = {
	Lat: 52.480111,
	Lon: -1.905656,
	Zoom: 8
}

var offices = [
	{
		"Name": "Main Office",
		"type": "officeBlue",
		"Post Code": "B3 3DH"
	},
	{
		"Name": "Booking Office",
		"type": "officeGreen",
		"Post Code": "NE1 4ST"
	}
]

var plotData = [
	{
		"Known As": "Daryl",
		"Surname": "Jewkes",
		"Department": "Innovation",
		"Address": {
            "Town": "London",
            "Post Code": "SW7 5BD"
        },
		"Location": "Birmingham",
		"Contractual Base": "Glasgow",
		"Locations": [
            {
            	"Post Code": "L3 8EN",
                "Office": "Liverpool",
                "Miles": {
                	"text": 88
                },
                "Durations": {
                	"normal": {
                		"text": "21 mins"
                	},
                	"inTraffic": {
                		"text": "24 mins"
                	}
                }
            },
            {
            	"Post Code": "EH1 2NG",
            	"Office": "Edinburgh",
            	"Miles": {
                	"text": 88
                },
                "Durations": {
                	"normal": {
                		"text": "21 mins"
                	},
                	"inTraffic": {
                		"text": "24 mins"
                	}
                }
            }
        ]
	},
	{
		"Known As": "Millennium",
		"Surname": "Stadium",
		"Department": "Sports",
		"Address": {
            "Town": "Cardiff",
            "Post Code": "CF11 8AZ"
        },
		"Location": "Liverpool",
		"Contractual Base": "Newcastle",
		"Locations": [
            {
            	"Post Code": "L3 8EN",
                "Office": "Liverpool",
                "Miles": {
                	"text": 49
                },
                "Durations": {
                	"normal": {
                		"text": "17 mins"
                	},
                	"inTraffic": {
                		"text": "48 mins"
                	}
                }
            },
            {
            	"Post Code": "EH1 2NG",
            	"Office": "Edinburgh",
            	"Miles": {
                	"text": 23
                },
                "Durations": {
                	"normal": {
                		"text": "3 mins"
                	},
                	"inTraffic": {
                		"text": "15 mins"
                	}
                }
            }
        ]
	}
]