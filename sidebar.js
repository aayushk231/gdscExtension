const SUBJECT_CREDITS = {
  'BCHY101L': 3.0,
  'BCHY101P': 1.0,
  'BCSE101E': 3.0,
  'BCSE102L': 2.0,
  'BCSE102P': 2.0,
  'BCSE103E': 3.0,
  'BEEE102L': 3.0,
  'BEEE102P': 1.0,
  'BENG101L': 2.0,
  'BENG101P': 1.0,
  'BENG102P': 1.0,
  'BMAT101L': 3.0,
  'BMAT101P': 1.0,
  'BMAT102L': 4.0,
  'BMAT201L': 4.0,
  'BMAT202L': 3.0,
  'BMAT202P': 1.0,
  'BPHY101L': 3.0,
  'BPHY101P': 1.0,
  'BSTS101P': 1.5,
  'BSTS102P': 1.5,
  'BSTS201P': 1.5,
  'BSTS202P': 1.5,
  'BITE201L': 3.0,
  'BITE201P': 1.0,
  'BITE202L': 3.0,
  'BITE202P': 1.0,
  'BITE203L': 3.0,
  'BITE301L': 3.0,
  'BITE302L': 3.0,
  'BITE302P': 1.0,
  'BITE303L': 3.0,
  'BITE303P': 1.0,
  'BITE304L': 3.0,
  'BITE304P': 1.0,
  'BITE305L': 3.0,
  'BITE305P': 1.0,
  'BITE306L': 4.0,
  'BITE307L': 3.0,
  'BITE307P': 1.0,
  'BITE308L': 3.0,
  'BITE308P': 1.0,
  'BITE401L': 3.0,
  'BITE402L': 3.0,
  'BITE403L': 3.0,
  'BITE403P': 1.0,
  'BITE411L': 3.0,
  'BMAT205L': 4.0,
  'BECE302L': 3.0,
  'BITE311L': 3.0,
  'BITE312E': 3.0,
  'BITE313L': 3.0,
  'BITE314L': 3.0,
  'BITE391J': 3.0,
  'BITE392J': 3.0,
  'BITE393J': 3.0,
  'BITE394J': 3.0,
  'BITE396J': 3.0,
  'BITE397J': 3.0,
  'BITE398J': 3.0,
  'BITE399J': 1.0,
  'BITE404E': 3.0,
  'BITE405L': 3.0,
  'BITE406L': 3.0,
  'BITE407L': 3.0,
  'BITE408L': 3.0,
  'BITE409L': 3.0,
  'BITE410L': 3.0,
  'BITE412L': 3.0,
  'BITE413L': 3.0,
  'BITE414L': 3.0,
  'BITE415L': 3.0,
  'BITE497J': 3.0,
  'BITE498J': 5.0,
  'BITE499J': 14.0,
  'BCSE353E': 2.0,
  'BCSE354E': 2.0,
  'BHUM111L': 3.0,
  'BHUM201L': 3.0,
  'BHUM202L': 3.0,
  'BHUM203L': 3.0,
  'BHUM204L': 3.0,
  'BHUM205L': 3.0,
  'BHUM206L': 3.0,
  'BHUM207L': 3.0,
  'BHUM208L': 3.0,
  'BHUM209L': 3.0,
  'BHUM210E': 3.0,
  'BHUM211L': 3.0,
  'BHUM212L': 3.0,
  'BHUM213L': 3.0,
  'BHUM214L': 3.0,
  'BHUM215L': 3.0,
  'BHUM216L': 3.0,
  'BHUM217L': 3.0,
  'BHUM218L': 3.0,
  'BHUM219L': 3.0,
  'BHUM220L': 3.0,
  'BHUM221L': 3.0,
  'BHUM222L': 3.0,
  'BHUM223L': 3.0,
  'BHUM224L': 3.0,
  'BHUM225L': 3.0,
  'BHUM226L': 3.0,
  'BHUM227L': 3.0,
  'BHUM228L': 3.0,
  'BHUM229L': 3.0,
  'BHUM230L': 3.0,
  'BHUM231L': 3.0,
  'BHUM232L': 3.0,
  'BHUM233L': 3.0,
  'BHUM234L': 3.0,
  'BHUM235E': 3.0,
  'BMGT108L': 3.0,
  'BSTS301P': 1.5,
  'BSTS302P': 1.5,
  'CFOC102M': 3.0,
  'CFOC191M': 3.0,
  'CFOC203M': 2.0,
  'CFOC406M': 2.0,
  'CFOC612M': 1.0,
  'CFOC641M': 3.0,
  'CFOC642M': 3.0,
  'CFOC692M': 3.0,
  'CFOC699M': 3.0,
  'CFOC700M': 3.0,
  'BENG101N': 2.0,
  'BCHY102N': 2.0,
  'BHUM101N': 2.0,
  'BITE101N': 1.0,
  'BSSC101N': 2.0,
  'BSSC102N': 2.0
};

