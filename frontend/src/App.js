import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import News from './components/News';
import Error from './components/Error';
import Loader from './components/Loader';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.PROJECTALPHA_BACKEND_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        var ipAddressResponse = await axios.get('https://api.ipify.org?format=json');
        var ipAddress = ipAddressResponse.data.ip;

        // [ACTION] Get Location Details //
        var city;
        var country;
        var location;
        
        const locationResponse = await axios.post(`http://localhost:8000/get_location_info`, { ip: ipAddress })
        if (locationResponse.data.status !== true) {
          city = 'London';
          country = 'UK';
        } else {
          city = locationResponse.data.city;
          country = locationResponse.data.country;
        }

        // [ACTION] Get Weather Details + News Details //
        var weather;
        var news;

        var weatherResponse = await axios.post(`http://localhost:8000/get_weather`, { city: city })
        var newsResponse = await axios.post(`http://localhost:8000/get_news`, { country: country })

        if (weatherResponse.data.status !== true || newsResponse.data.status !== true) {
          throw Error()
        } else {
          console.log('WIND', weatherResponse.data.wind_speed)

          location = {
            'city': city,
            'country': country
          }  
          weather = {
            'temprature': weatherResponse.data.temprature,
            'title': weatherResponse.data.weather_main,
            'speed': weatherResponse.data.wind_speed
          }
          news = {
            'count': newsResponse.data.articles.length,
            'articles': newsResponse.data.articles
          }
        }

        // [ACTION] Setting the Data // 
        setData({
          'location': location,
          'weather': weather,
          'news': news
        });
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    }

    fetchData();
  }, [backendUrl]);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <main>
        <div class="container mt-5">
          <Weather city={data.location.city} title={data.weather.title} temprature={data.weather.temprature} speed={data.weather.speed} />
          <News news={data.news} />
        </div>
      </main>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
}

export default App;