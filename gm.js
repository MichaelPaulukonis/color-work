// from https://stackabuse.com/working-with-images-in-node-js-graphicsmagick-and-imagemagick/

const fs = require('fs');
const gm = require('gm') // .subClass({ imageMagick: true });

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

gm(sourceDir + "20201110083027_0022.png").size(function (err, value) {
    console.log(value);

    if (err) {
        console.log(err);
    }
});

gm(sourceDir + "20201110083027_0022.png")
    // .resize(200)
    // .write('resized_img_width_only_gm.jpg', function (err) {
    //     if (err) console.log(err);
    //     console.log("Done!")
    // });
    .colorspace('CMYK')
    .channel('Cyan')
    .colorize('0/0/50')
    .write(outDir + `cyan_${datestring()}.png`, function (err) {
        if (err) console.log(err);
        console.log("Done!")
    });
