document.addEventListener('DOMContentLoaded', function () {
    // Load the modal HTML from an external file
    fetch('html/modal.html')
        .then(response => response.text())
        .then(data => {
            // Inject the modal HTML into the modal-container div
            document.getElementById('modal-container').innerHTML = data;

            // Modal HTML is now loaded; setup event delegation
            setupModalFunctionality();
        })
        .catch(error => console.error('Error loading modal:', error));
});

function setupModalFunctionality() {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modalImage");

    // Attach a single event listener to the document body
    document.body.addEventListener("click", function (event) {
        // Check if the clicked element has the 'modal-trigger' class
        if (event.target.classList.contains("modal-trigger")) {
            modal.style.display = "flex";
            modalImg.src = event.target.src; // Set modal image source
        }

        // Close the modal if the clicked element is the close button or outside the modal
        if (event.target.classList.contains("close") || event.target === modal) {
            modal.style.display = "none";
        }
    });
}

