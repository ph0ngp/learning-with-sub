# Learn language with movies and subtitles

This tool helps you learn a language by watching movies with subtitles, making it easy to look up word meanings and repeat each conversation sentence until you fully understand it.

### How to setup

- Inside `video/`, create new folder named `0`.
- You need to have your movie file and subtitle file ready in the below format. If you don't have them in these formats, look at `script.sh` for converting commands.
- Put `0.mp4`, `0.vtt`, `0v.vtt` in `video/0/`
    - `0.mp4` is the movie file
        - video codec: must be h264 (libx264)
        - audio codec: needs to be aac. ac3 / eac3 will not work
    - `0.vtt` is the subtitle file
    - `0v.vtt` is the 2nd subtitle file (optional, for example for another language)
- Install https://www.npmjs.com/package/http-server
- Run `http-server` in the project folder
- On browser, open http://127.0.0.1:8080/a.html

### Features
- First button: seek the video to the start of the subtitle line
- Second button: select all the text in the subtitle line
- If you scroll the current subtitle line out of view, when you move your cursor out of the subtitle view (inside the video view) and let the video continue to play, on the next subtitle line, the subtitle view will automatically scroll to the current subtitle line

### Screenshot