const newsContainer = document.getElementById('news-container');

fetch('news_data.json')
    .then(response => response.json())
    .then(data => {
        let counter = 0; // Counter to track the number of articles displayed
        data.forEach(article => {
            if (counter >= 15) {
                return; // Skip iteration if the desired limit is reached
            }

            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');

            const linkElement = document.createElement('a');
            linkElement.href = article.url;
            linkElement.target = '_blank'; // Open link in a new tab
            linkElement.style = ('text-decoration:none;')

            const imageElement = document.createElement('img');
            imageElement.classList.add('news-image');
            imageElement.style = ('max-width: 275px; margin:auto;')
            imageElement.src = article.image_url;
            imageElement.alt = article.title;

            const titleElement = document.createElement('h2');
            titleElement.classList.add('news-title');
            titleElement.textContent = article.title;

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('news-description');
            descriptionElement.textContent = article.description;
            descriptionElement.style = ('text-decoration:none;')

            linkElement.appendChild(imageElement);
            linkElement.appendChild(titleElement);
            linkElement.appendChild(descriptionElement);
            articleElement.appendChild(linkElement);
            newsContainer.appendChild(articleElement);

            counter++; // Increment the counter after displaying an article
        });
    })
    .catch(error => {
        console.log('Error fetching news data:', error);
    });
