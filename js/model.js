// Styles variable that holds style data for use in initializing google map
var styles = [{
    featureType: 'water',
    stylers: [{
        color: '#19a0d8'
    }]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{
        color: '#ffffff'
    }, {
        weight: 6
    }]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#e85113'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
        color: '#efe9e4'
    }, {
        lightness: -40
    }]
}, {
    featureType: 'transit.station',
    stylers: [{
        weight: 9
    }, {
        hue: '#e85113'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{
        visibility: 'off'
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{
        lightness: 100
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
        lightness: -100
    }]
}, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
        visibility: 'on'
    }, {
        color: '#f0e4d3'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
        color: '#efe9e4'
    }, {
        lightness: -25
    }]
}];

// Model holding location data for use in ViewModel
// venueId aquired from and used with foursquare API
var locationsModel = [{
    name: "Food City",
    location: {
        lat: 35.198635,
        lng: -85.159321
    },
    venueId: "562309d8498e469eb52874c0"
}, {
    name: "Allen Elementary School",
    location: {
        lat: 35.23704,
        lng: -85.152091
    },
    venueId: "4d514a67d7eaa143653e710f"
}, {
    name: "Loftis Middle School",
    location: {
        lat: 35.194835,
        lng: -85.160325
    },
    venueId: "4d5dbc2bef4db60c077b0ede"
}, {
    name: "Dallas Bay Vape",
    location: {
        lat: 35.199099,
        lng: -85.162415
    },
    venueId: "5649193f498e7c1cac9ab452"
}, {
    name: "Poe's Tavern Park",
    location: {
        lat: 35.246281,
        lng: -85.188122
    },
    venueId: "504214e3e4b0047a41ac315f"
}, {
    name: "Chester Frost Park",
    location: {
        lat: 35.178897,
        lng: -85.154184
    },
    venueId: "4e13c4fa6284431b5351b121"
}];