const form = document.getElementById('inputForm');
const input = document.getElementById('floatingText');
const msg = document.querySelector('.msg');
const list = document.querySelector('.card_cities');
const apiKey = "6ed19f49ad9e548fa2f383937f7a09e5";


form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const div = document.createElement('div');
            div.classList.add("col-12", "col-sm-6", "col-md-4")
            const card = `
            <div class="card position-relative h-100 shadow">
                        <div class="card-header  h4 display-6">${name}</div>
                        <span class="badge rounded-pill bg-dark position-absolute top-0 end-0 fs-6 translate-middle">${sys.country}</span>
                        <div class="card-body">
                            <p class="h2 display-1 mb-3">${Math.round(main.temp)}<small>&degc</small></p>
                            <img src="${icon}" alt="weather icon">
                            <p class="fs-3 display-6 mt-3">${weather[0]["description"]}</p>
                        </div>
            </div>`;
            div.innerHTML = card;
            list.appendChild(div);
            msg.innerText = "";
        })
        .catch(() => {
            msg.innerText = "Search for a valid City!";
        });
    input.value = "";
});