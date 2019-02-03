/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const pageDiv = document.querySelector('div.page');
const studentList = document.querySelectorAll('li.student-item');

//function used to display only ten students based on the page selected

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

const appendPageLinks = (list) => {
   const totalPages = Math.ceil(list.length / 10);
   
   const div = document.createElement('div');
   div.className = 'pagination';
   pageDiv.appendChild(div);

   const ul = document.createElement('ul');
   div.appendChild(ul);
   
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

//Call the showPage function for the initial load to display page 1
showPage(studentList, 1);

appendPageLinks(studentList);