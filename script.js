const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "in";
const options = [
  "entertainment",
  "health",
  "science",
  "sports",
];

let requestURL;
const apiKey = "d67ece2f635f4e6d973b58aca7c4e778"; // Replace 'YOUR_API_KEY' with your actual API key

const generateUI = (articles) => {
  container.innerHTML = "";
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card", "bg-white", "shadow-md", "rounded-lg", "overflow-hidden");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" class="w-full h-40 object-cover" />
    </div>
    <div class="news-content p-4">
      <div class="news-title font-semibold text-lg text-gray-900 mb-2">${item.title}</div>
      <div class="news-description text-sm text-gray-700">${item.description || item.content || ""}</div>
      <a href="${item.url}" target="_blank" class="view-button mt-2 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};

const getNews = async () => {
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error("Data unavailable at the moment. Please try again later");
    }
    let data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""} px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2 mb-2 hover:bg-gray-300 focus:outline-none focus:bg-gray-300" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  createOptions();
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  getNews();
};

window.onload = init;
