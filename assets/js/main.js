/**
 * CHRIZ DARREN ALMONTE - UNDERTALE & 8-BIT RETRO PIXEL GAME ENGINE
 * 3rd Year Student @ NCST | Front-End & Full-Stack Developer
 * Collapsible Side Bar Navigation & Fully Responsive for PC, Laptop & CP
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initSidebar();
  initPixelStarCanvas();
  initTypingEffect();
  initSkillBars();
  initCodePlayground();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ===================================================================
   1. SOUND ENGINE (Disabled)
   =================================================================== */
function playSound(type = 'click') {
  // Sound disabled per user preference
  return;
}

/* ===================================================================
   2. UNDERTALE SOUL THEME SELECTOR (Floating & Sidebar Support)
   =================================================================== */
function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeDropdown = document.querySelector('.theme-dropdown');
  const colorOptions = document.querySelectorAll('.color-option');

  if (themeToggle && themeDropdown) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      themeDropdown.classList.remove('open');
    });
  }

  colorOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const selectedTheme = opt.getAttribute('data-theme-choice');
      document.body.setAttribute('data-theme', selectedTheme);
      if (themeDropdown) themeDropdown.classList.remove('open');
      showToast(`Soul Mode: ${opt.innerText.trim()}`);
      playSound('success');
    });
  });
}

/* ===================================================================
   3. COLLAPSIBLE SIDEBAR NAVIGATION CONTROLLER
   =================================================================== */
window.openSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('active');
  document.body.classList.add('sidebar-active');
  playSound('click');
};

window.closeSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.classList.remove('sidebar-active');
};

window.toggleSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  if (sidebar.classList.contains('open')) {
    window.closeSidebar();
  } else {
    window.openSidebar();
  }
};

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const sidebarNavLinks = document.querySelectorAll('.sidebar-link, #sidebar-logo, #sidebar-btn-hire');

  if (toggleBtn) {
    toggleBtn.onclick = function(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      window.toggleSidebar();
    };
  }

  if (closeBtn) {
    closeBtn.onclick = function(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      window.closeSidebar();
      playSound('click');
    };
  }

  if (overlay) {
    overlay.onclick = function(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      window.closeSidebar();
    };
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      window.closeSidebar();
    }
  });

  // Handle all sidebar navigation link clicks with smooth scrolling
  sidebarNavLinks.forEach(link => {
    link.onclick = function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        if (e) e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        // Highlight active link immediately
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        if (link.classList.contains('sidebar-link')) {
          link.classList.add('active');
        }

        // Close sidebar
        window.closeSidebar();
        playSound('click');

        // Scroll to target section smoothly
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 60);
        }
      } else {
        window.closeSidebar();
      }
    };
  });

  // Scrollspy to mark active link
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ===================================================================
   4. 8-BIT RETRO PIXEL STARS & FLOATING HEARTS CANVAS
   =================================================================== */
function initPixelStarCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
  });

  const stars = [];
  const starCount = Math.min(Math.floor(window.innerWidth / 18), 50);

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      size: Math.random() > 0.8 ? 4 : 2,
      twinkle: Math.random() * 100,
      speed: Math.random() * 0.4 + 0.1
    });
  }

  const hearts = [];
  for (let i = 0; i < 5; i++) {
    hearts.push({
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      vy: Math.random() * 0.5 + 0.3,
      size: 10
    });
  }

  function drawPixelHeart(x, y, color = '#ff2b2b') {
    ctx.fillStyle = color;
    ctx.fillRect(x + 2, y, 2, 2);
    ctx.fillRect(x + 6, y, 2, 2);
    ctx.fillRect(x, y + 2, 10, 4);
    ctx.fillRect(x + 2, y + 6, 6, 2);
    ctx.fillRect(x + 4, y + 8, 2, 2);
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.twinkle += 1;
      s.y -= s.speed;
      if (s.y < 0) s.y = height;

      const alpha = Math.sin(s.twinkle * 0.05) > 0 ? 0.9 : 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);

      if (s.size > 2 && alpha > 0.5) {
        ctx.fillStyle = `rgba(255, 255, 0, 0.7)`;
        ctx.fillRect(Math.floor(s.x) - 2, Math.floor(s.y), 2, 2);
        ctx.fillRect(Math.floor(s.x) + s.size, Math.floor(s.y), 2, 2);
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y) - 2, 2, 2);
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y) + s.size, 2, 2);
      }
    }

    for (let i = 0; i < hearts.length; i++) {
      const h = hearts[i];
      h.y -= h.vy;
      if (h.y < -20) {
        h.y = height + 20;
        h.x = Math.floor(Math.random() * width);
      }
      drawPixelHeart(Math.floor(h.x), Math.floor(h.y), '#ff2b2b');
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ===================================================================
   5. DYNAMIC TYPING EFFECT (With Undertale Dialogue Sound)
   =================================================================== */
function initTypingEffect() {
  const typedEl = document.querySelector('.typed-text');
  if (!typedEl) return;

  const roles = [
    "Chriz Darren Almonte",
    "3rd Year Student @ NCST",
    "Front-End Web Developer",
    "UI/UX & Interactive Specialist",
    "Fills you with DETERMINATION."
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function type() {
    const currentText = roles[roleIdx];

    if (isDeleting) {
      typedEl.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 35;
    } else {
      typedEl.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 75;
      if (charIdx % 2 === 0) playSound('text');
    }

    if (!isDeleting && charIdx === currentText.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 600);
}

/* ===================================================================
   6. SKILL BARS (Undertale HP Gauge Style)
   =================================================================== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPercent = bar.getAttribute('data-percent') || '85%';
        bar.style.width = targetPercent;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  fills.forEach(fill => observer.observe(fill));
}

/* ===================================================================
   7. INTERACTIVE CODE PLAYGROUND (Chriz Darren Almonte Presets)
   =================================================================== */
const CODE_PRESETS = {
  js: {
    lang: "JavaScript",
    code: `// * (Seeing this JavaScript fills you with DETERMINATION.)
const developer = {
  name: "Chriz Darren Almonte",
  lv: 20, // Max Level of Coding
  hp: "99 / 99",
  school: "NCST (National College of Science and Technology)",
  year: "3rd Year BSIT",
  determination: Infinity
};

function encounter() {
  return \`* Chriz Darren Almonte approaches! 3rd Year BSIT from \${developer.school}.\`;
}

console.log(encounter());
console.log("* HP:", developer.hp, "| LV:", developer.lv);
console.log("* Status: READY TO BUILD 4 WEB PROJECTS & DEPLOY!");`,
    output: `* Chriz Darren Almonte approaches! 3rd Year BSIT from NCST (National College of Science and Technology).
* HP: 99 / 99 | LV: 20
* Status: READY TO BUILD 4 WEB PROJECTS & DEPLOY!
* (You won the battle! You gained 500 EXP and 100 G.)`
  },
  python: {
    lang: "Python",
    code: `# * NCST Student Battle Logic Engine
class NCSTPlayer:
    def __init__(self, name, year_level, campus):
        self.name = name
        self.year = year_level
        self.campus = campus
        self.soul = "Determination ❤️"

    def check_stats(self):
        return {
            "Player": self.name,
            "Campus": f"{self.campus} (Cavite)",
            "Level": self.year,
            "Soul": self.soul,
            "Status": "Ready for Web Development!"
        }

chriz = NCSTPlayer("Chriz Darren Almonte", "3rd Year BSIT", "NCST")
print(chriz.check_stats())`,
    output: `>>> python3 undertale_ncst.py
{
  'Player': 'Chriz Darren Almonte',
  'Campus': 'NCST (Cavite)',
  'Level': '3rd Year BSIT',
  'Soul': 'Determination ❤️',
  'Status': 'Ready for Web Development!'
}
[Finished with exit code 0]`
  },
  htmlcss: {
    lang: "HTML/CSS",
    code: `<!-- Undertale Pixel Battle Box -->
<div class="battle-box pixel-border">
  <div class="dialogue-text">
    * (Seeing Chriz Darren Almonte's portfolio fills you with DETERMINATION.)
  </div>
  <div class="actions">
    <button class="btn-fight">[ FIGHT ]</button>
    <button class="btn-act active">❤️ [ ACT ]</button>
    <button class="btn-item">[ ITEM ]</button>
    <button class="btn-mercy">[ MERCY ]</button>
  </div>
</div>`,
    output: `[Pixel Render Buffer]:
* Dialogue Box parsed with 4px solid white border
* Red Soul cursor assigned to [ ACT ]
* Text rasterized with Press Start 2P & VT323
* 60 FPS pixel perfect rendering complete!`
  },
  php: {
    lang: "PHP / SQL",
    code: `<?php
// NCST Student Database Query
$conn = new PDO('mysql:host=localhost;dbname=underground', 'frisk', 'chriz');

$stmt = $conn->prepare("SELECT name, year_level, gpa, campus FROM students WHERE id = ?");
$stmt->execute(["NCST-2023-CHRIZ"]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
  "code" => 200,
  "student" => "Chriz Darren Almonte",
  "program" => "3rd Year BSIT",
  "college" => "National College of Science and Technology",
  "gold" => "9999G"
], JSON_PRETTY_PRINT);
?>`,
    output: `{
    "code": 200,
    "student": "Chriz Darren Almonte",
    "program": "3rd Year BSIT",
    "college": "National College of Science and Technology",
    "gold": "9999G"
}
[Connection: OK] Query resolved in 0.001s.`
  }
};

function initCodePlayground() {
  const codeArea = document.getElementById('code-display');
  const consoleOutput = document.getElementById('console-output');
  const tabs = document.querySelectorAll('.lang-tab');
  const runBtn = document.getElementById('btn-run-code');

  if (!codeArea || !consoleOutput || !runBtn) return;

  let currentLang = 'js';

  function renderCode(langKey) {
    const data = CODE_PRESETS[langKey];
    if (!data) return;
    codeArea.textContent = data.code;
    consoleOutput.textContent = `* [Ready] Select "▶ Run Code" to execute script.`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentLang = tab.getAttribute('data-lang');
      renderCode(currentLang);
      playSound('click');
    });
  });

  runBtn.addEventListener('click', () => {
    playSound('run');
    consoleOutput.textContent = "* Executing code in Undertale sandbox...";
    consoleOutput.style.color = "#ffff00";

    setTimeout(() => {
      const data = CODE_PRESETS[currentLang];
      consoleOutput.style.color = "#ffffff";
      consoleOutput.textContent = data ? data.output : "* Execution complete.";
      playSound('success');
    }, 400);
  });

  renderCode('js');
}

