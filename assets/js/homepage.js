
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    window.onscroll = function () { myFunction() };

    function myFunction() {
        if (document.documentElement.scrollTop < vh) {
            document.getElementById("container1").className = "";
        }
        if (document.documentElement.scrollTop > vh) {
            document.getElementById("container1").className = "fac";
        }
        if (document.documentElement.scrollTop > 2 * vh) {
            document.getElementById("container1").className = "abt";
        }
        if (document.documentElement.scrollTop > 3 * vh) {
            document.getElementById("container1").className = "team";
        }
    }
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }










// API endpoint for the model
const apiEndpoint = "https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic";

// Function to generate random RGB values
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to draw a pixel with random color
function drawPixel(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 5, 5);
}
var counter = 0;
var limit = 40;
// Function to update the canvas with new colors
function updateCanvas() {
    if (!prompt) {
        // Show error message if prompt is empty
        errorMessage.innerText = "Please enter a prompt";
        return;
    }

    const width = canvas.width;
    const height = canvas.height;

    // Clear the canvas
    context.clearRect(0, 0, width, height);
    counter++;
    const boxSize = 40; // Size of each box (10x10)
    const boxCountX = width / boxSize; // Number of boxes horizontally
    const boxCountY = height / boxSize; // Number of boxes vertically

    // Iterate through each box
    for (let x = 0; x < boxCountX; x++) {
        for (let y = 0; y < boxCountY; y++) {
            const color = getRandomColor();

            // Iterate through each pixel within the current box
            for (let i = 0; i < boxSize; i++) {
                for (let j = 0; j < boxSize; j++) {
                    const pixelX = x * boxSize + i;
                    const pixelY = y * boxSize + j;
                    drawPixel(pixelX, pixelY, color);
                }
            }
        }
    }

    // Call the updateCanvas function again after a delay
    if (counter < limit) {
        // Call the function again after a certain delay
        setTimeout(updateCanvas, 1000);
    }
}

// Function to display the placeholder image
function displayPlaceholderImage() {
    const imageContainer = document.getElementById("image-container");
    const placeholderImage = document.createElement("img");
    placeholderImage.classList.add("placeholder-image");
    placeholderImage.src = "download.png"; // Replace "path_to_sample_image.jpg" with the path to your sample image
    imageContainer.appendChild(placeholderImage);
    imageContainer.style.opacity = 1;
}

// Call the function to display the placeholder image
displayPlaceholderImage();

// Generate image using the model
function generateImage(prompt) {
    const errorMessage = document.getElementById("error-message");
    if (!prompt) {
        // Show error message if prompt is empty
        errorMessage.innerText = "Please enter a prompt";
        return;
    }
    counter = 0;
    canvas.style.display = 'block';
    updateCanvas();


    // Clear error message if prompt is not empty
    errorMessage.innerText = "";
    const headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
    };

    const data = {
        "inputs": prompt,
        "max_iterations": 100,
        "timestep_respacing": "1.0",
        "random_seed": 0,
    };

    // Show the preloader while the image is generating and loading
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = '<div class="preloader"><span style="background-color:#00000000; color:white; font-weight:bold;">Generating...</span></div>';

    $.ajax({
        url: apiEndpoint,
        headers: headers,
        type: "POST",
        data: JSON.stringify(data),
        xhrFields: {
            responseType: 'blob' // Set the response type as blob
        },
        success: function (response) {
            const imageUrl = URL.createObjectURL(response); // Create object URL from the blob
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;

            // Clear the preloader and show the generated image
            imageContainer.innerHTML = "";
            imageContainer.appendChild(imageElement);
            imageContainer.style.opacity = 1;
            imageElement.style.width = '100%';
            imageElement.style.height = '100%';
            imageElement.style.border = '5px solid white';


            // imageContainer.style.width = 'fit-content' 

            console.log("Image generated successfully!");
            canvas.style.display = 'none'
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

// Event listener for the Generate button
document.getElementById("generateBtn").addEventListener("click", function () {
    const prompt = document.getElementById("prompt").value;
    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.style.display = "block"; // Show the canvas container

    canvasContainer.style.width = "fit-content"; // Show the canvas container
    canvasContainer.style.height = "fit-content"; // Show the canvas container

    generateImage(prompt);
});

// Get the canvas element and context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Get the form element
const promptForm = document.getElementById("promptForm");

// Add event listener for form submission
promptForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the prompt value
    const promptInput = document.getElementById("prompt");
    const prompt = promptInput.value;

    // Check if prompt is empty
    if (!prompt) {
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerText = "Please enter a prompt";
        return;
    }

    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.style.display = "block"; // Show the canvas container
    canvasContainer.style.width = "fit-content"; // Show the canvas container
    canvasContainer.style.height = "fit-content"; // Show the canvas container

    generateImage(prompt);
});






    function openWebsite() {
        var websiteURL = 'https://artimas24.vercel.app/';
        window.open(websiteURL, '_blank');
    }
