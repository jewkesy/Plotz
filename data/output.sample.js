var defaults = {
	Lat: 54.5858443,
	Lon: -2.9934367,
	Zoom: 6
}

var offices = [
	{
		"Name": "Main Office",
		"type": "officeBlue",
		"PostCode": "B3 3DH",
        "Locations": [
            {
                "PostCode": "NE1 4ST",
                "Office": "Booking Office",
                "Miles": {
                    "text": "207 mi"
                },
                "Durations": [{
                    "normal": {
                        "text": "3 hours 38 mins"
                    },
                    "inTraffic": {
                        "text": "3 hours 43 mins"
                    }
                }]
            }
        ]
	},
	{
		"Name": "Booking Office",
		"type": "officeGreen",
		"PostCode": "NE1 4ST",
        "Locations": [
            {
                "PostCode": "L3 8EN",
                "Office": "Liverpool",
                "Miles": {
                    "text": "173 mi"
                },
                "Durations": [{
                    "normal": {
                        "text": "3 hours 9 mins"
                    },
                    "inTraffic": {
                        "text": "3 hours 10 mins"
                    }
                }]
            }
        ]
	}
]

var plotData = [
	{
		"FirstName": "Daryl",
		"Surname": "Jewkes",
		"Department": "Innovation",
		"Address": {
            "Town": "London",
            "PostCode": "SW7 5BD"
        },
		"Location": "Birmingham",
		"ContractualBase": "Liverpool",
		"Locations": [
            {
            	"PostCode": "L3 8EN",
                "Office": "Liverpool",
                "Miles": {
                	"text": 88
                },
                "Durations": [{
                	"normal": {
                		"text": "21 mins"
                	},
                	"inTraffic": {
                		"text": "24 mins"
                	}
                }]
            },
            {
            	"PostCode": "EH1 2NG",
            	"Office": "Booking Office",
            	"Miles": {
                	"text": 88
                },
                "Durations": [{
                	"normal": {
                		"text": "21 mins"
                	},
                	"inTraffic": {
                		"text": "24 mins"
                	}
                }]
            }
        ]
	},
	{
		"FirstName": "Millennium",
		"Surname": "Stadium",
		"Department": "Sports",
		"Address": {
            "Town": "Cardiff",
            "PostCode": "CF11 8AZ"
        },
		"Location": "Liverpool",
		"ContractualBase": "Edinburgh",
		"Locations": [
            {
            	"PostCode": "L3 8EN",
                "Office": "Booking Office",
                "Miles": {
                	"text": 49
                },
                "Durations": [{
                	"normal": {
                		"text": "17 mins"
                	},
                	"inTraffic": {
                		"text": "48 mins"
                	}
                }]
            },
            {
            	"PostCode": "EH1 2NG",
            	"Office": "Edinburgh",
            	"Miles": {
                	"text": 23
                },
                "Durations": [{
                	"normal": {
                		"text": "3 mins"
                	},
                	"inTraffic": {
                		"text": "15 mins"
                	}
                }]
            }
        ]
	}
]