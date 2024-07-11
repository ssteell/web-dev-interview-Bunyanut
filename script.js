const API_KEY = "va0T74hb1enxfqQOeGBvSsvHcpfdOjdNqrJT8Q3c";

document.getElementById("search").addEventListener("click", fetchAPODs);

function fetchAPODs() {
  const monthInput = document.getElementById("month").value;
  if (!monthInput) {
    alert("Please select month and year.");
    return;
  }

  const [year, month] = monthInput.split("-");
  const startDate = `${year}-${month}-01`;
  const endDate = `${year}-${month}-${new Date(year, month, 0).getDate()}`;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayAPODs(data))
    .catch((error) => {
      console.error("Error fetching APODs:", error);
    });
}

function displayAPODs(apods) {
  console.log("📌 ~ apods:", apods);
  const apodList = document.getElementById("apodList");
  apodList.innerHTML = "";

  apods.forEach((apod) => {
    const apodHTML = `
                  <div class="apod-item">
                      <h3>${apod.title}</h3>
                      <p>Date: ${apod.date}</p>
                      <img src="${apod.url}" alt="${apod.title}">
                      <p>${apod.explanation}</p>
                      <hr></hr>
                  </div>
              `;
    apodList.innerHTML += apodHTML;
  });
}
