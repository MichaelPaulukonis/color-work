// from https://stackabuse.com/working-with-images-in-node-js-graphicsmagick-and-imagemagick/

const sharp = require('sharp');
const fs = require('fs');

const datestring = () => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hour = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    const secs = String(d.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}${hour}${min}${secs}`
}

const sourceDir = './images/input/'
const outDir = './images/output/'

sharp(sourceDir + "20201110083027_0022.png")
    .negate({ alpha: false })
    .tint({r: 0, g: 255, b: 255})
    .negate({ alpha: false })
    // .extractChannel('green')
    // .toColourspace('srgb')
    // .tint({ r: 0, g: 255, b: 255})
    // .negate({ alpha: false })
    .toFile(outDir + `green_${datestring()}.png`);

// gm(sourceDir + "20201110083027_0022.png")
//     // .resize(200)
//     // .write('resized_img_width_only_gm.jpg', function (err) {
//     //     if (err) console.log(err);
//     //     console.log("Done!")
//     // });
//     .colorspace('CMYK')
//     .channel('Cyan')
//     .colorize('0/0/50')
//     .write(outDir + `cyan_${datestring()}.png`, function (err) {
//         if (err) console.log(err);
//         console.log("Done!")
//     });
