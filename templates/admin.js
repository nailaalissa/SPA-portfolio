const loginBtn = document.getElementById('loginBtn');
const adminBtn = document.getElementById('adminbtn');
const adminPanel = document.getElementById('adminPanel');
const closePanelBtn = document.getElementById('close');
const applyChangesBtn = document.getElementById('applyChanges');
const resetStylesBtn = document.getElementById('resetStylesBtn');
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
  const usernameInput = document.getElementById('username').value.toLowerCase();
  const passwordInput = document.getElementById('password').value.toLowerCase();

  if (usernameInput === 'naila' && passwordInput === '1234') {
    // console.log('Username:', usernameInput);
    // console.log('Password:', passwordInput);
    // console.log('Success');

    const adminPanel = document.getElementById('adminPanel');
    adminPanel.style.display = 'block';
    displayLastLogin();
    usernameInput.value = '';
    passwordInput.value = '';
    adminPanel.style.display = 'block';
    loginForm.style.display = 'none';
    loginBtn.textContent = 'Logout';
    toggleLoginForm();
  } else {
    alert('Invalid username or password');
  }
}
