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
}]

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
}]

// var Location = function(data) {
//     this.name = ko.observable(data.name);
//     this.lat = ko.observable(data.latitude);
//     this.lng = ko.observable(data.longitude);
//     this.id = ko.observable(data.venueId);
// }

var ViewModel = function() {
    var self = this;

    this.markers = ko.observableArray([]);

    var foursquareData;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: new google.maps.LatLng(35.22, -85.15),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    });

    self.reset = function() {
        for (var i = 0; i < markers().length; i++) {
            markers()[i].setVisible(true);
            $("#filter").val('').change();
        }
    }

    self.listClick = function(marker) {
        populateInfoWindow(marker, largeInfoWindow);
        if (bouncingMarker)
            bouncingMarker.setAnimation(null);
        if (bouncingMarker != marker) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            bouncingMarker = marker;
        } else
            bouncingMarker = null;
    };

    // this.locationList = ko.observableArray([]);

    // locationsModel.forEach(function(locationItem) {
    //     self.locationList.push(new Location(locationItem));
    // });

    this.filter = ko.observable();

    var largeInfoWindow = new google.maps.InfoWindow();

    var defaultIcon = makeMarkerIcon('0091ff');

    var highlightedIcon = makeMarkerIcon('FFFF24');

    var bouncingMarker = null;

    for (var i = 0; i < locationsModel.length; i++) {
        var position = locationsModel[i].location;
        var title = locationsModel[i].name;
        var venueId = locationsModel[i].venueId;
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            venueId: venueId,
            id: i
        });

        markers.push(marker);

        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
            if (bouncingMarker)
                bouncingMarker.setAnimation(null);
            if (bouncingMarker != this) {
                this.setAnimation(google.maps.Animation.BOUNCE);
                bouncingMarker = this;
            } else
                bouncingMarker = null;
        });

        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        marker.setMap(map);
    }

    this.visiblePlaces = ko.computed(function() {
        return this.markers().filter(function(marker) {
            if (!self.filter() || marker.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
                return marker;
            } else {
                marker.setVisible(false);
            }
        });
    }, this);

    function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
                marker.setAnimation(null);
            });
            var innerHTML = '<div>';
            if (marker.title) {
                innerHTML += '<strong id="info-box">' + marker.title + '</strong>';
            };
            var clientId = "2NQRW41L5Q4VX3JUUQXUVBGKOSAKHKWVABQVQ3F1Q4YS0GOB";
            var clientSecret = "U4E21UUZFYH3JU1O1XB02IDWK12YX21HZMCPAFC0L3WLPYBL";
            $.ajax({
                url: "https://api.foursquare.com/v2/venues/" + marker.venueId,
                dataType: "json",
                method: "GET",
                data: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    v: "20180801",
                },
                success: function( response ){
                    var data = response.response.venue;
                    console.log(data);
                    $("#name").text('Name: ' + data.name);
                    $("#category").text('Category: ' + data.categories[0].name);
                    if (data.contact.formattedPhone) {
                        $("#phone").text('Phone: ' + data.contact.formattedPhone);
                    } else {
                        $("#phone").text('Phone: No Number Listed');
                    }
                    $("#likes").text('Likes: ' + data.likes.count);
                    if (data.tips.count !== 0) {
                        $("#tips").text('Tips: ' + data.tips.groups[0].items[0].text);
                    } else {
                        $("#tips").text('Top Tip: No Current Tips');
                    }
                },
                fail: function(e) {
                    alert("There was a problem reaching the foursquare API.  Please try your request again.")
                }
            });
            innerHTML += '</div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
        }
    }

    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }

    // function getFoursquareInfo(markerId) {
    //     var clientId = "2NQRW41L5Q4VX3JUUQXUVBGKOSAKHKWVABQVQ3F1Q4YS0GOB";
    //     var clientSecret = "U4E21UUZFYH3JU1O1XB02IDWK12YX21HZMCPAFC0L3WLPYBL";
    //     $.ajax({
    //         url: "https://api.foursquare.com/v2/venues/" + markerId,
    //         dataType: "json",
    //         method: "GET",
    //         data: {
    //             client_id: clientId,
    //             client_secret: clientSecret,
    //             v: 20180801,
    //         },
    //         success: function(data){
    //             foursqareData = data;
    //         }
    //     });
    // }
}

$(window).on('load', function() {
    ko.applyBindings(ViewModel);
});