var defaults = {
	Lat: 52.480111,
	Lon: -1.905656,
	Zoom: 8
}

var offices = [
	{
		"Name": "Main Office",
		"type": "officeBlue",
		"PostCode": "B3 3DH"
	},
	{
		"Name": "Booking Office",
		"type": "officeGreen",
		"PostCode": "NE1 4ST"
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
		"ContractualBase": "Glasgow",
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
            	"Office": "Edinburgh",
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
		"ContractualBase": "Newcastle",
		"Locations": [
            {
            	"PostCode": "L3 8EN",
                "Office": "Liverpool",
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