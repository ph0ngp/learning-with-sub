// const timestamp = document.querySelector("#timestamp")
// const text = document.querySelector("#text")
const caption_list = document.querySelector("#caption_list")

const my_video = document.querySelector("#my_video")
const text_track = my_video.textTracks[0]
text_track.mode = "hidden"
// console.log(text_track)

const TIME_TO_RETRY = 25
setTimeout(startup, TIME_TO_RETRY)

function startup() {
    const cues = text_track.cues
    if (cues.length === 0) {
        console.log('Cues not loaded. Trying again...')
        setTimeout(startup, TIME_TO_RETRY)
    } else {
        console.log('Total lines:', cues.length)
        let i = 0
        for (const line of cues) {
            // console.log(i, line.text)
            const newDiv = document.createElement('div')
            const roundedTime = roundTimestamp(line.startTime)
            newDiv.id = 'caption_'+ roundedTime
            newDiv.className = 'caption'
            newDiv.setAttribute("index",i);
            caption_list.appendChild(newDiv)
            const timeDiv = document.createElement('div')
            // timeDiv.textContent = secondsToTime(roundedTime)
            timeDiv.className = 'caption_child caption_time'
            timeDiv.addEventListener("click", function(){
                my_video.currentTime = roundedTime
            })
            newDiv.appendChild(timeDiv)
            const selectDiv = document.createElement('div')
            selectDiv.className = 'caption_child caption_time'
            newDiv.appendChild(selectDiv)
            const textDiv = document.createElement('div')
            textDiv.textContent = line.text
            textDiv.className = 'caption_child caption_text'
            newDiv.appendChild(textDiv)
            selectDiv.addEventListener("click", function(){
                window.getSelection().selectAllChildren(textDiv)
            })
            i += 1
        }
        caption_list.style.height = getRangeHeight(caption_list.children[0],0,1)+'px'
    }
}


let active_div
document.querySelector("#my_track").addEventListener("cuechange", event => {
  const active_cues = event.target.track.activeCues
  if (active_cues.length > 0) {
    if (active_div) {
        active_div.classList.remove("active")
    }
    active_div = document.querySelector('#caption_'+String(roundTimestamp(active_cues[0].startTime)).replace('.','\\.'))
    active_div.classList.add('active')
    if (!caption_list.matches(":hover")){
        // if not hovering
        scrollToCurrentLine()
    }
  }
})

function scrollToCurrentLine(){
    if (active_div){
        active_div.scrollIntoView({behavior: "smooth", block: "center"})
    }
}

// caption_list.addEventListener("mouseenter", function( event ) {
// })

// caption_list.addEventListener("mouseleave", function( event ) {
//     // if move mouse out of caption list
//     scrollToCurrentLine()
// })

document.addEventListener('keyup', event => {
    if (document.activeElement !== my_video) {
        switch (event.code) {
            case 'Space':
                my_video.paused ? my_video.play() : my_video.pause()
                break
            case 'ArrowRight':
                my_video.currentTime += 5
                break
            case 'ArrowLeft':
                my_video.currentTime -= 5
                break
        }
    }
})

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        if (document.activeElement !== my_video) {
            event.preventDefault();
            // prevent scrolling
        }
    }
})

function roundTimestamp(num) {
    return parseFloat(num.toFixed(3))
}

function secondsToTime(e){
    let h = Math.floor(e / 3600).toString().padStart(2,'0'),
        m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
        s = Math.floor(e % 60).toString().padStart(2,'0');
    let res = m + ':' + s
    if (h==='00') {
        return res
    } else {
        return h + ':' + res
    }
    //return `${h}:${m}:${s}`;
}

function getElementHeight(element, offset){
    let elem = element
    if (offset > 0){
        while (offset > 0) {
            elem = elem.nextElementSibling
            if (!elem) {
                return 0
            }
            offset -= 1
        }
    } else if (offset < 0){
        while (offset < 0) {
            elem = elem.previousElementSibling
            if (!elem) {
                return 0
            }
            offset += 1
        }
    }
    return elem.offsetHeight
}

function getRangeHeight(element, begin, end){
    let result = 0
    for (let i = begin; i <= end; i++) {
        result += getElementHeight(element, i)
    }
    return result
}