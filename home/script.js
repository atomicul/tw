const container = document.querySelector('.outer');

main()

async function main() {
    const response = await fetch('memes.json')
    const memes = await response.json()

    memes.forEach(meme => {
        const card = createMemeCard(meme);
        container.appendChild(card);
    });
}


function createMemeCard(meme) {
    const card = document.createElement('article');
    card.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');

    const header = document.createElement('header');
    header.classList.add('title');

    const h3 = document.createElement('h3');
    h3.textContent = meme.title;

    const h4 = document.createElement('h4');
    h4.textContent = `#${meme.year}`;

    header.appendChild(h3);
    header.appendChild(h4);
    info.appendChild(header);

    if (meme.type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.src = meme.source;
        iframe.title = meme.description;
        
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('allowfullscreen', '');
        
        info.appendChild(iframe);
    } else if (meme.type === 'image') {
        const img = document.createElement('img');
        img.src = meme.source;
        img.alt = meme.description;
        
        info.appendChild(img);
    }

    card.appendChild(info);

    return card;
}
