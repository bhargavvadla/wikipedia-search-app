let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createEachItem(item) {
    let {
        link,
        title,
        description
    } = item;

    //Create result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //Create result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.textContent = title;
    resultTitleEl.target = "_blank";
    resultTitleEl.href = link;
    // resultTitleEl.href=link;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);
    //Create result-titleBr
    let titleBrEl = document.createElement("br");
    resultItemEl.appendChild(titleBrEl);
    //Create result-link
    let resultLinkEl = document.createElement("a");
    resultLinkEl.textContent = link;
    resultLinkEl.href = link;
    resultLinkEl.classList.add("result-url");
    resultItemEl.appendChild(resultLinkEl);

    //Create result-linkBr
    let linkBrEl = document.createElement("br");
    resultItemEl.appendChild(linkBrEl);

    //Create result-description
    let resultDescriptionEl = document.createElement("p");
    resultDescriptionEl.textContent = description;
    resultDescriptionEl.classList.add("result-description");
    resultItemEl.appendChild(resultDescriptionEl);
}


function createAndAppendResult(searchResult) {
    searchResults.innerHTML = "";
    for (let item of searchResult) {
        createEachItem(item);
    }
}


function wikiSearch(searchValue) {
    spinnerEl.classList.remove("d-none");
    searchResultsEl.classList.add("d-none");

    let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
    let options = {
        method: "GET"
    }

    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            let {
                search_results
            } = jsonData;
            createAndAppendResult(search_results);
            spinnerEl.classList.add("d-none");
            searchResultsEl.classList.remove("d-none");
        })

}

function onKeyDown(e) {
    if (e.key === "Enter") {
        let updatedSearchInputEl = document.getElementById('searchInput');
        wikiSearch(updatedSearchInputEl.value);
    }
}

searchInputEl.addEventListener("keydown", onKeyDown);