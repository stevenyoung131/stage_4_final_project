var styles = [
	{
      featureType: 'water',
      stylers: [
        { color: '#19a0d8' }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -40 }
      ]
    },{
      featureType: 'transit.station',
      stylers: [
        { weight: 9 },
        { hue: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        { lightness: 100 }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { lightness: -100 }
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#f0e4d3' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -25 }
      ]
    }
]

var locationsModel = [
		{
			name: "Food City",
			location: {lat: 35.198635, lng: -85.159321}
		},
		{
			name: "My Dream Home",
			location: {lat: 35.224072, lng: -85.149183}
		},
		{
			name: "Allen Elementary School",
			location: {lat: 35.23704, lng: -85.152091}
		},
		{
			name: "Loftis Middle School",
			location: {lat: 35.194835, lng: -85.160325}
		},
		{
			name: "Dallas Bay Vape",
			location: {lat: 35.199099, lng: -85.162415}
		},
		{
			name: "Poe's Tavern Park",
			location: {lat: 35.246281, lng: -85.188122}
		},
		{
			name: "Chester Frost Park",
			location: {lat: 35.178897, lng: -85.154184 }
		}]

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.latitude);
	this.lng = ko.observable(data.longitude);
}

var ViewModel = function() {
	var self = this;

	this.markers = ko.observableArray([]);

	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 11,
	    center: new google.maps.LatLng(35.22,-85.15),
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    styles: styles
	});

	self.reset = function() {
		for (var i = 0; i < markers().length; i++) {
			markers()[i].setVisible(true);
			$("#filter").val('').change();
		}
	}

	self.listClick = function(marker){
		populateInfoWindow(marker, largeInfoWindow);
		    if(bouncingMarker)
		        bouncingMarker.setAnimation(null);
		    if(bouncingMarker != marker) {
		        marker.setAnimation(google.maps.Animation.BOUNCE);
		        bouncingMarker = marker;
		    } else
		        bouncingMarker = null;
	};

	this.locationList = ko.observableArray([]);

	locationsModel.forEach(function(locationItem) {
		self.locationList.push(new Location(locationItem));
	});

	this.filter = ko.observable();

	var largeInfoWindow = new google.maps.InfoWindow();

	var defaultIcon = makeMarkerIcon('0091ff');

	var highlightedIcon = makeMarkerIcon('FFFF24');

	var bouncingMarker = null;

	for (var i = 0; i < locationsModel.length; i++) {
		var position = locationsModel[i].location;
		var title = locationsModel[i].name;
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: i
		});

		markers.push(marker);

		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfoWindow);
		    if(bouncingMarker)
		        bouncingMarker.setAnimation(null);
		    if(bouncingMarker != this) {
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
		    infowindow.setContent(innerHTML);
    		infowindow.open(map, marker);
		} 
	}

	function makeMarkerIcon(markerColor) {
	  var markerImage = new google.maps.MarkerImage(
	    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
	    '|40|_|%E2%80%A2',
	    new google.maps.Size(21, 34),
	    new google.maps.Point(0, 0),
	    new google.maps.Point(10, 34),
	    new google.maps.Size(21,34));
	  return markerImage;
	}
}

$(window).on('load', function(){
	ko.applyBindings(ViewModel);
});