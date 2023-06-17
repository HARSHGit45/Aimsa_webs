import requests
import json

# Make a request to NewsAPI
response = requests.get('https://newsapi.org/v2/everything?q=ai&apiKey=385c894d47794e8f9f53d3dec8a47a21')

# Parse the JSON response
data = response.json()

# Extract the articles
articles = data['articles']

# Define the path and filename for the JSON file
file_path = 'news_data.json'

# Add image URL for each article
for article in articles:
    # Check if the article contains an image URL
    if 'urlToImage' in article and article['urlToImage'] is not None:
        # Update the image URL field to store the URL
        article['image_url'] = article['urlToImage']

# Write the articles to the JSON file
with open(file_path, 'w') as json_file:
    json.dump(articles, json_file)
