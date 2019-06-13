


function initialize() {

	const URLMARKERS = 'http://localhost:4000/api/markers';
	var markere;
	  fetch(URLMARKERS)
	
	  .then(response => response.json())
	  .then(resp => {
			markere = resp;
			console.log(markere);
			console.log(resp);
			

			
	var mapOptions, map, marker, searchBox, city,

	addressEl = document.querySelector( '#map-search' ),
	element = document.getElementById( 'map-canvas' );
	latEl = document.querySelector( '.latitude' ),
	longEl = document.querySelector( '.longitude' ),
	//city = document.querySelector( '.reg-input-city' );
	bounds = new google.maps.LatLngBounds();
	geocoder = new google.maps.Geocoder();

mapOptions = {
	
	zoom: 15 ,
	center: new google.maps.LatLng( 47.1802151, 27.56845039999996 ), //copou
	disableDefaultUI: false,
	scrollWheel: true, 
	draggable: true, 
	// maxZoom: 11, 
	// minZoom: 9  

};

map = new google.maps.Map( element, mapOptions ); 


marker = new google.maps.Marker({
	position: mapOptions.center,
	map: map,
	//draggable: true
});


searchBox = new google.maps.places.SearchBox( addressEl );

google.maps.event.addListener( searchBox, 'places_changed', function () {
	var places = searchBox.getPlaces(),
		bounds = new google.maps.LatLngBounds(),
		i, place, lat, long, resultArray,
		addresss = places[0].formatted_address; //formatted_address e din raspunsul de la api

	for( i = 0; place = places[i]; i++ ) {
		bounds.extend( place.geometry.location );
	
	}

	map.fitBounds( bounds );  // Fit to the bound
	map.setZoom( 15 ); // This function sets the zoom to 15, meaning zooms to level 15.
	// console.log( map.getZoom() );

	lat = marker.getPosition().lat();
	long = marker.getPosition().lng();
	latEl.value = lat;
	longEl.value = long;

	resultArray =  places[0].address_components;
});


  











for( i = 0; i < markere.length; i++ ) {

			
contentString = '<a href="/announcementsDetail/' + markere[i]._id + '"><h3>'+markere[i].title+'</h3></a>'+'<p>'+markere[i].price+'&#x20AC'+'</p';

var infowindow = new google.maps.InfoWindow({content: contentString
}), marker, i;
		console.log(markere[i].coordinates.latitude)
		console.log(markere[i].coordinates.longitude)
		console.log(markere[i].address);
		console.log(marker);
		console.log(markere[i].title);
		console.log(markere[i].price);
		if(markere[i].coordinates.latitude==undefined	)
		{
		
		geocoder.geocode( { 'address': markere[i].address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			  var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
					
         
          infowindow.open(map, marker);
        }
      })(marker, i));
	
		} 
		else {
			  alert("Geocode was not successful for the following reason: " + status);
			}})
		}
		else
		{
		
        var position = new google.maps.LatLng(markere[i].coordinates.latitude, markere[i].coordinates.longitude);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markere[i].coordinates.description
				});
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						
						
						infowindow.open(map, marker);
					}
				})(marker, i));
			}
		

		
	

	}
		
	  })

	  


}