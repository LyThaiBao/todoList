const articleApi = "https://todo-list-api-whgl.onrender.com/article";

fetch(articleApi)
  .then((response) => response.json())
  .then((articles) => {
    console.log(articles);
    var articleThumb = document.querySelector(".article__thumb");
    articleThumb.innerHTML = `<img src="${articles.image}"/>`;
  });
