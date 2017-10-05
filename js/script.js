var ViewModel = function() {
    var self = this;

    // Create an empty array for holding marker meta-data
    this.markers = ko.observableArray([]);

    // Initialize google map Object
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: new google.maps.LatLng(35.22, -85.15),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    });

    // Function bound to reset filter button
    // Sets all markers as visible and alerts ko.computed filter funciton of the change
    self.reset = function() {
        for (var i = 0; i < markers().length; i++) {
            markers()[i].setVisible(true);
            self.filter('');
        }
    };

    // Function that causes a marker to bounce and info-window to open
    // when a location is clicked from the list outside of the map
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

    // Create empty observable that will be filled by a data-binding in the search box in the DOM
    this.filter = ko.observable();

    // Initialize instance of info-window
    var largeInfoWindow = new google.maps.InfoWindow();

    // Set colors for default and highlighted icons
    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Initialize global variable for holding current bouncing marker
    var bouncingMarker = null;

    // Funciton for assigning event listeners to each marker
    var assignListeners = function(marker) {
        // Listener opens infoWindow and bounces marker on click
        marker.addListener('click', function(){
            populateInfoWindow(marker, largeInfoWindow);
            if (bouncingMarker)
                bouncingMarker.setAnimation(null);
            if (bouncingMarker != marker) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                bouncingMarker = marker;
            } else {
                bouncingMarker = null;
            }
        });

        // Listeners change color of marker on hover
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    };

    // Create an empty observable to host foursquare response info
    this.fsdata = ko.observable();


    // Create Marker object for each location in Model
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

        // Push created marker Object to markers array
        markers.push(marker);

        // Assign click, mouseover, and mouseout event listeners to each marker
        assignListeners(marker);

        // Assign markers to map
        marker.setMap(map);
    }

    // KO computed function that filters list of locations when filter search box is used
    // Sets markers for locations removed from the list as setVisible(false)
    this.visiblePlaces = ko.computed(function() {
        return this.markers().filter(function(marker) {
            if (!self.filter() || marker.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
                return marker;
            } else {
                marker.setVisible(false);
            }
        });
    }, this);

    // Function to populate the info window with information from marker object
    // as well as populate DOM elements with foursquare location information
    function populateInfoWindow(marker, infowindow) {
        // Checks to make sure that the clicked marker is a new marker and clears content if not
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            // When info-window is closed, also stops marker bounce animation
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
                marker.setAnimation(null);
            });
            var innerHTML = '<div>';
            // Sets the location's title in the info window if it exists
            if (marker.title) {
                innerHTML += '<strong id="info-box">' + marker.title + '</strong>';
            }
            // Foursquare API authorization information
            var clientId = "2NQRW41L5Q4VX3JUUQXUVBGKOSAKHKWVABQVQ3F1Q4YS0GOB";
            var clientSecret = "U4E21UUZFYH3JU1O1XB02IDWK12YX21HZMCPAFC0L3WLPYBL";
            // AJAX call to foursquare venue's API
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
                    // On success, creates ko.observable containing response
                    self.fsdata(response.response.venue);
                },
                error: function(e) {
                    // Throws an alert if foursquare API call fails
                    alert("There was a problem reaching the foursquare API.  Please try your request again.");
                }
            });
            innerHTML += '</div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
        }
    }

    // Uses google maps markerImage to make markers based on color passed into function
    // Used to create two different markers for hovered markers
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
};

// Error funciton for Google Maps API call
var onError = function() {
    alert('There was a problem loading the map.  Please try the request again.');
}

// Adding the .on('load') functionality allows the async map call to complete before applying bindings
$(window).on('load', function() {
    ko.applyBindings(ViewModel);
});