async function getData() {
    const response = await fetch('data/work.json');
    return response.json();
}

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function findEntryById(id, data) {
    const all = [...(data.work || []), ...(data.notes || [])];
    return all.find(entry => entry.id === id);
}

function findRelatedById(id, data) {
    const all = [...(data.work || []), ...(data.notes || [])];
    return all.find(entry => entry.id === id);
}

function renderMeta(meta) {
    const metaDiv = document.getElementById('meta');

    for (const [key, value] of Object.entries(meta)) {
        const pairDiv = document.createElement('div');
        pairDiv.classList.add('meta-pair');

        const label = document.createElement('p');
        label.classList.add("meta-key");
        label.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize key

        const val = document.createElement('p');
        val.classList.add("meta-value");
        val.textContent = value;

        pairDiv.appendChild(label);
        pairDiv.appendChild(val);
        metaDiv.appendChild(pairDiv);
    }
}

function renderMedia(media) {
    const mediaDiv = document.getElementById('media');
    media.forEach(block => {
        if (block.type === 'text') {
            const p = document.createElement('p');
            p.classList.add("text-media");
            p.innerHTML = block.text;
            mediaDiv.appendChild(p);
        } else if (block.type === 'image') {
            const img = document.createElement('img');
            img.classList.add("image-media");
            img.src = block.src;
            mediaDiv.appendChild(img);
        } else if (block.type === 'image+text') {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add("image-text-container");
            const img = document.createElement('img');
            img.src = block.src;
            imgContainer.appendChild(img);
            const p = document.createElement('p');
            p.textContent = block.text;
            imgContainer.appendChild(p);
            mediaDiv.appendChild(imgContainer);
        } else if (block.type === 'gallery') {
            const gallery = document.createElement('div');
            gallery.classList.add("gallery-container");
            block.images.forEach(img => {
                const galleryImg = document.createElement('img');
                galleryImg.classList.add("gallery-image");
                galleryImg.src = img.src;
                gallery.appendChild(galleryImg);
            });
            mediaDiv.appendChild(gallery);
        }
    });
}


function renderRelated(relatedArray, data) {
    const relatedContainer = document.querySelector('.related-container');
    const relatedList = document.getElementById('related');

    if (!relatedArray || relatedArray.length === 0) {
        relatedContainer.style.display = 'none';
        return;
    }

    relatedArray.forEach(rel => {
        const item = findRelatedById(rel.id, data);

        const div = document.createElement('a');
        div.classList.add('related-item');
        div.href = `work.html?id=${item.id}`;

        const type = document.createElement('p');
        type.classList.add('related-item-type');
        type.textContent = item.meta.type || '';

        const title = document.createElement('p');
        title.classList.add('related-item-title');
        title.textContent = item.meta.title || 'Untitled';

        div.appendChild(type);
        div.appendChild(title);
        relatedList.appendChild(div);
    });
}



async function main() {
    const id = getIdFromUrl();
    const data = await getData();
    const entry = findEntryById(id, data);

    // if (!entry) {
    //     document.getElementById('title').textContent = 'Entry not found.';
    //     return;
    // }

    // document.getElementById('title').textContent = entry.meta.title;
    renderMeta(entry.meta);
    renderMedia(entry.media);
    renderRelated(entry.related || [], data);
}

main();