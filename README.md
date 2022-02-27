# Working with color

Working with color

I was able to do a task (split image into separate channels and convert to white + target color)
via ImageMagick

But cannot replicate this task in GraphicksMagick (and thus gm.js) nor Sharp (node image processing lib)

So, back to scripting it in the shell.

:::sigh:::

## docs

- <https://github.com/aheckmann/gm#readme>
- <https://aheckmann.github.io/gm/docs.html>


## channels

- `gm("img.png").channel(type)`
  - channel: Red, Green, Blue, Opacity, Matte, Cyan, Magenta, Yellow, Black, or Gray

- `gm("img.png").colorspace(val)`
  - <http://www.graphicsmagick.org/GraphicsMagick.html#details-colorspace>
  - Choices are: CineonLog, CMYK, GRAY, HSL, HWB, OHTA, RGB, Rec601Luma, Rec709Luma, Rec601YCbCr, Rec709YCbCr, Transparent, XYZ, YCbCr, YIQ, YPbPr, or YUV.

- <http://www.graphicsmagick.org/FAQ.html#how-can-i-extract-and-combine-cmyk-channels-in-a-cmyk-image>

```
gm convert cmyk.jpg -channel cyan cyan.tiff
gm convert cmyk.jpg -channel magenta magenta.tiff
gm convert cmyk.jpg -channel yellow yellow.tiff
gm convert cmyk.jpg -channel black black.tiff
and then we can join them back together:

gm composite -compose CopyMagenta magenta.tiff cyan.tiff result.tiff
gm composite -compose CopyYellow yellow.tiff result.tiff result.tiff
gm composite -compose CopyBlack black.tiff result.tiff result.tiff
```

### ImageMagick CLI
```
convert CMYK-Chart.png -colorspace cmyk -channel c -negate -separate channel_c.png
convert CMYK-Chart.png -colorspace cmyk -channel m -negate -separate channel_m.png
convert CMYK-Chart.png -colorspace cmyk -channel y -negate -separate channel_y.png
convert CMYK-Chart.png -colorspace cmyk -channel k -negate -separate channel_k.png

convert channel_c.png +level-colors cyan,white channel_c_colored.png
convert channel_m.png +level-colors magenta,white channel_m_colored.png
convert channel_y.png +level-colors yellow,white channel_y_colored.png
```

## IM scripts
- `./lichtenstein -p 6 -d h16x16o ../images/input/20201110083027_0022.png ../images/output/lich.png`
  - <https://legacy.imagemagick.org/Usage/bugs/ordered-dither/>

-  <http://www.fmwconcepts.com/imagemagick/index.php>
- <http://www.fmwconcepts.com/imagemagick/spots/index.php>
