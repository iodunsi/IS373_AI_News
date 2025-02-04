async function fetchAndDisplay() {
    try {
        const response = await fetch('https://api.currentai.me/rest/recent-articles', {
            method: 'GET',
            headers: {
                'Accept': 'application/json' // Ensure response is in JSON format
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching articles: ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON response
        displayArticles(data);
    } catch (error) {
        console.error('Using test data. Error fetching and displaying articles:', error);
        const testData = [
            {
              "nid": [{"value": 2}],
              "title": [{"value": "AI in Healthcare: Revolutionizing Diagnostics and Treatment Add to Default shortcuts"}],
              "created": [{"value": "2024-12-05T23:25:53+00:00", "format": "Y-m-d\\TH:i:sP"}],
              "field_article_image": [{"target_id": 2, "alt": "Health Care Professional Utilizing AI Technology", "title": "", "width": 1024, "height": 1024, "target_type": "file", "target_uuid": "0a948cd0-b30c-45d7-a71d-eaece9b0447a", "url": "http://api.currentai.me/sites/default/files/2024-12/Healthcare_AI_0.webp"}]
            }
        ];

        // use testData instead
        displayArticles(testData);
    }
}

function displayArticles(data) {
    const container = document.getElementById('article-container');
    container.innerHTML = '';

    data.forEach(article => {
        const title = article.title[0].value || 'No title available';
        const created = article.created[0].value;
        const imgURL = article.field_article_image[0].url || 'https://picsum.photos/200';
        const imgAlt = article.field_article_image[0].alt || 'Article Image';
        const nid = article.nid[0].value;

        // Create the card
        const card = document.createElement('a');
        card.href = `http://api.currentai.me//node/${nid}`;
        card.classList.add('card', 'card-link');
        card.style.backgroundImage = `url(${imgURL})`;

        // Add content overlay
        const cardContent = `
            <div class="card-content">
                <h3>${title}</h3>
                <p class="created">Created: ${created}</p>
            </div>
        `;
        card.innerHTML = cardContent;

        container.appendChild(card);
    });
}

fetchAndDisplay();
