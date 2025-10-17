import { readFileSync, writeFileSync } from 'fs';

async function main() {
    
    // Get image as buffer of bytes
    const imageBuffer = readFileSync("example_code/heic2png/image.heic");

    // Convert buffer to base64
    const base64 = imageBuffer.toString('base64');

    // Send POST fetch request with 
    var response = await fetch(
        "http://localhost:5006/p/heic2png", 
        {
            method: "POST", 
            body: JSON.stringify({ heic: base64 }),
            headers: {'Content-Type': 'application/json'}
        });

    // Get the response; a base64 png
    const { png } = await response.json(); 

    // Log the base64
    console.log(png);
    // Write the png file
    writeFileSync("example_code/heic2png/image.png", Buffer.from(png, 'base64'));
}

await main();