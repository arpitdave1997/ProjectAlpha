from flask import jsonify
import requests
import os

def get_news(country):
    api_key = os.getenv('NEWSAPI_API_KEY')
    url = f"https://newsapi.org/v2/top-headlines?country={country}&apiKey={api_key}"

    try:
        response = requests.get(url = url)
        response.raise_for_status()

        json_response = response.json()
        articles = json_response.get('articles')
        return jsonify({
            'status': True,
            'articles': format_news(articles)
        })
    except Exception as e:
        ## NOTE : SET UP A LOGGER ##
        print(f'[ERROR] : {e}')
        return jsonify({
            'status': False
        })

def format_news(raw_articles):
    formatted_articles = []

    for article in raw_articles:
        if article.get('author') != None:
            formatted_article = {
                'author': article.get('author'),
                'title': article.get('title'),
                'description': article.get('description'),
                'image': article.get('urlToImage') if article.get('urlToImage') != None and any(img_tag in article.get('urlToImage') for img_tag in ['.jpg', '.png']) else None,
                'link': article.get('url') 
            }

            formatted_articles.append(formatted_article)

    return formatted_articles
        