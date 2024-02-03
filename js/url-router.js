// // document.addEventListener('click', (e) => {
// //   const { target } = e;
// //   if (!target.matches('nav a')) {
// //     return;
// //   }
// //   e.preventDefault();
// //   urlRoute();
// // });
// // const urlRoutes = {
// //   404: {
// //     template: '/templetes/404.html',
// //     title: '',
// //     description: '',
// //   },
// //   '/': {
// //     template: '/templetes/index.html',
// //     title: '',
// //     description: '',
// //   },
// //   '/about': {
// //     template: '/templetes/about.html',
// //     title: '',
// //     description: '',
// //   },
// //   '/projects': {
// //     template: '/templetes/projects.html',
// //     title: '',
// //     description: '',
// //   },
// //   '/contact': {
// //     template: '/templetes/contact.html',
// //     title: '',
// //     description: '',
// //   },
// // };
// // const urlRoute = (event) => {
// //   event = event || window.event;
// //   event.preventDefault();
// //   window.history.pushState({}, '', event.target.href);
// // };

// // const urlLocationHandler = async () => {
// //   const location = window.location.pathname;
// //   if (location.length == 0) {
// //     location = '/';
// //   }
// //   const route = urlRoutes[location] || urlRoutes[404];
// //   const html = await fetch(route.template).then((Response) => Response.text());
// //   document.getElementById('content').innerHTML = html;
// // };

// // window.onpopstate = urlLocationHandler;
// // window.route = urlRoute;
// // urlLocationHandler();

// const urlPageTitle = 'My Portfolio';

// // create document click that watches the nav links only
// document.addEventListener('click', (e) => {
//   const { target } = e;
//   if (!target.matches('nav a')) {
//     return;
//   }
//   e.preventDefault();
//   urlRoute();
// });

// // create an object that maps the url to the template, title, and description
// const urlRoutes = {
//   404: {
//     template: '/templates/404.html',
//     title: '404 | ' + urlPageTitle,
//     description: 'Page not found',
//   },
//   '/': {
//     template: '/templates/index.html',
//     title: 'Home | ' + urlPageTitle,
//     description: 'This is the home page',
//   },
//   '/about': {
//     template: '/templates/about.html',
//     title: 'About Us | ' + urlPageTitle,
//     description: 'This is the about page',
//   },
//   '/contact': {
//     template: '/templates/contact.html',
//     title: 'Contact Us | ' + urlPageTitle,
//     description: 'This is the contact page',
//   },
//   '/projects': {
//     template: '/templates/projects.html',
//     title: 'Contact Us | ' + urlPageTitle,
//     description: 'This is My projects page',
//   },
// };

// // create a function that watches the url and calls the urlLocationHandler
// // const urlRoute = (event) => {
// const urlRoute = (event = window.event) => {
//   event = event || window.event; // get window.event if event argument not provided
//   event.preventDefault();
//   // window.history.pushState(state, unused, target link);
//   window.history.pushState({}, '', event.target.href);
//   urlLocationHandler();
// };

// // create a function that handles the url location
// const urlLocationHandler = async () => {
//   const location = window.location.pathname; // get the url path
//   // if the path length is 0, set it to primary page route
//   if (location.length == 0) {
//     location = '/';
//   }
//   // get the route object from the urlRoutes object
//   const route = urlRoutes[location] || urlRoutes['404'];
//   // get the html from the template
//   const html = await fetch(route.template).then((response) => response.text());
//   // set the content of the content div to the html
//   document.getElementById('content').innerHTML = html;
//   // set the title of the document to the title of the route
//   document.title = route.title;
//   // set the description of the document to the description of the route
//   document.querySelector('meta[name="description"]').setAttribute('content', route.description);
// };

// // add an event listener to the window that watches for url changes
// window.onpopstate = urlLocationHandler;
// // call the urlLocationHandler function to handle the initial url
// window.route = urlRoute;
// // call the urlLocationHandler function to handle the initial url
// urlLocationHandler();
document.addEventListener('DOMContentLoaded', () => {
  // Initial load
  loadPage(window.location.pathname);

  // Navigation click event listener
  document.addEventListener('click', (e) => {
    const { target } = e;
    if (target.matches('nav a')) {
      e.preventDefault();
      const href = target.getAttribute('href');
      loadPage(href);
      window.history.pushState({}, '', href);
    }
  });

  // Handle popstate event (browser back/forward buttons)
  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
  });

  // Function to load page content
  async function loadPage(url) {
    try {
      const response = await fetch(`/templates${url}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${response.status} ${response.statusText}`);
      }
      const html = await response.text();
      document.getElementById('content').innerHTML = html;
      updateDocumentInfo(url);
    } catch (error) {
      console.error(error);
    }
  }

  // Function to update document title and description
  function updateDocumentInfo(url) {
    const route = urlRoutes[url] || urlRoutes['404'];
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute('content', route.description);
  }
});
