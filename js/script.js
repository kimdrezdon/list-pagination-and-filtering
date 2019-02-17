/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const pageDiv = document.querySelector('div.page');
const headerDiv = document.querySelector('div.page-header');
const studentList = document.querySelectorAll('li.student-item');
const studentNames = document.querySelectorAll('h3');

//create search component at top of page

const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
headerDiv.appendChild(searchDiv);

const input = document.createElement('input');
input.placeholder = 'search for students...';
searchDiv.appendChild(input);

const button = document.createElement('button');
button.textContent = 'search';
searchDiv.appendChild(button);

//function used to display only ten students at a time, based on the page selected

const showPage = (list, page) => {
   const firstIndex = (page * 10) - 10;
   const lastIndex = (page * 10) - 1;
   
   for (let i = 0; i < list.length; i++) {
      if (i >= firstIndex && i <= lastIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   };
}

/***
   Function used to create the correct number of page links based on the
   total number of students in a list, and call the showPage function when
   each link is clicked
***/

const appendPageLinks = list => {
   const totalPages = Math.ceil(list.length / 10);
   
   const linkDiv = document.createElement('div');
   linkDiv.className = 'pagination';
   pageDiv.appendChild(linkDiv);

   const ul = document.createElement('ul');
   linkDiv.appendChild(ul);
   
   for (let i = 0; i < totalPages; i++) {
      const li = document.createElement('li');
      ul.appendChild(li);
      const a = document.createElement('a');
      const pageNum = (i + 1);
      a.textContent = pageNum;
      a.href = '#';
      li.appendChild(a);
   };
   
   const pageLinks = document.querySelectorAll('a');
   
   for (let i = 0; i < pageLinks.length; i++) {
      pageLinks[i].addEventListener('click', (e) => {
         for (let i = 0; i < pageLinks.length; i++) {
            pageLinks[i].className = '';
         };
         const activePage = e.target;
         activePage.className = 'active';
         const activePageNum = i + 1;
         showPage(list, activePageNum);
      });
   }
}

/*** 
   Call the showPage and appendSearch function for the initial load 
   to display page 1 with a search component
***/

showPage(studentList, 1);

appendPageLinks(studentList);

//create div to store No Results message, default to hidden

const noResultsDiv = document.createElement('div');
pageDiv.appendChild(noResultsDiv);
noResultsDiv.innerHTML = '<p style = "font-style: italic">No results were found. Please try another search.</p>';
noResultsDiv.style.display = 'none';

//function used to search/filter student list and display the correct number of page links based on the results

const filter = () => {
   const userInput = input.value.toUpperCase();
   const filteredList = [];
   const linkDiv = document.querySelector('div.pagination');
   let results = false;
   
   for (let i = 0; i < studentNames.length; i++) {
      if (studentNames[i].textContent.toUpperCase().includes(userInput)) {
         studentList[i].style.display = '';
         filteredList.push(studentList[i]);
         results = true;
      } else {
         studentList[i].style.display = 'none';
      }
   }
   if (results === true) {
      noResultsDiv.style.display = 'none';
   } else {
      noResultsDiv.style.display = '';
   }
   
   pageDiv.removeChild(linkDiv);
   showPage(filteredList, 1);
   appendPageLinks(filteredList);
}

//add click and keyup event listeners to search component

button.addEventListener('click', () => {
   filter();
});

input.addEventListener('keyup', (e) => {
   if (e.key === 'Enter') {
      filter();
   }
});