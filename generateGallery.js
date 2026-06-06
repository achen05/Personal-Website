async function loadLocalJSON() {
    try {
        const response = await fetch('./galleryData.json');

        if (!response.ok) {
            throw new Error('Network error');
        }

        const galleryData = await response.json();
        console.log(galleryData);

        const galleryContainer = document.getElementById('gallery-container');

        galleryData.forEach(item => {
            const contentBlock = document.createElement('a');
            contentBlock.className = 'content-block';
            if (item.href) {
                contentBlock.href = item.href;
            }
            galleryContainer.appendChild(contentBlock);

            const contentBlockBody = document.createElement('div');
            contentBlockBody.className = 'content-body-container';
            contentBlock.appendChild(contentBlockBody);

            const contentType = item.type;
            switch (contentType) {
                case "image":
                    const contentImage = document.createElement('img');
                    contentImage.className = 'content-image';
                    contentImage.src = item.content;
                    contentBlockBody.appendChild(contentImage);
                    break;
                case "text":
                    const contentText = document.createElement('p');
                    contentText.className = 'content-plaintext';
                    contentText.innerHTML = item.content;
                    contentBlockBody.appendChild(contentText);
            }

            const contentBlockText = document.createElement('div');
            contentBlockText.className = 'content-text-container';
            contentBlock.appendChild(contentBlockText);

            const contentBlockTitle = document.createElement('p');
            contentBlockTitle.className = 'content-text-title';
            contentBlockTitle.innerHTML = item.title;
            contentBlockText.appendChild(contentBlockTitle);

            const contentBlockDescription = document.createElement('p');
            contentBlockDescription.className = 'content-text-description';
            contentBlockDescription.innerHTML = item.description;
            contentBlockText.appendChild(contentBlockDescription);

        })


    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

loadLocalJSON();
