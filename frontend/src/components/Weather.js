import React from 'react';
import background from '../assets/background.png'

function Weather({ city, title, temprature, speed }) {
    if (!city || !title || !temprature || !speed) {
        return <div>Weather data is not available</div>;
    }

    const backgroundStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black', 
    };

    return (
        <div class="row mb-4">
            <div class="col-12">
                <div class="card" style={backgroundStyle}>
                    <div class="card-body text-center">
                        <h5 class="card-title">Weather in {city} is {title}</h5>
                        <p class="card-text">Temperature: {temprature}°C | Wind Speed: {speed}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
