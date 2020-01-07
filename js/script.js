"use strict";

const pageDiv = document.querySelector("div.page");
const headerDiv = document.querySelector("div.page-header");
const studentList = document.querySelectorAll("li.student-item");
const studentNames = document.querySelectorAll("h3");
let studentsPerPage = 10;
let filteredList = [];

// Function creates an element and appends it to the page

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

// Function used to hide/show an element

const displayElement = (element) => {
  element.style.display = "";
}

const hideElement = (element) => {
  element.style.display = "none";
}

// Function used to hide/show no results div

const noResultsDisplay = results => {
  if (results === true) {
    hideElement(noResultsDiv);
  } else {
    displayElement(noResultsDiv);
  }
};

//Creates search div at top of page

const searchDiv = appendElement("div", headerDiv, "student-search");

//Creates search component at top of page

const input = appendElement("input", searchDiv, "student-search", "search for students...");

//Creates div to store No Results message, defaults it to hidden

const noResultsDiv = appendElement("div", pageDiv);
noResultsDiv.innerHTML = '<p style = "font-style: italic">'
noResultsDiv.innerHTML += 'No results were found. Please try another search.'
noResultsDiv.innerHTML += '</p>';

//Creates div to store pagination links

const linkDiv = appendElement("div", pageDiv, "pagination");

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

// Creates the correct number of page links based on the total number of
// students in a list

const appendPageLinks = list => {
  const totalPages = Math.ceil(list.length / studentsPerPage);

  if (totalPages > 0) {
    const ul = appendElement("ul", linkDiv, "pagination");

    for (let i = 0; i < totalPages; i++) {
      const li = appendElement("li", ul);
      const a = appendElement("a", li);
      const pageNum = i + 1;
      a.textContent = pageNum;
      a.href = "#";
    }
  
    //sets the first pagination to an active class
    document.querySelector("a").className = 'active';
  }  
};

// Searches/filters student list by finding partial matches to user's input
// and displays the correct number of page links based on the results

const filter = () => {
  const userInput = input.value.toUpperCase();

  let results = false;
  
  for (let i = 0; i < studentList.length; i++) {
    let student = studentList[i];
    if (studentNames[i].textContent.toUpperCase().includes(userInput)) {
      displayElement(student);
      filteredList.push(student);
      results = true;
    } else {
      hideElement(student);
    }
  }
  
  noResultsDisplay(results);

  const ul = document.querySelector("ul.pagination");
  if (ul) {
    linkDiv.removeChild(ul);
  };

  showPage(filteredList, 1);
  appendPageLinks(filteredList);
};

// Adds event listener to search component so users can filter the list in
// real-time with each key press

input.addEventListener("keyup", e => {
  filteredList = [];
  filter();
});

// Adds event listener to linkDiv to listen for any clicks on the pagination
// links, calls the showPage function when each link is clicked

linkDiv.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    //Selects all pagination links and removes className from all of them
    const pageLinks = document.querySelectorAll("a");
    pageLinks.forEach(link => link.className = "");

    //Sets class name of clicked link to active
    e.target.className = "active";

    //Calls the showPage function 
    const activePageNum = e.target.textContent;
    const activeList = (filteredList.length === 0) ? studentList : filteredList;
    showPage(activeList, activePageNum);
  }
});

// Handles the initial page load. Displays page 1 of the student list, 
// appends the page links, and hides the noResults div

showPage(studentList, 1);

appendPageLinks(studentList);

noResultsDisplay(true);

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
