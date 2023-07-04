import requests
import json
import random

# Make a request to NewsAPI for articles
article_response = requests.get('https://newsapi.org/v2/everything?q=ai&apiKey=385c894d47794e8f9f53d3dec8a47a21')
article_data = article_response.json()
articles = article_data['articles']

# Make a request to fetch podcast data
podcast_response = requests.get('https://newsapi.org/v2/everything?q=ai&type=podcast&apiKey=385c894d47794e8f9f53d3dec8a47a21')
podcast_data = podcast_response.json()
podcasts = podcast_data['articles']

# Combine the articles and podcasts into a single list
combined_data = articles + podcasts

# Randomly shuffle the combined data
random.shuffle(combined_data)

# Define the path and filename for the JSON file
file_path = 'news_data.json'

# Add image URL for each item in the combined data
for item in combined_data:
    if 'urlToImage' in item and item['urlToImage'] is not None:
        item['image_url'] = item['urlToImage']

# Write the combined data to the JSON file
with open(file_path, 'w') as json_file:
    json.dump(combined_data, json_file)
