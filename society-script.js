// Tab switching logic
const guardTab = document.getElementById('guard-tab');
const residentTab = document.getElementById('resident-tab');
const guardPanel = document.getElementById('guard-panel');
const residentPanel = document.getElementById('resident-panel');

function setActiveTab(tab) {
  if (tab === 'guard') {
    guardTab.classList.add('active');
    guardTab.setAttribute('aria-selected', 'true');
    guardTab.tabIndex = 0;

    residentTab.classList.remove('active');
    residentTab.setAttribute('aria-selected', 'false');
    residentTab.tabIndex = -1;

    guardPanel.hidden = false;
    residentPanel.hidden = true;
  } else {
    residentTab.classList.add('active');
    residentTab.setAttribute('aria-selected', 'true');
    residentTab.tabIndex = 0;

    guardTab.classList.remove('active');
    guardTab.setAttribute('aria-selected', 'false');
    guardTab.tabIndex = -1;

    residentPanel.hidden = false;
    guardPanel.hidden = true;
  }
}

guardTab.addEventListener('click', () => setActiveTab('guard'));
residentTab.addEventListener('click', () => setActiveTab('resident'));

guardTab.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    setActiveTab('resident');
    residentTab.focus();
  }
});

residentTab.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    setActiveTab('guard');
    guardTab.focus();
  }
});

// Form validation and submission
const form = document.getElementById('visitor-form');
const logBtn = document.getElementById('log-btn');
const resultMessage = document.getElementById('result-message');
const visitorList = document.getElementById('visitor-list');

// Individual field elements and error containers
const visitorNameInput = document.getElementById('visitor-name');
const phoneInput = document.getElementById('visitor-phone');
const purposeSelect = document.getElementById('purpose-visit');
const blockSelect = document.getElementById('block-select');
const flatNoInput = document.getElementById('flat-no');

const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');
const purposeError = document.getElementById('purpose-error');
const blockError = document.getElementById('block-error');
const flatError = document.getElementById('flat-error');

function validateName() {
  if (visitorNameInput.value.trim() === '') {
    nameError.textContent = 'Visitor name is required.';
    return false;
  }
  nameError.textContent = '';
  return true;
}

function validatePhone() {
  const phoneValue = phoneInput.value.trim();
  const phonePattern = /^[0-9]{10,15}$/;
  if (!phonePattern.test(phoneValue)) {
    phoneError.textContent = 'Please enter a valid phone number (10 to 15 digits).';
    return false;
  }
  phoneError.textContent = '';
  return true;
}

function validatePurpose() {
  if (!purposeSelect.value) {
    purposeError.textContent = 'Please select purpose of visit.';
    return false;
  }
  purposeError.textContent = '';
  return true;
}

function validateBlock() {
  if (!blockSelect.value) {
    blockError.textContent = 'Please select a block.';
    return false;
  }
  blockError.textContent = '';
  return true;
}

function validateFlat() {
  const flatValue = flatNoInput.value.trim();
  const flatPattern = /^[0-9A-Za-z- ]{1,6}$/;
  if (!flatPattern.test(flatValue)) {
    flatError.textContent = 'Please enter a valid flat number.';
    return false;
  }
  flatError.textContent = '';
  return true;
}

function validateForm() {
  const validName = validateName();
  const validPhone = validatePhone();
  const validPurpose = validatePurpose();
  const validBlock = validateBlock();
  const validFlat = validateFlat();

  return validName && validPhone && validPurpose && validBlock && validFlat;
}

// Enable or disable log button based on form validity
function toggleButton() {
  logBtn.disabled = !validateForm();
}

// Attach input listeners for form fields
[visitorNameInput, phoneInput, purposeSelect, blockSelect, flatNoInput].forEach(input => {
  input.addEventListener('input', () => {
    validateForm();
    toggleButton();
    resultMessage.textContent = '';
    resultMessage.className = '';
  });
});