// Helper function to get credits for a subject code
function getSubjectCredits(subjectCode) {
  return SUBJECT_CREDITS[subjectCode] || 0;
}

// Extract subject code from course title
function extractSubjectCode(courseTitle) {
  // Look for patterns like BCSE101L, BMAT202P, etc.
  // First try to find it at the beginning (for format like "BSTS102P - Quantitative Skills Practice II")
  const beginningMatch = courseTitle.match(/^([A-Z]{3,4}\d{3}[A-Z]?)/);
  if (beginningMatch) {
    return beginningMatch[1];
  }
  
  // Fallback to finding it anywhere in the string
  const anywhereMatch = courseTitle.match(/\b([A-Z]{3,4}\d{3}[A-Z]?)\b/);
  return anywhereMatch ? anywhereMatch[1] : null;
}

// Get credits for a course by extracting subject code
function getCourseCredits(courseTitle) {
  const subjectCode = extractSubjectCode(courseTitle);
  console.log('Extracting credits for:', courseTitle, 'Subject code:', subjectCode);
  if (subjectCode) {
    const credits = getSubjectCredits(subjectCode);
    console.log('Found credits:', credits);
    return credits;
  }
  console.log('No subject code found, returning 0 credits');
  return 0;
}

// Inject CSS styles for the sidebar
function injectSidebarStyles() {
  if (document.getElementById('extension-sidebar-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'extension-sidebar-styles';
  style.textContent = `
    .course-entry {
      margin-bottom: 15px;
    }

    .course-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      padding: 10px 15px;
      font-size: 14px;
      color: #1c1e21;
      text-align: left;
    }

    .course-card summary {
      cursor: pointer;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .course-card summary::-webkit-details-marker {
      display: none;
    }

    .remove-btn {
      background: none;
      border: none;
      font-size: 16px;
      color: #999;
      cursor: pointer;
    }

    .remove-btn:hover {
      color: #f44336;
    }

    .card-body {
      margin-top: 10px;
      font-size: 13px;
    }

    .badge {
      background-color: #def7ec;
      color: #036666;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      display: inline-block;
      margin-right: 6px;
    }

    .credit-badge {
      background-color: #e3f2fd;
      color: #1565c0;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      display: inline-block;
      font-weight: 600;
    }

    .total-credits {
      padding: 5px;
      margin-bottom: 10px;
      text-align: center;
    }

    .total-credits h4 {
      margin: 0 0 8px 0;
      color: #1c1e21;
      font-size: 16px;
      font-weight: 600;
			display: inline-block;
    }

    .total-credits .credit-number {
      font-size: 16px;
      font-weight: bold;
      color: #4caf50;
			display: inline-block;
    }

    #extension-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100%;
      background-color: #f4f4f4;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      z-index: 10000;
      overflow-y: auto;
      transition: transform 0.3s ease-in-out;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    #extension-sidebar h3 {
      color: #1c1e21;
      font-size: 18px;
      margin-top: 40px;
      margin-bottom: 20px;
      text-align: center;
    }

    #toggle-sidebar {
      background-color: #1877f2;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10001;
      transition: background-color 0.2s;
    }

    #toggle-sidebar:hover {
      background-color: #166fe5;
    }

    .occupied-section {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }

    .occupied-section h4 {
      color: #1c1e21;
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .occupied-slots {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .slot-badge {
      background-color: #ffebee;
      color: #c62828;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
    }

    .clash-section {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }

    .clash-section h4 {
      color: #d32f2f;
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .clash-item {
      background-color: #ffebee;
      border-left: 4px solid #f44336;
      padding: 8px 12px;
      margin-bottom: 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .clash-slot {
      font-weight: 600;
      color: #d32f2f;
    }

    .clash-courses {
      margin-top: 4px;
      color: #666;
    }
  `;
  document.head.appendChild(style);
}

// Check if sidebar already exists, if not, create it
let sidebar = document.getElementById('extension-sidebar');
let toggleBtn = document.getElementById('toggle-sidebar');

if (!sidebar) {
  // Inject CSS styles first
  injectSidebarStyles();
  
  sidebar = document.createElement('div');
  sidebar.id = 'extension-sidebar';
  sidebar.innerHTML = `
    <h3>Course Schedule</h3>
    
    <div class="total-credits" id="total-credits">
      <h4>Total Credits </h4>
      <span class="credit-number" id="credit-sum">0</span>
    </div>
    
    <div id="faculty-list"></div>
    
    <div class="clash-section">
      <h4>Slot Clashes</h4>
      <div id="clash-list">
        <!-- Will be populated dynamically -->
      </div>
    </div>
    
    <div class="occupied-section">
      <h4>Theory Occupied</h4>
      <div class="occupied-slots" id="theory-occupied">
        <!-- Will be populated dynamically -->
      </div>
    </div>

    <div class="occupied-section">
      <h4>Lab Occupied</h4>
      <div class="occupied-slots" id="lab-occupied">
        <!-- Will be populated dynamically -->
      </div>
    </div>

    
  `;
  document.body.appendChild(sidebar);

  // Populate occupied slots and check for clashes
  updateSidebarAnalysis();

  // Load saved courses
  loadSidebarFromStorage();
}

if (!toggleBtn) {
  toggleBtn = document.createElement('button');
  toggleBtn.id = 'toggle-sidebar';
  toggleBtn.textContent = 'Hide Sidebar';
  document.body.appendChild(toggleBtn);

  let sidebarVisible = true;
  toggleBtn.addEventListener('click', () => {
    sidebarVisible = !sidebarVisible;
    sidebar.style.transform = sidebarVisible ? 'translateX(0)' : 'translateX(100%)';
    toggleBtn.textContent = sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar';
    const main = document.querySelector('main') || document.body;
    main.style.marginRight = sidebarVisible ? '300px' : '0';
  });
}

function updateSidebarAnalysis() {
  try {
    let theorySlots = [];
    let labSlots = [];
    let slotCourseMap = {}; // Map of slot -> [course names]
    
    // Get all course cards from the sidebar
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
      // Get course title
      const courseTitle = card.querySelector('summary strong')?.textContent?.trim() || 'Unknown Course';
      
      // Find the slot information in each course card
      const slotElement = card.querySelector('.card-body p');
      if (slotElement && slotElement.textContent.includes('Slot:')) {
        const slotText = slotElement.textContent.replace('Slot:', '').trim();
        
        // Split the slot by + to handle multiple slots like "E2+TE2" or "C1+L59"
        const slots = slotText.split('+').map(s => s.trim());
        
        slots.forEach(slot => {
          // Track which courses use which slots for clash detection
          if (!slotCourseMap[slot]) {
            slotCourseMap[slot] = [];
          }
          slotCourseMap[slot].push(courseTitle);
          
          // Check if it's a lab slot (starts with L)
          if (/^L\d+$/i.test(slot)) {
            if (!labSlots.includes(slot)) {
              labSlots.push(slot);
            }
          }
          // Check if it's a theory slot (letters followed by numbers, but not starting with L)
          else if (/^[A-Z]+\d+$/i.test(slot)) {
            if (!theorySlots.includes(slot)) {
              theorySlots.push(slot);
            }
          }
        });
      }
    });
    
    // Detect clashes (slots with more than one course)
    const clashes = [];
    for (const [slot, courses] of Object.entries(slotCourseMap)) {
      if (courses.length > 1) {
        clashes.push({ slot, courses });
      }
    }
    
    // Sort the slots for better presentation
    theorySlots.sort();
    labSlots.sort();
    clashes.sort((a, b) => a.slot.localeCompare(b.slot));
    
    // Populate the clash detection container
    const clashContainer = document.getElementById('clash-list');
    const clashSection = document.querySelector('.clash-section');
    
    if (clashContainer && clashSection) {
      if (clashes.length > 0) {
        clashSection.style.display = 'block';
        clashContainer.innerHTML = clashes
          .map(clash => `
            <div class="clash-item">
              <div class="clash-slot">Slot ${clash.slot}:</div>
              <div class="clash-courses">${clash.courses.join(', ')}</div>
            </div>
          `)
          .join('');
      } else {
        clashSection.style.display = 'none';
      }
    }
    
    // Populate the theory occupied container
    const theoryContainer = document.getElementById('theory-occupied');
    if (theoryContainer) {
      if (theorySlots.length > 0) {
        theoryContainer.innerHTML = theorySlots
          .map(slot => `<span class="slot-badge">${slot}</span>`)
          .join('');
      } else {
        theoryContainer.innerHTML = '<span style="color: #999; font-size: 12px;">No theory slots</span>';
      }
    }
    
    // Populate the lab occupied container
    const labContainer = document.getElementById('lab-occupied');
    if (labContainer) {
      if (labSlots.length > 0) {
        labContainer.innerHTML = labSlots
          .map(slot => `<span class="slot-badge">${slot}</span>`)
          .join('');
      } else {
        labContainer.innerHTML = '<span style="color: #999; font-size: 12px;">No lab slots</span>';
      }
    }
    
    // Calculate and display total credits
    const totalCredits = Array.from(courseCards).reduce((sum, card) => {
      const courseTitle = card.querySelector('summary strong')?.textContent?.trim();
      return sum + getCourseCredits(courseTitle);
    }, 0);
    
    const creditSumElement = document.getElementById('credit-sum');
    if (creditSumElement) {
      creditSumElement.textContent = totalCredits.toString();
    }
    
    console.log('Found theory slots:', theorySlots);
    console.log('Found lab slots:', labSlots);
    console.log('Found clashes:', clashes);
    
  } catch (error) {
    console.log('Could not analyze course cards:', error);
    // Show error message in containers
    const clashContainer = document.getElementById('clash-list');
    const theoryContainer = document.getElementById('theory-occupied');
    const labContainer = document.getElementById('lab-occupied');
    
    if (clashContainer) {
      clashContainer.innerHTML = '<span style="color: #999; font-size: 12px;">Error checking clashes</span>';
    }
    if (theoryContainer) {
      theoryContainer.innerHTML = '<span style="color: #999; font-size: 12px;">Error loading slots</span>';
    }
    if (labContainer) {
      labContainer.innerHTML = '<span style="color: #999; font-size: 12px;">Error loading slots</span>';
    }
  }
}

