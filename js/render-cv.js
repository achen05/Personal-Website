fetch('data/cv.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load CV data");
    return response.json();
  })
  .then(data => renderAllSections(data))
  .catch(error => {
    console.error(error);
    document.body.innerHTML = "<p>Failed to load CV.</p>";
  });

function renderSection(containerId, entries) {
  const container = document.getElementById(containerId);
  if (!entries || entries.length === 0) {
    container.innerHTML = ''; // or leave empty if you want to skip rendering entirely
    return;
  }

  

  const sectionEntries = entries.map(entry => {
    return `
      <div class="cv-entry">
        <div class="cv-time-container">
          <p class="cv-entry-text cv-start">${entry.start}</p>
          <p class="cv-entry-text">–</p>
          <p class="cv-entry-text cv-end">${entry.end}</p>
        </div>
        <p class="cv-entry-text cv-title">${entry.title}</p>
        <p class="cv-entry-text cv-organization">${entry.organization}</p>
        <p class="cv-entry-text cv-location">${entry.location}</p>
        <p class="cv-entry-text cv-notes">${entry.notes}</p>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <p class="label">${containerId}</p>
    ${sectionEntries}
  `;
}

function renderAllSections(data) {
  renderSection("education", data.education);
  renderSection("work", data.work);
  renderSection("awards", data.awards);
  renderSection("clients", data.clients);
  renderSection("involvement", data.involvement);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
