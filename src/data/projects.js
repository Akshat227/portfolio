// This is your project shelf. Only what's listed here shows up on the site —
// it does NOT auto-pull from GitHub, so nothing appears unless you add it.
//
// To add a project: copy an object below, fill it in, done.
// To remove one: delete its object.
// `order` controls display order (lower = earlier). `pinned` puts a "featured" tag on the card.

export const projects = [
  {
    id: 'gatesim',
    order: 1,
    pinned: true,
    title: 'GateSim',
    year: '2025',
    tagline: 'Real-time logic gate simulator, built in C++/raylib',
    description:
      'A from-scratch digital logic simulator with bezier wire routing, custom node saving, truth-table and Karnaugh-map analysis, clock gates, and MUX/DMUX/encoder/decoder support.',
    stack: ['C++', 'raylib', 'Digital Logic'],
    githubUrl: 'https://github.com/Akshat227/gatesim',
    demoUrl: '',
  },
  {
    id: 'seo-energy-monitor',
    order: 2,
    pinned: true,
    title: 'SEO — Smart Energy Monitor',
    year: '2025',
    tagline: 'ESP32 energy monitor with a native C++ desktop dashboard',
    description:
      'An ESP32-based power monitoring rig paired with a raylib desktop dashboard for live readouts, running on Arch Linux end to end.',
    stack: ['ESP32', 'C++', 'raylib', 'Embedded'],
    githubUrl: 'https://github.com/Akshat227/seo-energy-monitor',
    demoUrl: '',
  },
  {
    id: 'minimal-vcs',
    order: 3,
    pinned: false,
    title: 'Minimal Version Control',
    year: '2024',
    tagline: 'A one-night Git-like VCS, built from first principles',
    description:
      'A minimal version control system implemented in C++ using SHA-256 hashing, std::filesystem, and an LCS-based diff algorithm.',
    stack: ['C++', 'SHA-256', 'Filesystem'],
    githubUrl: 'https://github.com/Akshat227/minimal-vcs',
    demoUrl: '',
  },
  {
    id: 'whatsapp-scheduler',
    order: 4,
    pinned: false,
    title: 'WhatsApp Scheduled Messenger',
    year: '2024',
    tagline: 'Node.js app for scheduling WhatsApp messages',
    description:
      'A scheduled messaging tool built on whatsapp-web.js, letting messages queue and fire at a set time without manual sending.',
    stack: ['Node.js', 'whatsapp-web.js'],
    githubUrl: 'https://github.com/Akshat227/whatsapp-scheduler',
    demoUrl: '',
  },
  {
    id: 'upi-esp32-receipt',
    order: 5,
    pinned: false,
    title: 'UPI Receipt System',
    year: '2024',
    tagline: 'C++ payment receipt system integrated with ESP32 over HTTP',
    description:
      'A UPI payment receipt system in C++ that talks to an ESP32 over HTTP to trigger and log receipts in real time.',
    stack: ['C++', 'ESP32', 'HTTP'],
    githubUrl: 'https://github.com/Akshat227/upi-esp32-receipt',
    demoUrl: '',
  },
]

// Sorted, ready-to-render list.
export const sortedProjects = [...projects].sort((a, b) => a.order - b.order)
