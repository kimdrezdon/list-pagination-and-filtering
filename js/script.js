/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const pageDiv = document.querySelector("div.page");
const headerDiv = document.querySelector("div.page-header");
const studentList = document.querySelectorAll("li.student-item");
const studentNames = document.querySelectorAll("h3");
let studentsPerPage = 10;

// Creates an element and appends it to the page

const appendElement = (tag, parent, elementClass, placeHolder) => {
  let newElement = document.createElement(tag);
  if (elementClass) {
    newElement.className = elementClass;
  }
  if (placeHolder) {
    newElement.placeholder = placeHolder;
  }
  return parent.appendChild(newElement);
}

// Hides or shows an element

const displayElement = (element) => {
  element.style.display = "";
}

const hideElement = (element) => {
  element.style.display = "none";
}

//Creates search div at top of page

const searchDiv = appendElement("div", headerDiv, "student-search");

//Creates search component at top of page

const input = appendElement("input", searchDiv, "student-search", "search for students...");

//Creates div to store No Results message, defaults it to hidden

const noResultsDiv = appendElement("div", pageDiv);
noResultsDiv.innerHTML =
  '<p style = "font-style: italic">No results' +
  " were found. Please try another search.</p>";
hideElement(noResultsDiv);

//Creates select menu to change number of students to display per page

// const select = document.createElement("select");
// select.id = "per-page";
// const values = [10, 20, 40, 60, 100];
// for (let i = 0; i < values.length; i++) {
//   const option = document.createElement("option");
//   select.appendChild(option);
//   option.value = values[i];
//   option.textContent= values[i];
// }
// searchDiv.appendChild(select);

//Updates the value of studentsPerPage based on the selected option

// select.addEventListener('change', function (e) {
//   studentsPerPage = e.target.value;
//   const linkDiv = document.querySelector("div.pagination");
//   pageDiv.removeChild(linkDiv);
//   showPage(studentList, 1);
//   appendPageLinks(studentList);
// });

//Displays only ten students at a time, based on the page selected

const showPage = (list, page) => {
  const firstIndex = page * studentsPerPage - studentsPerPage;
  const lastIndex = page * studentsPerPage - 1;

  for (let i = 0; i < list.length; i++) {
    if (i >= firstIndex && i <= lastIndex) {
      displayElement(list[i]);
    } else {
      hideElement(list[i]);
    }
  }
};

/*
Creates the correct number of page links based on the total number of
students in a list, and calls the showPage function when each link is
clicked
*/

const appendPageLinks = list => {
  const totalPages = Math.ceil(list.length / studentsPerPage);

  const linkDiv = appendElement("div", pageDiv, "pagination");
  
  if (totalPages > 0) {
    const ul = appendElement("ul", linkDiv);

    for (let i = 0; i < totalPages; i++) {
      const li = appendElement("li", ul);
      const a = appendElement("a", li);
      const pageNum = i + 1;
      a.textContent = pageNum;
      a.href = "#";
    }
  
    const pageLinks = document.querySelectorAll("a");
    pageLinks[0].className = 'active';
  
    linkDiv.addEventListener("click", e => {
      if (e.target.tagName === "A") {
        pageLinks.forEach(link => link.className = "");
        e.target.className = "active";
        const activePageNum = e.target.textContent;
        showPage(list, activePageNum);
      }
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
      displayElement(studentList[i]);
      filteredList.push(studentList[i]);
      results = true;
    } else {
      hideElement(studentList[i]);
    }
  }
  if (results === true) {
    hideElement(noResultsDiv);
  } else {
    displayElement(noResultsDiv);
  }

  pageDiv.removeChild(linkDiv);
  showPage(filteredList, 1);
  appendPageLinks(filteredList);
};

/*
Adds event listener to search component so users can filter the list in 
real-time
*/

input.addEventListener("keyup", e => filter());
