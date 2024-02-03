const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menuItem');
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.closeIcon');
const menuIcon = document.querySelector('.menuIcon');
const loginForm = document.getElementById('loginForm');
const username = 'nailaalissa';
const token = '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';
let cardsection = document.getElementById('cardselection');
let cssButton = document.getElementById('CSS');
let allButton = document.getElementById('all');
let JavaScriptButton = document.getElementById('JavaScript');
let CSharpButton = document.getElementById('C#');
let htmlButton = document.getElementById('html');
let originalData = [];
let numberOfProjects = 0;
const loginBtn = document.getElementById('loginBtn');
const adminBtn = document.getElementById('adminbtn');
const adminPanel = document.getElementById('adminPanel');
const closePanelBtn = document.getElementById('close');
const applyChangesBtn = document.getElementById('applyChanges');
const resetStylesBtn = document.getElementById('resetStylesBtn');
const userInputRepoName = document.getElementById('reponame');
const createRepo = document.getElementById('createRepo');
const description = document.getElementById('description');
const visibilitySelect = document.getElementById('visibility');
const createnewBtn = document.getElementById('createnew');
const reponameDiv = document.querySelector('.repo');
const createRepoBtn = document.getElementById('createRepo');
// Hide the close icon initially
closeIcon.style.display = 'none';
// // // Initially hide the repo input div
// reponameDiv.style.display = 'none';

function router(page) {
  const container = document.getElementById('content');
  fetch(`./templates/${page}.html`)
    .then((response) => response.text())
    .then((html) => {
      console.log(`./templates/${page}.html`);
      container.innerHTML = html;
    })
    .catch((error) => {
      console.error(`Error loading page: ${error}`);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  router('home');
});

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const page = event.target.getAttribute('data-page');
    router(page);
  }
});
///////////////Hamburger ////

hamburger.addEventListener('click', toggleMenu);
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click', toggleMenu);
});

function toggleMenu() {
  if (menu.classList.contains('showMenu')) {
    menu.classList.remove('showMenu');
    closeIcon.style.display = 'none';
    menuIcon.style.display = 'block';
  } else {
    menu.classList.add('showMenu');
    closeIcon.style.display = 'block';
    menuIcon.style.display = 'none';
  }
}
///////////////////////////////////
// const loginBtn = document.getElementById('loginBtn');

///////////////////////////////////////// Admin Section ///////////////////////////////////
// Function to toggle the login form
adminBtn.addEventListener('click', login);
function toggleLoginForm() {
  const loginForm = document.getElementById('loginForm');
  loginForm.style.display =
    loginForm.style.display === 'none' || loginForm.style.display === '' ? 'block' : 'none';
}

// Function to handle login logic
function login() {
  loginForm.style.display = 'block';
  const usernameInput = document.getElementById('username').value.toLowerCase();
  const passwordInput = document.getElementById('password').value.toLowerCase();

  if (usernameInput === 'naila' && passwordInput === '1234') {
    // console.log('Username:', usernameInput);
    // console.log('Password:', passwordInput);
    // console.log('Success');
    router('admin');
    usernameInput.value = '';
    passwordInput.value = '';
    loginForm.style.display = 'none';
    loginBtn.textContent = 'Logout';
    lastLogin = localStorage.getItem('lastLogin');
  } else {
    alert('Invalid username or password');
  }
}

function logform() {
  const adminPanel = document.getElementById('adminPanel');
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn.textContent === 'Logout') {
    loginBtn.textContent = 'Login';
    loginForm.style.display = 'none';
    router('home');
  } else {
    if (loginBtn.textContent === 'Login') {
      loginBtn.textContent = 'Logout';
      loginForm.style.display = 'none';
    }
    toggleLoginForm();
  }
}

// Function to apply changes
function applyChanges() {
  const backgroundColor = document.getElementById('backgroundColor').value;
  const textColor = document.getElementById('textColor').value;
  const ProfileText = document.getElementById('text').value;
  const navColor = document.getElementById('navColor').value;

  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = textColor;
  document.getElementById('ProfileText').innerText = ProfileText;
  document.getElementById('navbar').style.backgroundColor = navColor;
}

