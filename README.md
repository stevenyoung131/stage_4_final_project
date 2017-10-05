neighborhood-map-project
======================

#### Author: Steven Young
#### This site is developed as a part of Udacity Full Stack Web Developer Nanodegree Stage-4 Final Project

## Instructions to run the website
	* The website utelizes the google maps and foursquare API's
	* All required files are included in the git repository
	* Model data is contained in model.js
	* Dependancies
		* Bootstrap
		* JQuery
		* Knockout
		* Popper
	* To run website, ensure you have internet connection and open index.html

## Feature Checklist Complying Project Rubric:
* Interface Design
	* All application components render on-screen in a responsive manner. --done--
	* All application components are usable across modern desktop, tablet, and phone browsers. --done--
* App Functionality
	* Includes text input field or dropdown menu that filters the map markers and list items to locations
	  matching the text input or selection.  Filter function runs error-free. --done--
	* A list-view of location names is provided which displays all locations by default, and displays the
	  filtered subset of locations when a filter is applied.
	  Clicking a location on the list displays unique information about the location, and animates its
	  associated map marker.
	  List functionality is resposive and runs error free. --done--
	* Map displays all location markers by default, and displays the filtered subset of location markers
	  when a filter is applied. --done--
	* Clicking a marker displays unique information about a location in either an infoWindow or DOM element. --done--
	* Markers should animate when clicked. --done--
	* Any additional custom functionality provided in the app funcitons error-free. --done--
* App Architecture
	* Code is properly seperated based upon Knockout best practices (follow an MVVM pattern,
	  avoid updating the DOM anually with JQuery or JS, use observables rather than forcing refreshes manually, etc.).
	  Knockout should not be used to handle the Google Map API. --done--
	* There are at least 5 locations in the model.  These may be hard-coded or retrieved from a data API. --done--
* Asynchronous Data Usage
	* Application utelizes the Google Maps API and at least one non-Google third-party API. --done--
	* All data requests are retrieved in an asynchronous manner. --done--
	* Data requests that fail are handled gracefully using common fallback techniquies.  --done--
* Location Details Functionality
	* Functionality providing additional data about a location is provided and sourced from a 3rd
	  party API.  Information can be provided either in the marker's infoWindow, or in an HTML
	  element in the DOM. --done--
	* Provide attribution for the source of additional data.  --done--
	* Application runs error-free. --done--
	* Functionality is presented in a usuable and responsive manner. --done--
* Documentation
	* A README file is included detailing all steps required to successfully run the application. --done--
	* Comments are present and effectively explain longer code procedures. --done--
	* Code is formatted with consistent, logical, and easy-to-read formatting as described in the
	  Udacity JavaScript Style Guide. --done--