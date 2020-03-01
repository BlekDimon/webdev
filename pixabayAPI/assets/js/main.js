import "../../node_modules/popper.js/dist/popper.min.js";
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
const form = document.querySelector("form");
const container = document.querySelector(".photos");
let page = 1;

form.addEventListener("submit", event => {
    event.preventDefault();
    container.innerHTML = "";
    page = 1;
    getResult();
});

document.querySelector(".load-more").addEventListener("click", () => {
    if (page > 1) {
        getResult();
    }
});

const getResult = () => {
    const key = "15437883-8f42aa506ea2c055f4772fa63";
    const q = form.children[1].value.replace(/( )+/g, "+");
    fetch(`https://pixabay.com/api/?key=${key}&q=${q}&image_type=photo&page=${page}&per_page=9&pretty=true`, {
        method: "GET"
    })
        .then(item => item.json())
        .then(item => {
            item.hits.forEach(item => {
                createElement(item.webformatURL, item.pageURL);
            });
        });
    page++;
};

const createElement = (image, page) => {
    container.innerHTML += `
        <a class="item m-3 border col-xl-3 col-lg-3 col-md-4 col-sm-5 col-8" href="${page}" target="_blank" style="background-image: url('${image}')"></a>
    `;
};
