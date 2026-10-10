const select = document.getElementById("breed-select");
const img = document.getElementById("dog-image");

// Fetch all breeds and populate the dropdown
async function loadBreeds() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        const breeds = Object.keys(data.message); // e.g. ["affenpinscher", "african", ...]

        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed;
            option.textContent = breed;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Failed to load breeds:", error);
    }
}

// Fetch a random photo when a breed is selected
select.addEventListener("change", async (event) => {
    const breed = event.target.value;
    if (!breed) return;

    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();
        img.src = data.message; // the image URL
    } catch (error) {
        console.error("Failed to load dog photo:", error);
    }
});

loadBreeds();