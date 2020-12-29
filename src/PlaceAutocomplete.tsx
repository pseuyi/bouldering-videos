import React from 'react';

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
//const google: any = window.google;

/*global google*/
//@ts-ignore
let autocomplete: google.maps.places.Autocomplete;

interface Props {
  className: string;
  setLat: (v: number | undefined) => void;
  setLng: (v: number | undefined) => void;
}

const PlaceAutocomplete: React.FC<Props> = ({className, setLat, setLng}) => {
  const autocompleteInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autocompleteInput) {
      // Create the autocomplete object, restricting the search predictions to
      // geographical location types.
      //@ts-ignore
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

        setLat(lat)
        setLng(lng)

      });
    }
  }, [setLat, setLng]);

  return (
    <>
      <input
        id="autocomplete"
        className={className}
        ref={autocompleteInput}
        placeholder="enter an address..."
        type="text"
      />
    </>
  );
};

export default PlaceAutocomplete;
