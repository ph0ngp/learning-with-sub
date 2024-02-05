# check information
ffprobe 1.mkv

# ok
# video codec: h264 ok (libx264), if already in this codec then just copy video
# audio codec: needs to be aac. ac3 / eac3 is not ok
# subtitle: from ffprobe, find the subtitle stream then map
ffmpeg -i 1.mkv -c:v copy -c:a aac 1.mp4
ffmpeg -i 1.mkv -map 0:2 1.vtt

# if not ok try this
ffmpeg -i 1.mkv -c:v libx264 -crf 18 -s 1920x1080 -c:a aac 1.mp4
ffmpeg -i 2.mkv -c:v libx264 -crf 18 -s 1920x1080 -c:a aac -c:s mov_text -map 0:0 -map 0:1 -map 0:2 -map 0:6 -map 0:8 2.mp4
# select stream (if not select, default only 1 video and 1 audio stream)
-map 0:0 -map 0:1 -map 0:2 -map 0:6 -map 0:8
# to select different video / audio stream: add options: 0:v for all videos. 0:a:2 for third audio stream
-map 0:v -map 0:a:1 -map 0:a:2
# to ensure that all streams are copied
-map 0

# must run using npm http server
http-server -p 8000