function saveSidebarToStorage() {
  const entries = document.querySelectorAll('.course-entry');
  const data = [];

  entries.forEach(entry => {
    data.push({
      courseTitle: entry.dataset.title,
      slot: entry.dataset.slot,
      venue: entry.dataset.venue,
      faculty: entry.dataset.faculty
    });
  });

  localStorage.setItem('sidebarCourses', JSON.stringify(data));
}

function loadSidebarFromStorage() {
  const data = JSON.parse(localStorage.getItem('sidebarCourses') || '[]');
  data.forEach(({ courseTitle, slot, venue, faculty }) => {
    addCourseToSidebar(courseTitle, slot, venue, faculty, true);
  });
  
  // Update occupied slots after loading all courses from storage
  if (data.length > 0) {
    updateSidebarAnalysis();
  }
}

function addCourseToSidebar(courseTitle, slot, venue, faculty, skipSave = false) {
  const facultyList = document.getElementById('faculty-list') || sidebar;
  let existingEntry = null;

  const entries = facultyList.getElementsByClassName('course-entry');
  for (let entry of entries) {
    if (entry.dataset.title === courseTitle) {
      existingEntry = entry;
      break;
    }
  }

  // Determine badge text based on slot format
  function getBadgeText(slot) {
    const hasLab = /L\d+/i.test(slot);
    const hasTheory = /[A-Z]\d+(?![L])/i.test(slot);
    
    if (hasLab && hasTheory) {
      return "Theory + Lab";
    } else if (hasLab) {
      return "Lab";
    } else if (hasTheory) {
      return "Theory";
    }
    return "Course";
  }

  const badgeText = getBadgeText(slot);

  const entryHTML = `
    <details open class="course-card">
      <summary>
        <strong>${courseTitle}</strong>
        <button class="remove-btn" title="Remove">×</button>
      </summary>
      <div class="card-body">
        <p><strong>Slot:</strong> ${slot}</p>
        <p><strong>Venue:</strong> ${venue}</p>
        <p><strong>Faculty:</strong> ${faculty}</p>
        <p><span class="badge">${badgeText}</span><span class="credit-badge">${getCourseCredits(courseTitle)} Credits</span></p>
      </div>
    </details>
  `;

  if (existingEntry) {
    existingEntry.innerHTML = entryHTML;
    setEntryData(existingEntry, { courseTitle, slot, venue, faculty });
  } else {
    const entry = document.createElement('div');
    entry.className = 'course-entry';
    setEntryData(entry, { courseTitle, slot, venue, faculty });
    entry.innerHTML = entryHTML;
    facultyList.appendChild(entry);
  }

  // Add remove button handler after inserting into DOM
  const lastEntry = facultyList.lastElementChild || existingEntry;
  const removeBtn = lastEntry.querySelector('.remove-btn');
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lastEntry.remove();
    saveSidebarToStorage();
    // Update analysis after removing a course
    updateSidebarAnalysis();
  });

  if (!skipSave) {
    saveSidebarToStorage();
    // Update analysis after adding a course
    updateSidebarAnalysis();
  }
}

