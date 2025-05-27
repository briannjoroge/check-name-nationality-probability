window.onload = function () {
  document.getElementById("search-name").focus();
};

const searchName = document.getElementById("search-name");
const searchButton = document.querySelector(".search-btn");
const outputTag = document.querySelector(".output");

const getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });

searchButton.addEventListener("click", async () => {
  const searchValue = searchName.value;
  if (searchValue === "") {
    outputTag.innerHTML = "Please provide a name.";
    return;
  }

  searchButton.textContent = "Loading....";
  searchButton.setAttribute("disabled", true);
  try {
    const feedback = await fetch(
      `https://api.nationalize.io/?name=${searchValue}`,
    );
    const feedbackData = await feedback.json();
    outputTag.innerHTML = `<span>${feedbackData.name}</span> is from <span> ${getCountryNames.of(feedbackData.country[0].country_id)}</span> with <span>${Math.floor(feedbackData.country[0].probability * 100)}</span>% certainity.`;
  } catch (error) {
    outputTag.textContent = "Name not defined or no country data found.";
  } finally {
    searchButton.removeAttribute("disabled", false);
    searchButton.innerHTML = `<i class="fa-brands fa-searchengin"></i>Search`;
  }

  // console.log(feedbackData)
});
