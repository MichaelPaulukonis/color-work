# Working with color

Working with color

I was able to do a task (split image into separate channels and convert to white + target color)
via ImageMagick

But cannot replicate this task in GraphicksMagick (and thus gm.js) nor Sharp (node image processing lib)

So, back to scripting it in the shell.

:::sigh:::


## references

- <https://legacy.imagemagick.org/Usage/color_basics/>
- <https://imagemagick.org/script/formats.php>
- <https://legacy.imagemagick.org/Usage/color_basics/#separate>
- <https://legacy.imagemagick.org/Usage/color_mods/#level>
- <https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=28146>
- <https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=28386>



### ImageMagick CLI

- [source](https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=28386)

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


## slice 'em up

- `convert rose: -crop 3x3@  +repage  +adjoin  rose_3x3@_%d.gif`

`convert ./images/input/20201110083027_0039.png -crop 10x10@ +repage +adjoin tiles_%d.jpg`

convert ./images/input/VideoAE2022_02_11_10_17_29_exported_1900.jpg -crop 10x10@ +repage +adjoin tiles_%d.jpg


VideoAE2022_02_11_10_17_29_exported_1900.jpg

## gm docs

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


## blending from image to image

Script doesn;t work in zsh. Math issues that are beyond me.

```
./blendshow.sh sluggo*.png | grep ffmpeg | sh

./blendshow.sh ~/Downloads/color_frames/*.png | grep ffmpeg | sh
```

Setting the `t` value to 0 doesn't work. At least it ran for 8+ minutes and had only processed 1/10 of the frames
But 0.1 works great!

```
ffmpeg -i example.mkv -c copy example.mp4

ffmpeg -i colors.blend.only.mkv -c copy colors.blend.only.mp4
```