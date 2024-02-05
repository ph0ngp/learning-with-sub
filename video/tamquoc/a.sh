# ffmpeg -i 2.mkv -c:v copy -c:a aac 2.mp4
# ffmpeg -i 3.mkv -c:v copy -c:a aac 3.mp4
# ffmpeg -i 4.mkv -c:v copy -c:a aac 4.mp4
# ffmpeg -i 5.mkv -c:v copy -c:a aac 5.mp4
# ffmpeg -i 6.mkv -c:v copy -c:a aac 6.mp4

# ffmpeg -i 2.mkv -map 0:1 2o.vtt
# ffmpeg -i 3.mkv -map 0:1 3o.vtt
# ffmpeg -i 4.mkv -map 0:1 4o.vtt
# ffmpeg -i 5.mkv -map 0:1 5o.vtt
# ffmpeg -i 6.mkv -map 0:1 6o.vtt

if [ $# -ne 1 ]; then
    echo "FAILED: require 1 argument. You have $# arguments"
else
    ffmpeg -i ${1}.mkv -c:v copy -c:a aac ${1}.mp4
    ffmpeg -i ${1}.mkv -map 0:1 ${1}o.vtt
    python sub.py ${1}
    rm ${1}o.vtt
fi