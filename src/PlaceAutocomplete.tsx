import React from 'react';

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
//const google: any = window.google;

let placeSearch: google.maps.places.PlacesService;
let autocomplete: google.maps.places.Autocomplete;

interface  Props {
  setLat: (v: number | undefined) => void;
  setLng: (v: number | undefined) => void;
}

/*global google*/
const PlaceAutocomplete: React.FC<Props> = ({setLat, setLng}) => {
  const autocompleteInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autocompleteInput) {
      // Create the autocomplete object, restricting the search predictions to
      // geographical location types.
      autocomplete = new google.maps.places.Autocomplete(
        // @ts-ignore
        autocompleteInput.current as HTMLInputElement,
        {
          types: ['geocode'],
        },
      );

      // Avoid paying for data that you don't need by restricting the set of
      autocomplete.setFields(['geometry']);

      // When the user selects an address from the drop-down, populate the
      // address fields in the form.
      autocomplete.addListener('place_changed', () => {
        // Get the place details from the autocomplete object.
        const place = autocomplete.getPlace();
        const lat = place?.geometry?.location.lat();
        const lng = place?.geometry?.location.lng();

        //console.log('lat ', lat);
        //console.log('lng ', lng);
        setLat(lat)
        setLng(lng)

      });
    }
  }, []);

  /*
  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log('geolocation ', geolocation);
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }
   */

  return (
    <div>
      <input
        id="autocomplete"
        ref={autocompleteInput}
        placeholder="Enter your address"
        type="text"
      />
    </div>
  );
};

export default PlaceAutocomplete;
