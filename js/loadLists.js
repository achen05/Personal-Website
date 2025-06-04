async function loadAndRenderLists() {
    try {
        const response = await fetch('data/work.json');
        const data = await response.json();

        const projectsList = document.getElementById('projects-list');
        const notesList = document.getElementById('notes-list');

        // For "work" items (projects)
        function createProjectItem(entry) {
            const a = document.createElement('a');
            a.classList.add('project-item');
            a.href = `work.html?id=${entry.id}`;

            const meta = document.createElement('div');
            meta.classList.add('project-item-meta');

            const media = document.createElement('p');
            media.classList.add('project-item-media');
            media.textContent = entry.meta.media || '';

            const client = document.createElement('p');
            client.classList.add('project-item-client');
            client.textContent = entry.meta.client || '';

            const year = document.createElement('p');
            year.classList.add('project-item-year');
            year.textContent = (entry.meta.date || '—').split('/')[0];

            meta.appendChild(media);
            meta.appendChild(client);
            meta.appendChild(year);

            const title = document.createElement('p');
            title.classList.add('project-item-title');
            title.textContent = entry.meta.title || 'Untitled';

            a.appendChild(meta);
            a.appendChild(title);

            return a;
        }

        // For "notes" items
        function createNoteItem(entry) {
            const a = document.createElement('a');
            a.classList.add('notes-item');
            a.href = `work.html?id=${entry.id}`;

            const year = document.createElement('p');
            year.classList.add('notes-item-year');
            year.textContent = (entry.meta.date || '—').split('/')[0];

            const title = document.createElement('p');
            title.classList.add('notes-item-title');
            title.textContent = entry.meta.title || 'Untitled';

            a.appendChild(year);
            a.appendChild(title);

            return a;
        }

        // Render both lists
        (data.work || []).forEach(entry => {
            const item = createProjectItem(entry);
            projectsList.appendChild(item);
        });

        (data.notes || []).forEach(entry => {
            const item = createNoteItem(entry);
            notesList.appendChild(item);
        });

    } catch (error) {
        console.error('Failed to load or render data:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadAndRenderLists);
