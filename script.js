// Get all posts and render them on the page
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const postList = document.getElementById('post-list');
    posts.forEach(post => {
      const postItem = document.createElement('li');
      postItem.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p><button class="comment-btn" data-post-id="${post.id}">View comments</button>`;
      postList.appendChild(postItem);
    });
  });

// Add event listener to the comment button
document.addEventListener('click', async event => {
  if (event.target.classList.contains('comment-btn')) {
    const postId = event.target.dataset.postId;
    const commentList = document.createElement('ul');
    const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json());
    comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.innerHTML = `<strong>${comment.name}:</strong> ${comment.body}`;
      commentList.appendChild(commentItem);
    });
    event.target.parentNode.appendChild(commentList);
    event.target.disabled = true;
  }
});
