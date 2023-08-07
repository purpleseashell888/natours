/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicHVycGxlc2Vhc2hlbGwiLCJhIjoiY2xraTF6MDE0MDE0bjNtbmV6cHhmZnFxaiJ9.L7yX5G8bO0-BUzttkuWpCA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/purpleseashell/clki25ym5000l01pdanm788c3',
    scrollZoom: false,
    //   center: [-118.24899751010405, 34.07168412905003],
    //   zoom: 10,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      ancher: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}<p/>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};
