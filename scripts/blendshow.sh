#!/bin/bash

# create a slideshow from images, with nice blending
# using MLT or ffmpeg
# adapted from https://superuser.com/a/834035
#
# beware of the ffmpeg command, it eats memory quickly
#
# https://gist.github.com/bikubi/593ccf504a610518b5af29a530c907c5
#

# USAGE
# 1 pass images as arguments
# 2 pick command: ffmpeg / melt
# 3 pipe to sh
# e.g.:
# meltimagesslideshowbob.sh image*.png | grep ^melt | sh

# TODO
# - make parameters more flexible
#     - durations (currently 5s+1s @ 25fps)
#     - encoding params (currently MKV, crf=18, tune=fastdecode)
#     - output filename (currently out.mkv)
# - make profile more flexible (maybe generate via imagemagick)
# - investigate mlt scaling filters (seems to be point/nearest by default?)
# - "wrap around" (workaround: make a symlink: last image => first image)
# - better variable names :)
#
# FIXME
# - why does melt output a file with 1kfps?!

dir=$(dirname "$0")
input=""
filter1=""
filter2="[0:v]"
dur="0.5"
a=0
melt=""
meltout=$((7*25))
meltmix=25
for arg in "$@"; do
	input="$input -loop 1 -t 0.1 -i \"$arg\""
	melt="$melt\"$arg\""
	if [ $a -gt 0 ]; then
		filter1="$filter1[$a:v][$(($a-1)):v]blend=all_expr='A*(if(gte(T,$dur),1,T/$dur))+B*(1-(if(gte(T,$dur),1,T/$dur)))'[b${a}v]; "
		filter2="$filter2[b${a}v][$a:v]"
		melt="$melt out=$meltout -mix $meltmix -mixer luma "
	else
		melt="$melt out=$(($meltout-$meltmix)) "
	fi
	a=$(($a+1))
done
ffmpegcmd="ffmpeg $input -filter_complex \"$filter1${filter2}concat=n=$(($a*2-1)):v=1:a=0,format=yuv444p[v]\" -map \"[v]\" out.mkv"
meltcmd="melt -verbose -profile $dir/mlt_profile $melt -consumer avformat:out.mkv crf=18 an=1 tune=fastdecode"
echo "$ffmpegcmd"
echo "$meltcmd"