// Show loading spinner inside button
function showLoading() {
  logBtn.innerHTML = '<div class="spinner" aria-label="Loading"></div>';
  logBtn.disabled = true;
}

// Restore button text
function restoreButton() {
  logBtn.innerHTML = 'Log Visitor';
  logBtn.disabled = false;
}

// Add visitor item to Resident Panel list
function addVisitorToList(visitor) {
  // Remove "No pending visitors" message if it exists
  const noVisitors = visitorList.querySelector('.no-visitors');
  if (noVisitors) {
    noVisitors.remove();
  }

  const item = document.createElement('div');
  item.className = 'visitor-item';

  item.innerHTML = `
    <div class="visitor-main">${visitor.name} wants to visit Block ${visitor.block} Flat ${visitor.flat}</div>
    <div class="visitor-details">Phone: ${visitor.phone} | Purpose: ${visitor.purpose}</div>
    <div class="visitor-meta">At: ${visitor.timestamp}</div>
    <div class="visitor-actions">
      <button type="button" class="approve-btn" aria-label="Approve visitor ${visitor.name}">✅ Approve</button>
      <button type="button" class="reject-btn" aria-label="Reject visitor ${visitor.name}">❌ Reject</button>
    </div>
  `;

  // Handle Approve and Reject buttons
  const approveBtn = item.querySelector('.approve-btn');
  const rejectBtn = item.querySelector('.reject-btn');

  approveBtn.addEventListener('click', () => {
    item.remove();
    showToast(`Visitor ${visitor.name} approved ✅`);
    checkEmptyList();
  });

  rejectBtn.addEventListener('click', () => {
    item.remove();
    showToast(`Visitor ${visitor.name} rejected ❌`);
    checkEmptyList();
  });

  visitorList.appendChild(item);
}

// Check if list is empty and show message
function checkEmptyList() {
  if (visitorList.children.length === 0) {
    const p = document.createElement('p');
    p.className = 'no-visitors';
    p.textContent = 'No pending visitors';
    visitorList.appendChild(p);
  }
}

// Toast notification for status messages
const toast = (() => {
  let toastElem = null;
  let timeoutId = null;

  function create() {
    toastElem = document.createElement('div');
    toastElem.style.position = 'fixed';
    toastElem.style.bottom = '20px';
    toastElem.style.left = '50%';
    toastElem.style.transform = 'translateX(-50%)';
    toastElem.style.background = 'rgba(0,0,0,0.8)';
    toastElem.style.color = 'white';
    toastElem.style.padding = '12px 20px';
    toastElem.style.borderRadius = '8px';
    toastElem.style.fontSize = '1rem';
    toastElem.style.zIndex = '1000';
    toastElem.style.opacity = '0';
    toastElem.style.transition = 'opacity 0.4s ease';
    document.body.appendChild(toastElem);
  }

  function show(message) {
    if (!toastElem) create();
    toastElem.textContent = message;
    toastElem.style.opacity = '1';
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      toastElem.style.opacity = '0';
    }, 2500);
  }

  return { show };
})();

function showToast(msg) {
  toast.show(msg);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) {
    toggleButton();
    return;
  }

  showLoading();

  // Simulated server processing delay
  setTimeout(() => {
    restoreButton();

    const visitor = {
      name: visitorNameInput.value.trim(),
      phone: phoneInput.value.trim(),
      purpose: purposeSelect.value,
      block: blockSelect.value,
      flat: flatNoInput.value.trim(),
      timestamp: new Date().toLocaleString()
    };

    // Add to visitor list in Resident Panel
    addVisitorToList(visitor);

    // Clear form
    form.reset();
    toggleButton();

    // Show success message
    resultMessage.textContent = 'Visitor logged successfully!';
    resultMessage.className = 'success-msg';

    // Automatically switch to Resident Panel to see pending visitor
    setActiveTab('resident');

    // Clear message after 3 seconds
    setTimeout(() => {
      resultMessage.textContent = '';
      resultMessage.className = '';
    }, 3000);
  }, 1500);
});

// Initial button state
toggleButton();
