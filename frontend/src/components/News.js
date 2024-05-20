import React from 'react';
import placeholder from '../assets/placeholder.jpg'

function News({ news }) {
    return (
        <div class="row">
            {news.articles.map((article, index) => (
                <div class="col-md-4 mb-4">
                    <a href={article.link} class="card-link">
                        <div class="card">
                            <img 
                                src={article.image || placeholder} 
                                className="card-img-top" 
                                alt="Loading" 
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <div class="card-body">
                                <h5 class="card-title">{article.title}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default News;
