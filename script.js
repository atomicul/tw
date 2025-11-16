const audio = document.getElementById('audio');
const body = {
    animate: function() {
        document.body.classList.add('animation-active')
    }
}

const gif = {
    get element() {
        return document.getElementById('dog')
    },
    get animatedSrc() {
        return this.element.dataset.animated
    },
    preload: function() {
        const img = new Image()
        img.src = this.animatedSrc
    },
    animate: function() {
        this.element.src = this.animatedSrc
    }

}

gif.preload()

function play() {
    const afterPlay = () => {
        gif.animate();
        body.animate();
    }

    audio.volume = 1;
    audio.play()
        .then(afterPlay)
}

play()
