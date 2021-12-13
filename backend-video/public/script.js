const socket = io('/')

var startScreenShare = document.getElementById('startScreenShare');
//var mute = document.getElementById('mute');
//var camera = document.getElementById('camera');
const videoGrid = document.getElementById('video-grid')
const stopVideo = document.querySelector("#camera");
const muteButton = document.querySelector("#mute");

const myPeer = new Peer(undefined, {
    host: '/',
    port: '5001'
})

const ids = []

const myVideo = document.createElement('video');

myVideo.muted = true;
myVideo.controls = "controls";
let myVideoStream;
const peers = {}

navigator.mediaDevices.getUserMedia({ 
    video: true,
    audio: true
}).then(stream => {
    myVideoStream=stream;
    addVideoStream(myVideo,stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')        
        
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        ids.push(userId)
        connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected',userId => {
    console.log("User Disconnected") 
    if(peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room',ROOM_ID,id)
})

function connectToNewUser(userId,stream) {
    const call = myPeer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
        console.log("Removing Video")
        video.remove()
    })
    peers[userId] = call
}

function addVideoStream(video,stream) {
    video.srcObject = stream
    video.controls = "controls"
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

stopVideo.onclick = (e) => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        html = `<button class="fas fa-video-slash"></button>`;
        stopVideo.classList.toggle("background__red");
        stopVideo.innerHTML = html;
    }else{
        myVideoStream.getVideoTracks()[0].enabled = true;
        html = `<button class="fas fa-video"></button>`;
        stopVideo.classList.toggle("background__red");
        stopVideo.innerHTML = html;
    }

}
muteButton.onclick = (e) => {
    console.log("clicked mute");
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        html = `<button class="fas fa-microphone-slash"></button>`;
        mute.classList.toggle("background__red");
        mute.innerHTML = html;
    }else{
        myVideoStream.getAudioTracks()[0].enabled = true;
        html = `<button class="fas fa-microphone"></button>`;
        mute.classList.toggle("background__red");
        mute.innerHTML = html;
    }

}
startScreenShare.onclick = (e) => {
    console.log("Clicked startScreenShare")
    initiator = true;
    socket.emit('initiate');
}


socket.on('initiate', () => {
    console.log("Starting stream")
    startScreenSharing();
})

function makeLabel(label) {
    var vidLabel = document.createElement('div');
    vidLabel.appendChild(document.createTextNode(label));
    vidLabel.setAttribute('class', 'videoLabel');

    return vidLabel;
}

function startScreenSharing() {
    if (initiator) {
        console.log(myPeer.connections)
        console.log(ids)

        navigator.mediaDevices.getDisplayMedia({cursor: true}).then(stream => {
            myVideo.srcObject = stream;
            myVideo.controls = "controls";
            myVideo.play()

            for (let i = 0; i < ids.length; i++) {
                console.log("Appending video to all of the grids")
                myPeer.call(ids[i], stream)
            }
            

            stream.getVideoTracks()[0].onended = function () {
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(stream => {
                    myVideo.srcObject = stream;
                    myVideo.controls = "controls";
                    myVideo.play()

                    // myPeer.disconnect()
                    // for (let i = 0; i < ids.length; i++) {
                    //     console.log("Trying to remove the video")
                    //     // myPeer.call(ids[i], stream)
                    //     myPeer.disconnect()
                    // }

                    

                })
            };
        })
      } else {
        console.log("NULLLLL")
      }
}