// Function to reset styles
function resetStyles() {
  document.getElementById('backgroundColor').value = '#ffffff';
  document.getElementById('textColor').value = 'rgb(13, 13, 14)';
  document.getElementById('text').textContent =
    "I'm a Frontend Web Developer, specializing in crafting visually appealing and user-friendly websites. A Computer Engineering graduate from Damascus University, I bring strong problem-solving skills and the ability to adapt quickly. Passionate about sharing knowledge, I regularly post valuable content on Web Development on my LinkedIn. Open to job opportunities, I am a communicative, innovative team player eager to contribute and grow. Let's connect and explore how I can bring my skills to your team ";
  document.getElementById('navbar').style.backgroundColor = '#293040';
  applyChanges();
}
////////////////////////////

function fetchRepo(callback) {
  fetch(`https://api.github.com/users/nailaalissa/repos`)
    .then((response) => response.json())
    .then((data) => {
      originalData = data;
      callback(originalData);
    })
    .catch((error) => {
      console.error('Error fetching repositories:', error);
    });
}

function fetchReadme(username, repoName, callback) {
  fetch(`https://api.github.com/repos/nailaalissa/${repoName}/readme`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Readme not found');
      }
      return response.json();
    })
    .then((readme) => {
      callback(atob(readme.content));
    })
    .catch((error) => {
      console.error('Error fetching readme:', error);
    });
}

function displayRepos(repos) {
  const cardSelection = document.getElementById('cardselection');
  cardSelection.innerHTML = '';

  repos.forEach((repo) => {
    const repoCard = document.createElement('div');
    repoCard.classList.add('card');

    const imgElement = document.createElement('img');
    imgElement.src = `./img/${repo.name}.jpg`;
    imgElement.alt = `${repo.name} Image`;
    repoCard.appendChild(imgElement);
    let repolink = repo.html_url;
    fetchReadme(username, repo.name, (readmeContent) => {
      // Split the readme content by lines
      const readmeLines = readmeContent.split('\n');

      // Take the first line as the title
      const title = readmeLines[0];

      // Take the first three lines as the content
      const content = readmeLines.slice(1, 4).join('\n');

      repoCard.innerHTML += `
        <div class="box">
          <div class="cardtext">
            <h1 class="cardtitle">${title}</h1>
            <p class="langcard">${repo.language}</p>
            <p class="readme">${content}</p>
          </div>
          <div class="cardicon">
        <div class="icon-hyperlink">
          <a href="${repolink}">
            <i class="fa-brands fa-square-github"></i>
          </a>
        </div>
        <div>
          <a class="link flex" href="${repolink}">
            <span>more</span>
          </a>
        </div>
      </div>
        </div>
      `;

      cardSelection.appendChild(repoCard);
    });
  });
}

// Your event listeners and other parts of the code...

// Your event listeners and other parts of the code...

// Call fetchRepo with a callback function
fetchRepo((repos) => {
  displayRepos(repos);

  allButton.addEventListener('click', () => {
    displayRepos(repos);
  });

  cssButton.addEventListener('click', () => {
    let cssProjects = repos.filter(
      (repo) => repo.language && repo.language.toLowerCase() === 'css',
    );
    displayRepos(cssProjects);
  });

  JavaScriptButton.addEventListener('click', () => {
    let jsProjects = repos.filter(
      (repo) => repo.language && repo.language.toLowerCase() === 'javascript',
    );
    displayRepos(jsProjects);
  });

  CSharpButton.addEventListener('click', () => {
    let cProjects = repos.filter((repo) => repo.language && repo.language.toLowerCase() === 'c#');
    displayRepos(cProjects);
  });

  htmlButton.addEventListener('click', () => {
    let htmlProjects = repos.filter(
      (repo) => repo.language && repo.language.toLowerCase() === 'html',
    );
    displayRepos(htmlProjects);
  });
});

////////////////////////////////// Post API Repo/////////////////
// Function to create a GitHub repository

createnewBtn.addEventListener('click', function () {
  // Toggle the visibility of the repo input div
  if (reponameDiv.style.display === 'none') {
    reponameDiv.style.display = 'block';
    createnewBtn.textContent = '✖';
    createnewBtn.style.float = 'right';
    // createnewBtn.style.padding = '0 5px';
    createnewBtn.style.borderRadius = '50%';
  } else {
    reponameDiv.style.display = 'none';
    createnewBtn.textContent = 'Create new Repo';
    // createnewBtn.style.float = 'left';
    createnewBtn.style.borderRadius = 'initial';
  }
});
async function handleCreateRepo() {}

// Function to create a GitHub repository
async function createRepository(repoName) {}

/////////////////////////