function setEntryData(entry, { courseTitle, slot, venue, faculty }) {
  entry.dataset.title = courseTitle;
  entry.dataset.slot = slot;
  entry.dataset.venue = venue;
  entry.dataset.faculty = faculty;
}


// Listen for clicks on slot/venue/faculty rows
const slotRows = document.querySelectorAll('.table-responsive table[style*="background: linear-gradient"] tbody tr');
const courseTitleEl = document.querySelector('.table-responsive table[style*="background-color: #e0f8f8"] tbody tr td:nth-child(2)');
const courseCodeEl = document.querySelector('.table-responsive table[style*="background-color: #e0f8f8"] tbody tr td:nth-child(1)');
let courseTitle = courseTitleEl ? courseTitleEl.textContent.trim() : '';

const courseCode = courseCodeEl ? courseCodeEl.textContent : '';

console.log('Course Code:', courseCode);

courseTitle = courseCode + ' - ' + courseTitle;

slotRows.forEach(row => {
  row.addEventListener('click', () => {
    if (!row.querySelector('td:nth-child(1)') || row.querySelector('td:nth-child(1)').textContent.trim() === 'E-Mail OTP') return;

    const cells = row.querySelectorAll('td');
    if (cells.length >= 3) {
      const slot = cells[0].textContent.trim();
      const venue = cells[1].textContent.trim();
      const faculty = cells[2].textContent.trim();
      addCourseToSidebar(courseTitle, slot, venue, faculty);
    }
  });
});

// Listen for messages from popup to toggle sidebar
chrome.runtime?.onMessage?.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleSidebar') {
    toggleBtn.click();
  }
});
