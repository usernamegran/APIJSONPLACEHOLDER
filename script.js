//jsonplaceholder.typicode.com/posts

async function getPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = '<h1>Carregando Posts...</h1>';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts = await response.json();

    if(posts.length > 0) {
        postArea.innerHTML = '';
        for(let post of posts) {
            postArea.innerHTML += `
                <div class="post">
                    <h1>${post.title}</h1>
                    <p>${post.body}</p>
                    <hr />
                </div>
            `;
        }
    }else{
        postArea.innerHTML = 'Nenhum post encontrado';
    }
}

async function addNewPost(title, body) {
    await fetch('https://jsonplaceholder.typicode.com/posts', 
        {
            headers: {
                'Content-type': 'application/json'
            },
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        })
    });
    document.querySelector('#titlefield').value = '';
    document.querySelector('#bodyfield').value = '';
    getPosts();
        
}

document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titlefield').value;
    let body = document.querySelector('#bodyfield').value;
    if(title && body) {
        addNewPost(title, body);
    }
});


getPosts();