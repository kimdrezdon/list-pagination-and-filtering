/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const pageDiv = document.querySelector("div.page");
const headerDiv = document.querySelector("div.page-header");
const studentList = document.querySelectorAll("li.student-item");
const studentNames = document.querySelectorAll("h3");

//Creates search component at top of page

const searchDiv = document.createElement("div");
searchDiv.className = "student-search";
headerDiv.appendChild(searchDiv);

const input = document.createElement("input");
input.placeholder = "search for students...";
searchDiv.appendChild(input);

const button = document.createElement("button");
button.textContent = "search";
searchDiv.appendChild(button);

//Creates div to store No Results message, defaults it to hidden

const noResultsDiv = document.createElement("div");
pageDiv.appendChild(noResultsDiv);
noResultsDiv.innerHTML =
  '<p style = "font-style: italic">No results' +
  " were found. Please try another search.</p>";
noResultsDiv.style.display = "none";

//Displays only ten students at a time, based on the page selected

const showPage = (list, page) => {
  const firstIndex = page * 10 - 10;
  const lastIndex = page * 10 - 1;

  for (let i = 0; i < list.length; i++) {
    if (i >= firstIndex && i <= lastIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

/*
Creates the correct number of page links based on the total number of
students in a list, and calls the showPage function when each link is
clicked
*/

const appendPageLinks = list => {
  const totalPages = Math.ceil(list.length / 10);

  const linkDiv = document.createElement("div");
  linkDiv.className = "pagination";
  pageDiv.appendChild(linkDiv);

  const ul = document.createElement("ul");
  linkDiv.appendChild(ul);

  for (let i = 0; i < totalPages; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    const a = document.createElement("a");
    const pageNum = i + 1;
    a.textContent = pageNum;
    a.href = "#";
    li.appendChild(a);
  }

  const pageLinks = document.querySelectorAll("a");
  pageLinks[0].className = 'active';

  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].addEventListener("click", e => {
      for (let i = 0; i < pageLinks.length; i++) {
        pageLinks[i].className = "";
      }
      const activePage = e.target;
      activePage.className = "active";
      const activePageNum = i + 1;
      showPage(list, activePageNum);
    });
  }
};

/*
Calls the showPage and appendSearch function so the initial page load
will display page 1 of the student list and the search component
*/

showPage(studentList, 1);

appendPageLinks(studentList);

/*
Searches/filters student list by finding partial matches to user's input
and displays the correct number of page links based on the results
*/

const filter = () => {
  const userInput = input.value.toUpperCase();
  const filteredList = [];
  const linkDiv = document.querySelector("div.pagination");
  let results = false;

  for (let i = 0; i < studentNames.length; i++) {
    if (studentNames[i].textContent.toUpperCase().includes(userInput)) {
      studentList[i].style.display = "";
      filteredList.push(studentList[i]);
      results = true;
    } else {
      studentList[i].style.display = "none";
    }
  }
  if (results === true) {
    noResultsDiv.style.display = "none";
  } else {
    noResultsDiv.style.display = "";
  }

  pageDiv.removeChild(linkDiv);
  showPage(filteredList, 1);
  appendPageLinks(filteredList);
};

/*
Adds event listeners to search component so users can either click
or press Enter/Return to submit their search
*/

button.addEventListener("click", () => {
  filter();
});

input.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    filter();
  }
});
