const btn = document.querySelector('.btn');
const audioElement = document.querySelector('.audio');

// Disable/Enable Btn
const toggleBtn = () => {
    btn.disabled = !btn.disabled;
}

// Pass joke to VoiceRSS API
const tellMe = joke => {
    VoiceRSS.speech({
        key: 'd5b2ef71dc384d13ae9d4889b994d369',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
const getJokes = async () => {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark';
    try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // TTS
        tellMe(joke);
        // Disable Button
        toggleBtn();
    } catch (err) {
        console.log('oops:', err);
    }
}

btn.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleBtn);