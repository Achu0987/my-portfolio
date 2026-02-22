import sharp from 'sharp';
import fs from 'fs';

async function processImage(inputPath, minBrightness) {
    try {
        const { data, info } = await sharp(inputPath, { limitInputPixels: false })
            .raw()
            .toBuffer({ resolveWithObject: true });

        const range = 255 - minBrightness;

        // Iterate through pixels (RGBA = 4 channels)
        for (let i = 0; i < data.length; i += 4) {
            // Only process non-transparent pixels
            if (data[i + 3] > 0) {
                // Apply the exact same logic from softenBlackLines
                data[i] = Math.round(minBrightness + (data[i] / 255) * range);       // R
                data[i + 1] = Math.round(minBrightness + (data[i + 1] / 255) * range); // G
                data[i + 2] = Math.round(minBrightness + (data[i + 2] / 255) * range); // B
            }
        }

        // Save back to webp
        await sharp(data, {
            raw: {
                width: info.width,
                height: info.height,
                channels: 4
            }
        })
            .webp({ quality: 90 }) // High quality WebP
            .toFile(inputPath);

        console.log(`Zaktualizowano: ${inputPath}`);
    } catch (err) {
        console.error(`Błąd podczas przetwarzania ${inputPath}:`, err);
    }
}

// Uruchamiamy z parametrem 120 (Twój stary LINE_SOFTNESS)
async function run() {
    await processImage('./public/textures/contact/faletopdown.webp', 120);
    console.log("Gotowe!");
}

run();
