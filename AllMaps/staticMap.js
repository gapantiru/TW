function initialize() {
	
    const URLMARKER = 'http://localhost:4000/api/announcements/'+"<%= announcement._id %>";
	var markere;
	  fetch(URLMARKER)
	
	  .then(response => response.json())
	  .then(resp => {
		  console.log(resp);
		element = document.getElementById( 'map-canvas' );
		latEl = resp.coordinates.latitude;
		longEl = resp.coordinates.longitude;
		bounds = new google.maps.LatLngBounds();

		mapOptions = {
	
			zoom: 15 ,
			center: new google.maps.LatLng( latEl, longEl ), 
			disableDefaultUI: false,
			scrollWheel: true, 
			draggable: true, 
			
		
		};
		map = new google.maps.Map( element, mapOptions ); 

		
marker = new google.maps.Marker({
	position: mapOptions.center,
	map: map,
	//draggable: true
});


});
}