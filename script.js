async function fetchAIResponse() {
    const response = await fetch('http://localhost:8000/api'); // Adjust the URL according to your Rust backend setup
    const data = await response.text();
    document.getElementById('ai-output').innerText = data;
}

document.addEventListener('DOMContentLoaded', fetchAIResponse);
