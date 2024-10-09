const API_KEY = '44ed81f31ec340de8a53e4fef9864583';
const resultContainer = document.querySelector('.result-container');
const searchForm = document.querySelector('.form-control');
const loader = document.querySelector('.loader');

window.addEventListener('DOMContentLoaded', () => {
  const headlineUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  const headlineData = getData(headlineUrl);

  headlineData
    .then((data) => renderResult(data))
    .catch((err) => renderError(err));
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formValue = document.getElementById('search').value;
  const searchUrl = `https://newsapi.org/v2/everything?q=${formValue}&sortBy=popularity&apiKey=${API_KEY}`;

  let title = document.querySelector('.title-bar');
  console.log(title);
  title.innerText = 'Search Results';

  resultContainer.innerHTML = '';
  const searchData = getData(searchUrl);

  searchData
    .then((data) => {
      renderResult(data);
    })
    .catch((err = renderError(err)));
});

async function getData(url) {
  loader.classList.add('show');
  const response = await fetch(url);
  const data = await response.json();
  loader.classList.remove('show');

  return data;
}

function renderResult(data) {
  console.log(data);
  let renderCount = 9;
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card-wrapper');

  if (data.articles.length < 9) {
    renderCount = data.articles.length;
  }

  if (data.articles.length == 0) {
    renderError('Sorry, could not find any news');
  }

  for (let i = 0; i < renderCount; i++) {
    let cardContent = document.createElement('div');
    cardContent.classList.add('result-card');

    cardContent.innerHTML = `
    <div class="card-image">
      <img src="${data.articles[i].urlToImage}" alt="content-image">
    </div>
    <div class="card-desc">
      <h2>${data.articles[i].title}</h2>
      <div class="author">
        <p><span>${data.articles[i].author}</span> - <span>${data.articles[i].publishedAt}</span></p>
      </div>
      <p>${data.articles[i].description}</p>
      <a href="${data.articles[i].url}" target="_blank" class="details-btn">Read more...</a>
    </div>
    `;

    // cardWrapper.innerHTML = cardContent;
    cardWrapper.append(cardContent);
  }

  resultContainer.append(cardWrapper);
}

function renderError(err) {
  let errorContainer = document.createElement('h2');
  errorContainer.innerText = err;
  errorContainer.classList.add('error');

  resultContainer.append(errorContainer);
}
