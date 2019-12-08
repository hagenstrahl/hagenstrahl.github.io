function init() {
    const selectChat = document.querySelector('#selectChat');
    selectChat.addEventListener('change', (event) => {
        const selectedChat = event.target.options[event.target.selectedIndex].value;
        const chatIFrame = document.querySelector('#chat');
        const channel = document.querySelector('#channel');
        switch (selectedChat) {
            case "nochat":
                channel.classList.add('hidden');
                break;
            case "twitch":
                channel.value = localStorage.getItem('twitchChannel');
                channel.classList.remove('hidden');
                break;
            case "youtube":
                channel.value = localStorage.getItem('youtubeChannel');
                channel.classList.remove('hidden');
                break;
            case "restream":
                channel.classList.add('hidden');
                break;
            default:
                break;
        }
    });

    const openChat = document.querySelector('#openChat');
    openChat.addEventListener('click', (event) => {
        const selectChat = document.querySelector('#selectChat');
        const selectedChat = selectChat.options[selectChat.selectedIndex].value;
        const channel = document.querySelector('#channel');
        const channelID = channel.value;
        const chatIFrame = document.querySelector('#chat');
        if (channelID) {
            channel.classList.remove('channel-required');
            switch (selectedChat) {
                case "nochat":
                    chatIFrame.setAttribute('src', `nochat.html`);
                    break;
                case "twitch":
                    localStorage.setItem('twitchChannel', channelID);
                    chatIFrame.setAttribute('src', `https://www.twitch.tv/embed/${channelID}/chat?darkpopout`);
                    break;
                case "youtube":
                    localStorage.setItem('youtubeChannel', channelID);
                    chatIFrame.setAttribute('src', `https://www.youtube.com/live_chat?v=${channelID}&embed_domain=hagenstrahl.github.io`);
                    break;
                case "restream":
                    chatIFrame.setAttribute('src', "https://chat.restream.io/chat");
                    break;
                default:
                    break;
            }
        } else {
            channel.classList.add('channel-required');
        }
    });
}

init();