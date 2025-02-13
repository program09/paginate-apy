# Paginator Class

### Copyright
/************************************************************************************

Copyright (c) 2025 Yordi Alcantara
This software is released under an Open Source License.
You are free to use, modify, and distribute this software in accordance with the
terms of the license included in this project.
Author: Yordi Alcantara
Repository: [Insert Repository URL Here]
This code is provided "as is", without warranty of any kind, express or implied,
including but not limited to the warranties of merchantability, fitness for a
particular purpose, and noninfringement. In no event shall the author be liable
for any claim, damages, or other liability, whether in an action of contract,
tort, or otherwise, arising from, out of, or in connection with the software
or the use or other dealings in the software.
************************************************************************************/

---

## Description

The `Paginator` class provides a dynamic and reusable pagination component that can be used in any web application. It handles rendering, navigation, and callbacks for page changes.

---

## Features

- Dynamically renders pagination based on the total number of pages and the current page.
- Handles previous/next navigation buttons, as well as page numbers.
- Displays ellipses for skipped ranges of pages.
- Supports custom callbacks for page changes.
- Allows updating the total number of pages and the current page dynamically.

---

## Installation

Include the `Paginator` class in your project:

## styles
we use bootstrap 5
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

```javascript
// Include the Paginator class in your project
import Paginator from './script.js';

CDN  <script src="script.js"></script>
Usage
Here’s how you can use the Paginator class:

javascript
Copiar
Editar
const containerId = "pagination-container"; // ID of the container element

// Initialize the paginator
const paginator = new Paginator({
  container: containerId, // Container ID or HTMLElement
  totalPages: 10,         // Total number of pages
  currentPage: 1,         // Initial page
  onPageChange: (page) => {
    console.log(`Page changed to: ${page}`);
  }
});

// Update total pages dynamically
paginator.updateTotalPages(15);

// Select a specific page by its number
paginator.selectPageById(5);

// Get the current page
const currentPage = paginator.getCurrentPage();
console.log(`Current page is: ${currentPage}`);

// Add custom click functionality
paginator.click((page) => {
  console.log(`You clicked on page: ${page}`);
});

// Destroy the paginator instance
paginator.destroy();
Constructor Parameters
The constructor accepts an object with the following parameters:

Parameter	Type	Default	Description
container	string or HTMLElement	null	The container ID or element where the paginator will be rendered.
totalPages	number	0	The total number of pages.
currentPage	number	1	The initial page to display.
onPageChange	function	() => {}	A callback function that is executed when the page changes.
Methods
setPage(page)
Changes the current page and triggers the onPageChange callback.

Parameter	Type	Description
page	number	The new page to set.
updateTotalPages(newTotalPages)
Updates the total number of pages dynamically.

Parameter	Type	Description
newTotalPages	number	The new total number of pages.
getCurrentPage()
Returns the current page.

Returns	Type	Description
page	number	The current page.
click(callback)
Defines a custom callback to execute when a page is clicked.

Parameter	Type	Description
callback	function	A function that receives the clicked page.
selectPageById(pageId)
Selects a specific page by its number.

Parameter	Type	Description
pageId	number	The page number to select.
destroy()
Destroys the paginator instance, removes all event listeners, and clears the container.

Example with HTML
html
Copiar
Editar
<div id="pagination-container"></div>

<script>
  const paginator = new Paginator({
    container: 'pagination-container',
    totalPages: 20,
    currentPage: 1,
    onPageChange: (page) => {
      console.log(`Navigated to page: ${page}`);
    },
  });
</script>
Styling
The paginator uses the Bootstrap pagination component. You can customize it using Bootstrap classes or your own CSS styles.

License
This project is licensed under an Open Source License. See the LICENSE file for details.
