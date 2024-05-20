from flask import jsonify
import requests
import os

def get_weather(city):
    api_key = os.getenv('OPENWEATHERMAP_API_KEY')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    try:
        response = requests.get(url = url)
        response.raise_for_status()

        json_response = response.json()
        weather_main = json_response.get('weather')[0].get('main')
        temprature = json_response.get('main').get('temp')
        wind_speed = json_response.get('wind').get('speed')
        
        return jsonify({
            'status': True,
            'weather_main': weather_main,
            'temprature': temprature,
            'wind_speed': wind_speed 
        })
    except Exception as e:
        ## NOTE : SET UP A LOGGER ##
        print(f'[ERROR] : {e}')
        return jsonify({
            'status': False
        })
