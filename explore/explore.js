const articleApi = "https://todo-list-api-whgl.onrender.com/article";

fetch(articleApi)
  .then((response) => response.json())
  .then((article) => {
    console.log(article.status);
    var articleThumb = document.querySelector(".article__thumb");
    articleThumb.innerHTML = `<img src="${article.image}"/>`;
  });
function start() {
  getArticle(reRenderArticle);
}
function getArticle(callback) {
  fetch(articleApi)
    .then((response) => response.json())
    .then(callback);
}

function reRenderArticle(articles) {
  articles.map(
    (article) => `
      <div class="article__item">
          <h4 class="article__status">${article.status}</h4>
          <div class="article__thumb">
            <img src="${article.image}" alt="" /> 
          </div>
          <div class="article__cta">
            <span class="article__like">
              <i class="fa-regular fa-heart"></i>
              0
            </span>
            <span class="article__comment">
              <i class="fa-solid fa-comments"></i>
            </span>
          </div>
      </div>
`
  );
}
