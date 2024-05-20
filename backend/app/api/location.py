from flask import jsonify
import requests

def get_location(ip_address):
    url = f"http://ipinfo.io/{ip_address}/json"

    try:
        response = requests.get(url = url)
        response.raise_for_status()

        json_response = response.json()
        city = json_response.get('city')
        country = json_response.get('country')
        return jsonify({
            'status': True,
            'city': city,
            'country': country
        })
    except Exception as e:
        ## NOTE : SET UP A LOGGER ##
        print(f'[ERROR] : {e}')
        return jsonify({
            'status': False
        })
