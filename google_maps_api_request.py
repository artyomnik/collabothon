import requests

def generate_custom_map(api_key, lat, lang, zoom):
    html_code = f"""
    <!DOCTYPE html>
    <html>
      <head>
        <title>Custom Google Map</title>
        <script src="https://maps.googleapis.com/maps/api/js?key={api_key}&amp;callback=initMap" 
        async defer></script>
        <script>
          function initMap() {{
            var mapOptions = {{
              center: {{lat: {lat}, lng: {lang}}},
              zoom: {zoom}
            }};
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            // Add a custom marker
            var marker = new google.maps.Marker({{
              position: {{lat: {lat}, lng: {lang}}},
              map: map,
              title: 'Custom Marker'
            }});

            // Add click event listener to the marker
            marker.addListener('click', function() {{
              // Pass the marker information back to Python
              window.parent.postMessage({{
                type: 'marker_click',
                position: this.getPosition().toJSON(),
                title: this.getTitle()
              }}, '*');
            }});

          }}
        </script>
      </head>
      <body>
        <div id="map" style="height: 500px; width: 800px;"></div>
      </body>
    </html>
    """

    with open("custom_map.html", "w") as f:
        f.write(html_code)
    
    print("Custom map HTML file generated as custom_map.html")

def generate_static_map(api_key, center, zoom, size="640x480"):
    base_url = "https://maps.googleapis.com/maps/api/staticmap"
    
    params = {
        "center": center,
        "zoom": zoom,
        "size": size,
        "key": api_key
    }
    
    response = requests.get(base_url, params=params)
    
    if response.status_code == 200:
        with open("static_map.png", "wb") as f:
            f.write(response.content)
        print("Static map generated as static_map.png")
    else:
        print(f"Error generating static map. Status code: {response.status_code}")

# Set your API key and coordinates here
api_key = "AIzaSyBWhOp3JfRVbEvLGKbHIbnmg-q2ZDPlyCE"
coordinates = "50.103323, 14.392298"  # Format: latitude,longitude
zoom_level = 16  # Adjust as needed
lat = "50.103323"
lang = "14.392298"
zoom = 15

generate_static_map(api_key, coordinates, zoom_level)
generate_custom_map(api_key, lat, lang, zoom)