/* ===================================================================
   8. FILTERABLE PROJECTS (4 Projects)
   =================================================================== */

/* Matrix rain toggle */
let matrixInterval = null;
function toggleMatrixRain() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
    initPixelStarCanvas();
    showToast('Matrix mode OFF');
    return;
  }

  showToast('Matrix mode ON! (type matrix to stop)');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const cols = Math.floor(width / 20);
  const drops = Array(cols).fill(1);
  const chars = '0123456789ABCDEFNCST_CHRIZ_ALMONTE';

  matrixInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff00';
    ctx.font = '16px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * 20, drops[i] * 20);
      if (drops[i] * 20 > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 35);
}

/* ===================================================================
   9. FILTERABLE PROJECTS (4 Projects)
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   10. PROJECT DETAIL MODAL (4 Projects Complete Data)
   =================================================================== */
const PROJECTS_DATA = {
  1: {
    title: "BSLA Admissions & Student Portal",
    category: "Academic Web App / Student Portal",
    tags: ["PHP & MySQL", "JavaScript", "DepEd Vouchers", "Paperless Workflow", "Portal System"],
    image: "assets/images/project-bsla-portal.png",
    description: "An official full-featured paperless admissions and student enrollment system for Biringan Science & Leadership Academy (BSLA). Supports Junior/Senior High online applications, voucher verification, and real-time portal tracking.",
    highlights: [
      "Paperless applicant registration workflow with PDF/credential upload pipeline",
      "DepEd / PEAC-ESC voucher discount eligibility calculator and verification",
      "Comprehensive applicant dashboard with live admission step milestones",
      "Responsive navigation designed for students, parents, and administrative staff"
    ]
  },
  2: {
    title: "NCST Event Tracker Attendance for Incentives",
    category: "Campus Web App / Event Attendance & Incentives",
    tags: ["Attendance Tracking", "Student Incentives", "QR Verification", "NCST System", "Real-Time Logging"],
    image: "assets/images/project-ncst-foundation.png",
    description: "A campus-wide event check-in and attendance monitoring system designed for National College of Science & Technology (NCST). Automates student attendance logging during institutional events, calculates and credits academic incentive points, and provides real-time verification for instructors and student affairs.",
    highlights: [
      "Automated student attendance tracking with instant check-in and timestamp logging",
      "Dynamic academic incentive points calculator based on event participation and attendance duration",
      "QR code and student ID authentication for quick campus gate & event hall verification",
      "Exportable attendance logs and real-time dashboard for faculty and department heads"
    ]
  },
  3: {
    title: "Cooking Quest (Jerjerkings)",
    category: "Game Development / Web & Python",
    tags: ["Python / Pygame", "Game Loop", "UI Design", "Interactive Menus", "Jerjerkings 2026"],
    image: "assets/images/project-cookingquest.png",
    description: "An interactive culinary adventure game featuring retro menus, audio settings, interactive cooking encounters, and high-score tracking built by team Jerjerkings in 2026.",
    highlights: [
      "Custom game start screen, interactive settings modal, and exit handlers",
      "Smooth game state management with sound effects and responsive inputs",
      "Retro pixel typography aesthetic harmonized with classic arcade game loops",
      "Modular Python codebase adaptable for desktop distribution and browser execution"
    ]
  },
  4: {
    title: "JavaMinesweeper",
    category: "Desktop & Web Logic / Java App",
    tags: ["Java / OOP", "Minesweeper Algorithm", "Particle Background", "User Profiles", "Highscores"],
    image: "assets/images/project-minesweeper.png",
    description: "A custom logic implementation of Minesweeper featuring animated floating mine particle canvas, multi-user profile switcher ('Current User: monkey'), persistent high scores, and responsive game states.",
    highlights: [
      "Dynamic background with randomized floating mine particles and collision math",
      "Custom user profile management system allowing seamless player switching",
      "Grid sweep logic algorithm with recursive zero-tile clearing",
      "Persistent high-score leaderboard tracking best time and accuracy"
    ]
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.btn-view-details');

  if (!modalOverlay || !modalCloseBtn) return;

  function openModal(id) {
    const data = PROJECTS_DATA[id];
    if (!data) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.description;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = data.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = data.highlights.map(h => `<li>* ${h}</li>`).join('');

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    playSound('click');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      openModal(projId);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   11. INTERACTIVE CONTACT FORM
   =================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('* Please complete all fields!');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "* TRANSMITTING MESSAGE...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
      showToast(`* Thank you, ${name}! Your message reached Chriz.`);
      playSound('success');
    }, 900);
  });
}

/* ===================================================================
   12. RETRO TOAST NOTIFICATION
   =================================================================== */
function showToast(msg) {
  let toast = document.querySelector('.toast-box');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-box';
    toast.innerHTML = `<span class="toast-icon">❤️</span> <span class="toast-text"></span>`;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-text').textContent = msg;
  toast.classList.add('show');

  if (toast.timer) clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
