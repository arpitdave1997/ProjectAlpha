from flask import request, jsonify
from . import main
from app.api.weather import get_weather
from app.api.news import get_news
from app.api.location import get_location

@main.route('/health', methods=['GET', 'POST'])
def get_health():
    return jsonify({
        'status': 'ProjectAlpha is up and running'
    })

@main.route('/')
def welcome():
    return jsonify({
        'message': 'Welcome to the Backend Service for ProjectAlpha'
    })

@main.route('/get_location_info', methods=['POST'])
def get_location_info():
    ip_address = request.json.get('ip')
    return get_location(ip_address)
    
@main.route('/get_news', methods=['POST'])
def get_news_by_country():
    country = request.json.get('country')
    return get_news(country)

@main.route('/get_weather', methods=['POST'])
def get_weather_by_city():
    city = request.json.get('city')
    return get_weather(city)
