// Node Database containing detailed metadata for the flowchart nodes
const nodeDatabase = {
  'client-order': {
    title: 'Client Order Received',
    subtitle: 'Step 1: Onboarding and Specifications Lock',
    desc: 'The project begins here. Contract details, commercial rates, client parameters, scope limits, and exact facade or interior specifications are logged as the baseline reference for the entire system.',
    inputs: ['Contract Paper', 'Architectural Intent', 'Spec Sheet'],
    outputs: ['Signed Order', 'Billing Baseline', 'Technical Limits'],
    roles: ['Owner', 'Management', 'Project Manager'],
    automation: 'WhatsApp notifications are triggered automatically to all stakeholders announcing the new project onboarding.'
  },
  'wbs-generator': {
    title: 'Project Created & WBS Generated',
    subtitle: 'Step 2: WBS Breakdown',
    desc: 'Generate a hierarchical Work Breakdown Structure (WBS) dividing the building into structural modules. For example: Tower A → Floor 12 → Elevation West → Zone 2. This structure is used to map drawings, BOQ line items, and installation status.',
    inputs: ['Building Floorplans', 'Elevation Drawings', 'WBS Excel template'],
    outputs: ['WBS Tree Ledger', 'Unique Item Barcodes', 'WBS Map'],
    roles: ['Project Manager', 'Design Team'],
    automation: 'AI creates the initial WBS structure by scanning floor plans, auto-labeling levels and zones.'
  },
  'design-management': {
    title: 'Design Management & Drawing Version Control',
    subtitle: 'Step 3: Drawing Approval Lifecycle',
    desc: 'Design files (Shop Drawings, Structural Drawings, Detail Cutlists) are managed here. Uploads are strictly versioned. A simple approval loop (Designer → Project Manager → Client Architect) locks drawings. Only "Approved" drawings are active for factory cutting.',
    inputs: ['CAD Files', 'Revisions Sheet', 'Structural Analysis'],
    outputs: ['Version Lock (V1, V2)', 'Client Approved Drawing PDF', 'Cutlist Sheets'],
    roles: ['Design Team', 'Project Manager', 'Owner'],
    automation: 'Site engineer app blocks scanning of outdated drawings, showing a RED alert: "OUTDATED DRAWING. View active revision V3 instead."'
  },
  'boq-bom': {
    title: 'BOQ & BOM Generation',
    subtitle: 'Step 4: Quantities & Material Mapping',
    desc: 'Generate the Bill of Quantities (BOQ) and Bill of Materials (BOM) mapped directly to WBS nodes. Track item status (Confirmed, Ordered, Pending, Cancelled) dynamically.',
    inputs: ['Approved Drawings', 'Material Specifications', 'Rate Master'],
    outputs: ['Digital BOQ', 'BOM Release Sheets', 'Material Budget'],
    roles: ['Project Manager', 'Store/Warehouse'],
    automation: 'BOM automatically syncs with the procurement system. Stock level checks trigger purchase recommendations.'
  },
  'factory-production': {
    title: 'Factory Production Management',
    subtitle: 'Step 5A: Fabrication & Assembly',
    desc: 'Production releases are sent to the factory floor. Profiles cutting, panel assembly, glazing, and finishing are tracked using status boards. Factory workers update logs upon completing parts.',
    inputs: ['BOM Release Sheets', 'Approved Cutlists', 'Raw Profiles Stock'],
    outputs: ['Assembled Panels', 'Completed Assemblies', 'Production Status Log'],
    roles: ['Factory Team'],
    automation: 'Factory panel finishing triggers an automated barcode sticker print, registering the item as "Ready for QC".'
  },
  'material-procurement': {
    title: 'Material Procurement',
    subtitle: 'Step 5B: RFQs & Orders',
    desc: 'For non-fabricated or outsourced materials, RFQs are dispatched to pre-approved vendors. Manage purchase orders (PO), record supplier confirmations, and track estimated times of delivery (ETA).',
    inputs: ['BOM Release Sheets', 'Vendor Catalogues', 'Budget Thresholds'],
    outputs: ['RFQ Pushes', 'Active POs', 'Vendor Delivery Ledger'],
    roles: ['Store/Warehouse', 'Management'],
    automation: 'AI forecasts material delivery times based on past vendor performance and flags critical delay risks.'
  },
  'quality-inspection': {
    title: 'Quality Inspection (QC)',
    subtitle: 'Step 6: Dimensional Verification',
    desc: 'Finished assemblies undergo stringent quality checks. Inspectors record dimensions, check finishes, and log QC releases. Rejected items trigger immediate re-work instructions.',
    inputs: ['Assembled Panels', 'QC Tolerance Sheet', 'Inspection Checklist'],
    outputs: ['QC Stamp Approval', 'Re-work Logs', 'QC Report Ledger'],
    roles: ['Factory Team', 'Project Manager'],
    automation: 'Failed QC logs instantly notify the Factory manager with photos of the defect, creating a high-priority re-work card.'
  },
  'store-warehouse': {
    title: 'Store & Warehouse Management',
    subtitle: 'Step 7: Goods Receipt & Storage',
    desc: 'QC approved panels and procured materials are received into store inventories. Log physical storage bins, manage minimum levels, and update ledger balances.',
    inputs: ['QC Stamp Approval', 'Vendor PO challan', 'Storage Bin Map'],
    outputs: ['Store Ledger Update', 'Ready Stock Balance', 'Bin Tagged Inventory'],
    roles: ['Store/Warehouse'],
    automation: 'Daily stock logs are emailed as a structured report to the Project Manager.'
  },
  'dispatch-planning': {
    title: 'Dispatch Planning & Challan Tracking',
    subtitle: 'Step 8: Logistics & Partial Dispatches',
    desc: 'Logistics team plans dispatch loads. System generates transport Challans listing specific panel barcodes. Tracks vehicles, dispatch percentages, and transits.',
    inputs: ['Ready Stock Balance', 'Transporter Rates', 'Loading plan'],
    outputs: ['Digital Challan', 'Gate Pass', 'Transit Vehicle Tracking'],
    roles: ['Dispatch Team', 'Store/Warehouse'],
    automation: 'System generates partial dispatch sheets showing exactly what panels are in truck A vs truck B, pushing Challan PDF copy to Transporter WhatsApp.'
  },
  'site-received': {
    title: 'Site Material Received',
    subtitle: 'Step 9: Site Gate-In & Verification',
    desc: 'Materials arrive at the project site. The site engineer inspects the consignment against the digital Challan, counts boxes, and scans barcodes to verify successful gate-in.',
    inputs: ['Transit Vehicle Tracking', 'Physical Challan Copy', 'Barcode scanner app'],
    outputs: ['Site Received Ledger', 'Receiving Discrepancies Log', 'Unloaded Stock Balance'],
    roles: ['Site Engineer', 'Store/Warehouse'],
    automation: 'A WhatsApp message is auto-sent to the Factory: "Challan #1042 successfully received on site. 24/25 items accounted. 1 item reported missing."'
  },
  'labour-allocation': {
    title: 'Contractor & Labour Allocation',
    subtitle: 'Step 10: Site Resource Management',
    desc: 'Log contractor attendance, track daily active labour count, and map installation teams to building towers and zones.',
    inputs: ['Contractor Labour list', 'Daily Attendance Sheet', 'Zone Allocations'],
    outputs: ['Labour Attendance Ledger', 'Active Resource Count', 'Daily Labour Cost log'],
    roles: ['Site Engineer', 'Contractor'],
    automation: 'AI logs labour productivity scores by comparing active installers count with panels installed.'
  },
  'installation-progress': {
    title: 'Installation & DPR Engine',
    subtitle: 'Step 11: Site Progress Tracking',
    desc: 'Site engineers mark panels/areas as "Installed" on their mobile apps. They log daily progress, upload photos of completed works, and report blockers (no power, scaffolding issues, client changes).',
    inputs: ['Unloaded Stock Balance', 'Drawing Reference Map', 'Site Photos / Issue Logs'],
    outputs: ['Installation logs', 'Daily Progress Report (DPR)', 'Blockers Matrix'],
    roles: ['Site Engineer', 'Contractor', 'Project Manager'],
    automation: 'WhatsApp DPR bot sends daily installation summaries, progress images, and active blockers directly to the management group at 6:30 PM.'
  },
  'trdi-auto': {
    title: 'TRDI Progress Calculation',
    subtitle: 'Step 12: Real-time Metric Mapping',
    desc: 'System auto-calculates TRDI (Total Realtime Delivery & Installation). It tracks what percent is Designed vs Manufactured vs Shipped vs Installed, giving a singular progress status for each zone.',
    inputs: ['Version Lock (V1, V2)', 'Production Status Log', 'Site Received Ledger', 'Installation logs'],
    outputs: ['TRDI Percentage Chart', 'Zone Status Reports', 'Progress analytics'],
    roles: ['Project Manager', 'Owner', 'Management'],
    automation: 'A central dashboard visualizes status colors (Green, Yellow, Red) for each floor, showing exact installation percentages.'
  },
  'dashboard-whatsapp': {
    title: 'Dashboard & WhatsApp Reports',
    subtitle: 'Step 13: Executive Analytics',
    desc: 'Centralized analytics summarizing project health, financial ledgers, and operational parameters. Pushes progress updates and alerts.',
    inputs: ['TRDI Percentage Chart', 'Labour Attendance Ledger', 'Blockers Matrix'],
    outputs: ['Owner Dashboard Stats', 'WhatsApp PDF Reports', 'Operational alerts'],
    roles: ['Owner', 'Management', 'Project Manager'],
    automation: 'AI scans active blockers and drafts critical alerts to the management group if a task is delayed by over 48 hours.'
  },
  'billing-payments': {
    title: 'Billing & Ledger Payments',
    subtitle: 'Step 14: Client & Vendor Financials',
    desc: 'Tracks commercial bills. Generate invoices on completed installation milestones, manage vendor ledger balances, record payments, and track outstandings.',
    inputs: ['Installation logs', 'Contract Billing Milestones', 'Vendor invoices'],
    outputs: ['Client Invoices', 'Outstanding Bills Report', 'Account Ledgers'],
    roles: ['Owner', 'Management'],
    automation: 'Successful milestone verification on site triggers an automated invoice draft creation in the finance panel.'
  },
  'project-close': {
    title: 'Project Completed & Closed',
    subtitle: 'Step 15: Handover and Archive',
    desc: 'Log final measurements, complete snag-list corrections, gather client sign-off certificate, release contractor balances, and archive drawings for maintenance references.',
    inputs: ['Installation logs', 'Snag Lists', 'Client sign-off paper'],
    outputs: ['Handover Certificate', 'Project Closure Report', 'Archived Drawings'],
    roles: ['Owner', 'Management', 'Project Manager'],
    automation: 'System marks the project database as "Archived" and sends a WhatsApp thank you greeting with the final project dashboard summary to the client.'
  }
};

// Roles Database containing dashboard configurations
const rolesDatabase = {
  'owner': {
    title: 'Owner Dashboard View',
    badge: 'Executive Level',
    widgets: [
      { title: 'Project Health', value: '94%', trend: 'up', trendText: '+1.2% this week' },
      { title: 'Project Revenue', value: '₹4.85 Cr', trend: 'neutral', trendText: 'On target' },
      { title: 'TRDI Completion', value: '62.4%', trend: 'up', trendText: '+4.5% installed' },
      { title: 'Active Blockers', value: '2 Issues', trend: 'down', trendText: '-1 resolved' }
    ],
    details: [
      { label: 'Primary Focus', value: 'Revenue, Overall delays, Cash Flow, Project Health scores.' },
      { label: 'Daily Routine', value: 'Scans the high-level dashboard and receives the 6:30 PM AI WhatsApp Summary.' },
      { label: 'Decision Role', value: 'Approves budget enhancements and resolves high-priority escalations.' },
      { label: 'Key Metric', value: 'TRDI (Total Realtime Delivery & Installation) indicating actual billing potential.' }
    ]
  },
  'pm': {
    title: 'Project Manager Dashboard View',
    badge: 'Management Level',
    widgets: [
      { title: 'Milestones Completed', value: '14 / 20', trend: 'up', trendText: 'On track' },
      { title: 'Drawing Approvals', value: '3 Pending', trend: 'down', trendText: 'Needs client review' },
      { title: 'Active Labours', value: '142', trend: 'neutral', trendText: 'Required: 150' },
      { title: 'Site Disputes', value: '0 Logs', trend: 'up', trendText: 'All clear' }
    ],
    details: [
      { label: 'Primary Focus', value: 'Timeline control, resource tracking, coordinator alignments.' },
      { label: 'Daily Routine', value: 'Inspects site logs, approves drawings, checks dispatch manifests.' },
      { label: 'Decision Role', value: 'Coordinates between Design, Factory, and Site teams to resolve blockers.' },
      { label: 'Key Metric', value: 'Baseline vs Actual dates variance, and site attendance consistency.' }
    ]
  },
  'design': {
    title: 'Design Team Dashboard View',
    badge: 'Engineering Level',
    widgets: [
      { title: 'Total Drawings', value: '64 Drawings', trend: 'neutral', trendText: 'All files locked' },
      { title: 'Approved Drawings', value: '52 Files', trend: 'up', trendText: 'V3 Active' },
      { title: 'Under Revision', value: '8 Files', trend: 'neutral', trendText: 'Deadline: Friday' },
      { title: 'Pending Approval', value: '4 Files', trend: 'down', trendText: 'Sent to client' }
    ],
    details: [
      { label: 'Primary Focus', value: 'Drawing version control, Shop drawings release, BOM mapping.' },
      { label: 'Daily Routine', value: 'Revises CAD files, uploads PDFs with system tags, updates version notes.' },
      { label: 'Decision Role', value: 'Locks and unlocks cutlists based on site floor measurements.' },
      { label: 'Key Metric', value: 'Design lead time, revision frequency, and approval speed.' }
    ]
  },
  'factory': {
    title: 'Factory Team Dashboard View',
    badge: 'Production Level',
    widgets: [
      { title: 'Production release', value: '18 Orders', trend: 'up', trendText: 'In progress' },
      { title: 'Glazed Panels Ready', value: '180 Panels', trend: 'up', trendText: '+24 today' },
      { title: 'QC Rejection rate', value: '1.2%', trend: 'down', trendText: 'Goal: < 2.0%' },
      { title: 'Raw Material Stock', value: 'Ok', trend: 'neutral', trendText: '30-day coverage' }
    ],
    details: [
      { label: 'Primary Focus', value: 'Manufacturing timelines, assembly QC, profile optimization.' },
      { label: 'Daily Routine', value: 'Tracks cutting logs, prints QR tags, updates QC status in portal.' },
      { label: 'Decision Role', value: 'Schedules production batches based on site layout priority.' },
      { label: 'Key Metric', value: 'Daily production yield, profile utilization efficiency, QC pass rate.' }
    ]
  },
  'store': {
    title: 'Store & Warehouse View',
    badge: 'Inventory Level',
    widgets: [
      { title: 'Stock Value', value: '₹1.2 Cr', trend: 'neutral', trendText: 'Audited yesterday' },
      { title: 'Materials Inward', value: '14 Tons', trend: 'up', trendText: 'Supplier: Hindalco' },
      { title: 'Materials Outward', value: '11 Tons', trend: 'up', trendText: 'To Site' },
      { title: 'Scanned QR Codes', value: '384 Scans', trend: 'up', trendText: '100% check pass' }
    ],
    details: [
      { label: 'Primary Focus', value: 'Stock accuracy, bin location tagging, goods inward notes (GRN).' },
      { label: 'Daily Routine', value: 'Logs material arrivals, verifies PO counts, schedules dispatches.' },
      { label: 'Decision Role', value: 'Flags inventory shortages and triggers purchase alerts.' },
      { label: 'Key Metric', value: 'Inventory turnaround, storage optimization, count discrepancy.' }
    ]
  },
  'dispatch': {
    title: 'Dispatch Team Dashboard View',
    badge: 'Logistics Level',
    widgets: [
      { title: 'Vehicles Dispatched', value: '12 Trucks', trend: 'neutral', trendText: 'All challans digital' },
      { title: 'Transit Progress', value: '8 in Transit', trend: 'up', trendText: '4 Delivered' },
      { title: 'Transit Delays', value: '1 Alert', trend: 'blocked', trendText: 'Route congestion' },
      { title: 'Transporters Active', value: '3 Vendors', trend: 'neutral', trendText: 'Agreements locked' }
    ],
    details: [
      { label: 'Primary Focus', value: 'Truck loading plans, dispatch challan generation, vehicle tracking.' },
      { label: 'Daily Routine', value: 'Assigns vehicles, updates transit logs, sends challan links to driver.' },
      { label: 'Decision Role', value: 'Coordinates route changes or truck replacements in case of breakdown.' },
      { label: 'Key Metric', value: 'On-time delivery, vehicle load optimization, unloading delay.' }
    ]
  },
  'site': {
    title: 'Site Engineer Dashboard View',
    badge: 'Operations Level',
    widgets: [
      { title: 'Active Areas', value: 'Tower B, Fl 4-6', trend: 'neutral', trendText: 'Zone 1 & 2' },
      { title: 'Panels Installed', value: '18 Panels', trend: 'up', trendText: 'Today progress' },
      { title: 'Daily DPR Status', value: 'Submitted', trend: 'completed', trendText: 'Saved at 5:30 PM' },
      { title: 'Open Blockers', value: '1 Issue', trend: 'blocked', trendText: 'Scaffolding repair' }
    ],
    details: [
      { label: 'Primary Focus', value: 'On-site installation speeds, DPR data capturing, photo logs.' },
      { label: 'Daily Routine', value: 'Scans received shipments, assigns workers, reports site issues.' },
      { label: 'Decision Role', value: 'Identifies site site blockers and logs them for PM action.' },
      { label: 'Key Metric', value: 'Daily installation rate, panel matching correctness, safety score.' }
    ]
  },
  'contractor': {
    title: 'Contractor Dashboard View',
    badge: 'Resource Level',
    widgets: [
      { title: 'Labour Strength', value: '48 Active', trend: 'up', trendText: 'Required: 50' },
      { title: 'panels Completed', value: '12 Panels', trend: 'neutral', trendText: 'Target: 15' },
      { title: 'Measurement Sheet', value: 'Approved', trend: 'completed', trendText: 'Milestone 4' },
      { title: 'Outstanding Pay', value: '₹3.4 Lakhs', trend: 'neutral', trendText: 'Process date: 15th' }
    ],
    details: [
      { label: 'Primary Focus', value: 'Labour availability, daily work targets, measurement approvals.' },
      { label: 'Daily Routine', value: 'Deploys installers, logs attendance, updates site engineer on measurements.' },
      { label: 'Decision Role', value: 'Adjusts labour strength shifts based on material arrivals.' },
      { label: 'Key Metric', value: 'Labour output efficiency, attendance logs, snag repair rate.' }
    ]
  }
};

// Tab Switching Mechanism
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(tabId).classList.add('active');
  
  // Update nav button active state
  const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
    btn.getAttribute('onclick').includes(tabId)
  );
  if (activeBtn) activeBtn.classList.add('active');
  
  // Highlight nodes in the flowchart matching roles if we switch to the flowchart tab
  if (tabId === 'tab-flowchart') {
    // If a role button was active, re-highlight the flowchart nodes corresponding to it
    const activeRoleBtn = document.querySelector('.role-btn.active');
    if (activeRoleBtn) {
      const roleId = activeRoleBtn.id.replace('btn-', '');
      highlightFlowchartForRole(roleId);
    }
  }
}

// Interactive Flowchart Modal Dialog
function showNodeDetails(nodeId) {
  const data = nodeDatabase[nodeId];
  if (!data) return;

  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('modal-subtitle').innerText = data.subtitle;
  document.getElementById('modal-desc').innerText = data.desc;

  // Add Input Tags
  const inputContainer = document.getElementById('modal-inputs');
  inputContainer.innerHTML = '';
  data.inputs.forEach(inp => {
    const span = document.createElement('span');
    span.className = 'modal-tag';
    span.innerText = inp;
    inputContainer.appendChild(span);
  });

  // Add Output Tags
  const outputContainer = document.getElementById('modal-outputs');
  outputContainer.innerHTML = '';
  data.outputs.forEach(out => {
    const span = document.createElement('span');
    span.className = 'modal-tag';
    span.innerText = out;
    outputContainer.appendChild(span);
  });

  // Add Responsible Roles Tags
  const rolesContainer = document.getElementById('modal-roles');
  rolesContainer.innerHTML = '';
  data.roles.forEach(role => {
    const span = document.createElement('span');
    span.className = 'modal-tag role';
    span.innerText = role;
    rolesContainer.appendChild(span);
  });

  // Add Automation/AI Notes
  const autoEl = document.getElementById('modal-automation');
  const autoSec = document.getElementById('modal-automation-section');
  if (data.automation) {
    autoSec.style.display = 'block';
    autoEl.innerText = data.automation;
  } else {
    autoSec.style.display = 'none';
  }

  // Show Modal
  document.getElementById('node-modal-backdrop').classList.add('show');
}

function closeNodeModal(e) {
  document.getElementById('node-modal-backdrop').classList.remove('show');
}

// ESC Key closes modal too
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeNodeModal(null);
  }
});

// Switch Role & Highlight Flowchart
function switchRole(roleId) {
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`btn-${roleId}`).classList.add('active');

  // Update Dashboard Mockup View
  const data = rolesDatabase[roleId];
  if (data) {
    document.getElementById('role-dashboard-title').innerText = data.title;
    document.getElementById('role-dashboard-badge').innerText = data.badge;

    // Load Widgets
    const widgetsContainer = document.getElementById('dashboard-widgets-container');
    widgetsContainer.innerHTML = '';
    data.widgets.forEach(w => {
      const trendClass = w.trend === 'up' ? 'up' : (w.trend === 'blocked' ? 'down' : 'neutral');
      const trendArrow = w.trend === 'up' ? '▲' : (w.trend === 'blocked' ? '▼' : '●');
      widgetsContainer.innerHTML += `
        <div class="widget">
          <span class="widget-title">${w.title}</span>
          <span class="widget-value">${w.value}</span>
          <span class="widget-trend ${trendClass}">${trendArrow} ${w.trendText}</span>
        </div>
      `;
    });

    // Load Detail Grid
    const detailPane = document.getElementById('role-detail-pane');
    detailPane.innerHTML = `
      <h4>Role Information Profile</h4>
      <div class="detail-grid">
        ${data.details.map(d => `
          <div class="detail-item">
            <span class="detail-label">${d.label}</span>
            <div class="detail-value">${d.value}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  highlightFlowchartForRole(roleId);
}

// Highlight Flowchart Nodes associated with a specific role
function highlightFlowchartForRole(roleId) {
  const normalizedRoleMap = {
    'owner': 'Owner',
    'pm': 'Project Manager',
    'design': 'Design Team',
    'factory': 'Factory Team',
    'store': 'Store/Warehouse',
    'dispatch': 'Dispatch Team',
    'site': 'Site Engineer',
    'contractor': 'Contractor'
  };
  
  const targetRoleName = normalizedRoleMap[roleId];
  
  // Highlight Nodes
  document.querySelectorAll('.flow-node').forEach(node => {
    node.classList.remove('highlighted');
  });

  // Scan database and add highlight classes
  Object.keys(nodeDatabase).forEach(nodeKey => {
    const data = nodeDatabase[nodeKey];
    if (data.roles.includes(targetRoleName)) {
      // Find element (we need to search click attributes or IDs)
      const matches = Array.from(document.querySelectorAll('.flow-node')).filter(el => 
        el.getAttribute('onclick') && el.getAttribute('onclick').includes(nodeKey)
      );
      matches.forEach(m => m.classList.add('highlighted'));
    }
  });
}

// Miro Board and Questions Persistence (localStorage)
const miroInputs = ['miro-asis', 'miro-problems', 'miro-tobe', 'miro-phase1', 'miro-futuremodules'];
const questionInputs = ['q-priority-module', 'q-one-problem', 'q-owner-report', 'q-whatsapp-format', 'q-success-criteria', 'q-rdash-like', 'q-rdash-dislike'];

function saveToLocalStorage() {
  miroInputs.forEach(id => {
    localStorage.setItem(id, document.getElementById(id).value);
  });
  questionInputs.forEach(id => {
    localStorage.setItem(id, document.getElementById(id).value);
  });
}

function loadFromLocalStorage() {
  miroInputs.forEach(id => {
    const saved = localStorage.getItem(id);
    if (saved !== null) document.getElementById(id).value = saved;
  });
  questionInputs.forEach(id => {
    const saved = localStorage.getItem(id);
    if (saved !== null) document.getElementById(id).value = saved;
  });
}

// Register keyup listeners to save inputs on the fly
window.onload = function() {
  loadFromLocalStorage();
  
  miroInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keyup', saveToLocalStorage);
  });
  questionInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keyup', saveToLocalStorage);
  });

  // Initialize first role dashboard (Owner)
  switchRole('owner');

  // Initialize new interactive Miro components
  initMiroBoardInteractions();

  // Initialize client pitch mode
  loadClientPitchMode();
};

function clearMiro() {
  if (confirm("Are you sure you want to clear all notes on this Miro canvas? This cannot be undone.")) {
    miroInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    questionInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    saveToLocalStorage();
  }
}

// Export Captured Meeting Notes as Markdown Text
function exportMiro() {
  let md = `# CLIENT WORKFLOW MEETING MINUTES & SCOPE CAPTURE\n`;
  md += `*Generated via BuildOS Interactive Workspace on ${new Date().toLocaleDateString()}*\n\n`;
  
  md += `## 1. MIRO CANVAS SUMMARY\n\n`;
  md += `### 🔴 Current Process (As-Is)\n`;
  md += `${document.getElementById('miro-asis').value || '*No comments entered*'}\n\n`;
  
  md += `### ⚠️ Problems & Pain Points\n`;
  md += `${document.getElementById('miro-problems').value || '*No comments entered*'}\n\n`;
  
  md += `### 🟢 Future Process (To-Be)\n`;
  md += `${document.getElementById('miro-tobe').value || '*No comments entered*'}\n\n`;
  
  md += `### 🔵 Phase 1 Deliverable Modules\n`;
  md += `${document.getElementById('miro-phase1').value || '*No comments entered*'}\n\n`;
  
  md += `### 🟣 Future Platform Expansions\n`;
  md += `${document.getElementById('miro-futuremodules').value || '*No comments entered*'}\n\n`;
  
  md += `## 2. STRATEGIC DISCOVERY RESPONSES\n\n`;
  md += `* **Q1: Target Priority Module:**\n  ${document.getElementById('q-priority-module').value || 'Not answered'}\n\n`;
  md += `* **Q2: Core Solitary Bottleneck:**\n  ${document.getElementById('q-one-problem').value || 'Not answered'}\n\n`;
  md += `* **Q3: Owner Reports Needed:**\n  ${document.getElementById('q-owner-report').value || 'Not answered'}\n\n`;
  md += `* **Q4: WhatsApp Reporting Structure:**\n  ${document.getElementById('q-whatsapp-format').value || 'Not answered'}\n\n`;
  md += `* **Q5: Success Metrics after 90 Days:**\n  ${document.getElementById('q-success-criteria').value || 'Not answered'}\n\n`;
  md += `* **Q6: Key Strengths of RDash:**\n  ${document.getElementById('q-rdash-like').value || 'Not answered'}\n\n`;
  md += `* **Q7: Gaps in RDash (Opportunities for Us):**\n  ${document.getElementById('q-rdash-dislike').value || 'Not answered'}\n\n`;

  // Copy to clipboard
  navigator.clipboard.writeText(md).then(() => {
    alert("Meeting minutes successfully compiled and copied to clipboard! You can now paste this into a mail, doc, or WhatsApp group.");
  }).catch(err => {
    // Fallback: download as file if clipboard fails
    const blob = new Blob([md], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Meeting_Minutes_BuildOS_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

/* ==========================================================================
   MIRO INTERACTIVE FUNCTIONS
   ========================================================================== */

let currentZoom = 0.85;

// Zoom functionality
function adjustMiroZoom(delta) {
  currentZoom = Math.min(Math.max(currentZoom + delta, 0.3), 1.8);
  applyCanvasTransform();
}

function resetMiroZoom() {
  currentZoom = 0.85;
  applyCanvasTransform();
  // Center scroll
  const viewport = document.getElementById('miro-viewport-container');
  if (viewport) {
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
  }
}

function applyCanvasTransform() {
  const canvas = document.getElementById('miro-canvas-el');
  const label = document.getElementById('miro-zoom-label');
  if (canvas) {
    canvas.style.transform = `scale(${currentZoom})`;
  }
  if (label) {
    label.innerText = `${Math.round(currentZoom * 100)}%`;
  }
}

// Frame Scroll Jump
function jumpToFrame(frameId) {
  if (!frameId) return;
  const el = document.getElementById(frameId);
  const viewport = document.getElementById('miro-viewport-container');
  if (el && viewport) {
    const rect = el.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    
    // Calculate alignment relative to zoom scaling
    const scrollLeft = viewport.scrollLeft + rect.left - viewportRect.left - (viewportRect.width - rect.width) / 2;
    const scrollTop = viewport.scrollTop + rect.top - viewportRect.top - (viewportRect.height - rect.height) / 2;
    
    viewport.scrollTo({
      left: scrollLeft,
      top: scrollTop,
      behavior: 'smooth'
    });
  }
}

// Slide-out Drawer Toggle
function toggleNotesDrawer() {
  const drawer = document.getElementById('miro-notes-drawer-el');
  if (drawer) {
    drawer.classList.toggle('closed');
  }
}

// Initialize board interactions
function initMiroBoardInteractions() {
  calculateTRDI();
  runForecastCalculator();
  calculateEfficiency();
  renderKanban();
  initDragAndPan();
  renderMobileScreen();
  loadStickyNotes();
}

// Drag to Pan Canvas
function initDragAndPan() {
  const viewport = document.getElementById('miro-viewport-container');
  let isDown = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollTop;

  if (!viewport) return;

  viewport.addEventListener('mousedown', (e) => {
    // Only drag when target is the viewport grid, not inputs or buttons
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    isDown = true;
    viewport.style.cursor = 'grabbing';
    startX = e.pageX - viewport.offsetLeft;
    startY = e.pageY - viewport.offsetTop;
    scrollLeft = viewport.scrollLeft;
    scrollTop = viewport.scrollTop;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const y = e.pageY - viewport.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    viewport.scrollLeft = scrollLeft - walkX;
    viewport.scrollTop = scrollTop - walkY;
  });
}

// Frame 4: TRDI Progress Calculator
function calculateTRDI() {
  const T = parseInt(document.getElementById('calc-t').value) || 0;
  const R = parseInt(document.getElementById('calc-r').value) || 0;
  const D = parseInt(document.getElementById('calc-d').value) || 0;
  const I = parseInt(document.getElementById('calc-i').value) || 0;

  const alertBox = document.getElementById('trdi-validation-alert');
  
  // Validation Checks
  if (T < 0 || R < 0 || D < 0 || I < 0) {
    alertBox.className = "validation-result-alert alert-red";
    alertBox.innerText = "❌ Quantities cannot be negative.";
    return;
  }
  
  if (R > T || D > R || I > D) {
    alertBox.className = "validation-result-alert alert-red";
    alertBox.innerText = "❌ Validation Rule Violated! Hierarchy: Total (T) ≥ Released (R) ≥ Delivered (D) ≥ Installed (I).";
  } else {
    alertBox.className = "validation-result-alert alert-green";
    alertBox.innerText = "✅ TRDI hierarchy matches constraints (T ≥ R ≥ D ≥ I)";
  }

  // Ratios
  const ratioR = T > 0 ? (R / T) * 100 : 0;
  const ratioD = T > 0 ? (D / T) * 100 : 0;
  const ratioI = T > 0 ? (I / T) * 100 : 0;

  // Render Bar & Labels
  document.getElementById('prog-r-text').innerText = `${ratioR.toFixed(1)}%`;
  document.getElementById('prog-d-text').innerText = `${ratioD.toFixed(1)}%`;
  document.getElementById('prog-i-text').innerText = `${ratioI.toFixed(1)}%`;

  document.getElementById('prog-r-bar').style.width = `${ratioR}%`;
  document.getElementById('prog-d-bar').style.width = `${ratioD}%`;
  document.getElementById('prog-i-bar').style.width = `${ratioI}%`;

  // Gaps
  document.getElementById('gap-release').innerText = (T - R).toLocaleString();
  document.getElementById('gap-delivery').innerText = (R - D).toLocaleString();
  document.getElementById('gap-install').innerText = (D - I).toLocaleString();

  // Sync back to WBS Tree nodes or other widgets
  syncTRDIToOtherWidgets(T, R, D, I);
}

function syncTRDIToOtherWidgets(T, R, D, I) {
  // Sync to WhatsApp Preview
  const waTrdi = document.getElementById('wa-trdi-val');
  if (waTrdi) {
    waTrdi.innerText = `${T.toLocaleString()} / ${R.toLocaleString()} / ${D.toLocaleString()} / ${I.toLocaleString()}`;
  }
  
  // Sync to PM Dashboard project health summary
  const pmInfo = document.querySelector('.pm-info-panel ul');
  if (pmInfo) {
    pmInfo.innerHTML = `
      <li><strong>Design Approvals:</strong> 4 drawings pending validation.</li>
      <li><strong>Production Queue:</strong> ${(T - R).toLocaleString()} panels pending release.</li>
      <li><strong>Site Stores:</strong> ${(D - I).toLocaleString()} panels unloaded, awaiting installation.</li>
      <li><strong>Total Scope:</strong> ${T.toLocaleString()} | Installed: ${I.toLocaleString()} (${((I/T)*100).toFixed(1)}%)</li>
    `;
  }
}

// Frame 6: Drawing revision check
function simulateDrawingScan(version) {
  const alertEl = document.getElementById('drawing-scan-alert');
  if (!alertEl) return;

  if (version === 'v3') {
    alertEl.className = "drawing-alert-banner alert-green";
    alertEl.innerHTML = `
      <span class="alert-banner-title">🟢 ACTIVE DRAWING LOCKED</span>
      <p>Version V3 is verified as approved. Released for production and site cutting.</p>
    `;
  } else if (version === 'v2') {
    alertEl.className = "drawing-alert-banner alert-red";
    alertEl.innerHTML = `
      <span class="alert-banner-title">🔴 OUTDATED DRAWING WARNING</span>
      <p>You are viewing Version V2. This drawing is no longer active. Please use active version V3.</p>
    `;
  } else if (version === 'v1') {
    alertEl.className = "drawing-alert-banner alert-red";
    alertEl.innerHTML = `
      <span class="alert-banner-title">❌ REJECTED VERSION WARNING</span>
      <p>Version V1 was rejected due to BOQ measurement mismatch. Install blocked.</p>
    `;
  }
}

// Frame 7: Mobile Screen Wizard UI
let mobileStep = 1;
let mobileSelectedProject = "Paras Avenue – 129";
let mobileSelectedLocation = "Tower A ➔ Level 05";
let mobileSelectedWorkItem = "Unitized Glass Panels";
let mobileDeliveredToday = 20;
let mobileInstalledToday = 15;
let mobilePhotoUploaded = false;
let mobileBlockerReported = false;

function renderMobileScreen() {
  const title = document.getElementById('mob-screen-title');
  const body = document.getElementById('mob-screen-body-el');
  const nextBtn = document.getElementById('mob-next-btn');
  
  if (!title || !body) return;

  nextBtn.innerText = "Next ➡";
  nextBtn.onclick = nextMobileStep;

  switch (mobileStep) {
    case 1:
      title.innerText = "Screen 1/8: Select Project";
      body.innerHTML = `
        <h5>Choose Project Location</h5>
        <div class="mobile-option-list">
          <button class="mob-opt-btn selected" onclick="selectMobProj('Paras Avenue – 129')">🏢 Paras Avenue – 129</button>
          <button class="mob-opt-btn" onclick="selectMobProj('Noida IT Park')">🏢 Noida IT Park</button>
          <button class="mob-opt-btn" onclick="selectMobProj('Grand Residency')">🏢 Grand Residency</button>
        </div>
      `;
      break;
    case 2:
      title.innerText = "Screen 2/8: Select Location";
      body.innerHTML = `
        <h5>Choose WBS Coordinate</h5>
        <div class="mobile-option-list">
          <button class="mob-opt-btn selected" onclick="selectMobLoc('Tower A ➔ Level 05 ➔ Zone N2')">🧭 Tower A ➔ Level 05 ➔ Zone N2</button>
          <button class="mob-opt-btn" onclick="selectMobLoc('Tower A ➔ Level 06 ➔ Zone N1')">🧭 Tower A ➔ Level 06 ➔ Zone N1</button>
          <button class="mob-opt-btn" onclick="selectMobLoc('Podium ➔ Level 01 ➔ Zone P1')">🧭 Podium ➔ Level 01 ➔ Zone P1</button>
        </div>
      `;
      break;
    case 3:
      title.innerText = "Screen 3/8: Select Item";
      body.innerHTML = `
        <h5>Choose BOQ Work Item</h5>
        <div class="mobile-option-list">
          <button class="mob-opt-btn selected" onclick="selectMobItem('Unitized Glass Panels')">💎 Unitized Glass Panels</button>
          <button class="mob-opt-btn" onclick="selectMobItem('ACP Cladding Panels')">🧱 ACP Cladding Panels</button>
          <button class="mob-opt-btn" onclick="selectMobItem('Aluminium Louver Slats')">📐 Aluminium Louver Slats</button>
        </div>
      `;
      break;
    case 4:
      title.innerText = "Screen 4/8: Yesterday Status";
      body.innerHTML = `
        <h5>Yesterday's Aggregates</h5>
        <p>Current cumulative tallies logged till yesterday at this WBS node:</p>
        <div style="background:#f1f5f9; padding:0.5rem; border-radius:6px; margin:0.5rem 0;">
          <div class="flex-space" style="font-size:0.75rem; margin-bottom:0.25rem;">
            <span>Delivered:</span> <strong>180 panels</strong>
          </div>
          <div class="flex-space" style="font-size:0.75rem;">
            <span>Installed:</span> <strong>120 panels</strong>
          </div>
        </div>
        <p style="font-size:0.65rem; color:#64748b;">Delivered balance ready on site for installation: <strong>60 panels</strong>.</p>
      `;
      break;
    case 5:
      title.innerText = "Screen 5/8: Enter Progress";
      body.innerHTML = `
        <h5>Today's Log Entries</h5>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <div>
            <label style="font-size:0.65rem; font-weight:700;">Delivered Today (R ➔ D):</label>
            <input type="number" class="mob-text-input" id="mob-in-del" value="${mobileDeliveredToday}" oninput="mobileDeliveredToday = parseInt(this.value)||0">
          </div>
          <div>
            <label style="font-size:0.65rem; font-weight:700;">Installed Today (D ➔ I):</label>
            <input type="number" class="mob-text-input" id="mob-in-inst" value="${mobileInstalledToday}" oninput="mobileInstalledToday = parseInt(this.value)||0">
          </div>
        </div>
      `;
      break;
    case 6:
      title.innerText = "Screen 6/8: Add Proof";
      body.innerHTML = `
        <h5>Evidence & Photo Upload</h5>
        <div class="mob-img-upload-box" onclick="simulateMobPhoto()">
          ${mobilePhotoUploaded ? "✅ Photo Captured: TWA_L05_N2_facade.jpg" : "📷 Tap to Open Camera & Take Site Photo"}
        </div>
        <textarea class="mob-text-input" placeholder="Add short description here (optional)..." style="height:45px; font-size:0.65rem;"></textarea>
        <div class="flex-space" style="font-size:0.65rem; color:#2563eb; cursor:pointer;">
          <span>🎙️ Add Voice Note</span>
          <span>📍 Auto GPS Tag: Active</span>
        </div>
      `;
      break;
    case 7:
      title.innerText = "Screen 7/8: Blocker Question";
      body.innerHTML = `
        <h5>Is any issue stopping work?</h5>
        <div class="mobile-option-list">
          <button class="mob-opt-btn ${!mobileBlockerReported ? 'selected' : ''}" onclick="selectMobBlocker(false)">🟢 No Issue - All Clear</button>
          <button class="mob-opt-btn ${mobileBlockerReported ? 'selected' : ''}" onclick="selectMobBlocker(true)">⚠️ Yes - Report Site Blocker</button>
        </div>
      `;
      break;
    case 8:
      title.innerText = "Screen 8/8: Submit DPR";
      nextBtn.innerText = "SUBMIT ✔";
      nextBtn.onclick = submitMobileDPR;
      
      const balance = 60 + mobileDeliveredToday;
      const invalid = mobileInstalledToday > balance;

      body.innerHTML = `
        <h5>Verify DPR Summary</h5>
        <div style="font-size:0.68rem; background:#f8fafc; padding:0.5rem; border-radius:6px; border:1px solid #e2e8f0; display:flex; flex-direction:column; gap:0.25rem;">
          <div><strong>Project:</strong> ${mobileSelectedProject}</div>
          <div><strong>Location:</strong> ${mobileSelectedLocation}</div>
          <div><strong>Work Item:</strong> ${mobileSelectedWorkItem}</div>
          <div><strong>Today Delivered:</strong> ${mobileDeliveredToday}</div>
          <div><strong>Today Installed:</strong> ${mobileInstalledToday}</div>
          <div><strong>Photo:</strong> ${mobilePhotoUploaded ? "Uploaded" : "❌ Missing"}</div>
          <div><strong>Blocker Flag:</strong> ${mobileBlockerReported ? "Yes (Logged)" : "None"}</div>
        </div>
        
        ${invalid ? `
          <div style="color:#dc2626; font-size:0.65rem; font-weight:700; margin-top:0.25rem; text-align:center;">
            ⚠️ ERROR: Installed (${mobileInstalledToday}) exceeds available site balance (${balance})!
          </div>
        ` : ''}
      `;
      break;
  }
}

function selectMobProj(p) {
  mobileSelectedProject = p;
  renderMobileScreen();
}

function selectMobLoc(l) {
  mobileSelectedLocation = l;
  renderMobileScreen();
}

function selectMobItem(i) {
  mobileSelectedWorkItem = i;
  renderMobileScreen();
}

function selectMobBlocker(b) {
  mobileBlockerReported = b;
  renderMobileScreen();
}

function simulateMobPhoto() {
  mobilePhotoUploaded = true;
  alert("Simulated site camera: Photo captured successfully with timestamp and GPS coordinate stamps.");
  renderMobileScreen();
}

function prevMobileStep() {
  if (mobileStep > 1) {
    mobileStep--;
    renderMobileScreen();
  }
}

function nextMobileStep() {
  // Simple validation for step completion
  if (mobileStep === 6 && !mobilePhotoUploaded && mobileInstalledToday > 0) {
    alert("Site photo is mandatory to submit installation progress. Please click 'Tap to Open Camera' first.");
    return;
  }
  if (mobileStep < 8) {
    mobileStep++;
    renderMobileScreen();
  }
}

function submitMobileDPR() {
  const balance = 60 + mobileDeliveredToday;
  if (mobileInstalledToday > balance) {
    alert("DPR Submission Rejected: You cannot install more panels than the available site store balance (Yesterday's Balance + Today's Delivered).");
    return;
  }
  if (mobileInstalledToday < 0 || mobileDeliveredToday < 0) {
    alert("DPR Submission Rejected: Progress entries cannot be negative.");
    return;
  }

  // Update TRDI calculator values
  const currD = parseInt(document.getElementById('calc-d').value) || 0;
  const currI = parseInt(document.getElementById('calc-i').value) || 0;
  
  document.getElementById('calc-d').value = currD + mobileDeliveredToday;
  document.getElementById('calc-i').value = currI + mobileInstalledToday;
  
  // Recalculate
  calculateTRDI();

  // Sync to WhatsApp summary today progress values
  const waDelToday = document.getElementById('wa-del-today');
  const waInsToday = document.getElementById('wa-ins-today');
  if (waDelToday) waDelToday.innerText = mobileDeliveredToday;
  if (waInsToday) waInsToday.innerText = mobileInstalledToday;

  alert(`DPR Log Submitted Successfully!\n\nNew totals updated in WBS node:\n- New Delivered Total: ${180 + mobileDeliveredToday}\n- New Installed Total: ${120 + mobileInstalledToday}\n\nAutomated daily summary and WhatsApp queues recalculated.`);
  
  // Reset Mobile flow
  mobileStep = 1;
  mobilePhotoUploaded = false;
  renderMobileScreen();
}

// Frame 11: Manpower Labor efficiency
function calculateEfficiency() {
  const installed = parseInt(document.getElementById('eff-installed').value) || 0;
  const workers = parseInt(document.getElementById('eff-manpower').value) || 0;
  const resultEl = document.getElementById('eff-output-result');

  if (workers <= 0) {
    resultEl.innerText = "0.00 panels / worker";
    return;
  }

  const yieldVal = installed / workers;
  resultEl.innerText = `${yieldVal.toFixed(2)} panels / worker`;
}

// Frame 13: 7-Day Forecast Calculator
function runForecastCalculator() {
  const scope = parseInt(document.getElementById('fore-scope').value) || 0;
  const installed = parseInt(document.getElementById('fore-installed').value) || 0;
  const targetDays = parseInt(document.getElementById('fore-target-days').value) || 0;
  const velocity = parseInt(document.getElementById('slider-velocity').value) || 0;

  document.getElementById('val-7day-velocity').innerText = velocity;

  const remaining = scope - installed;
  document.getElementById('res-rem-qty').innerText = remaining.toLocaleString();

  let daysNeeded = 0;
  if (velocity > 0) {
    daysNeeded = Math.ceil(remaining / velocity);
    document.getElementById('res-rem-days').innerText = daysNeeded.toLocaleString();
  } else {
    document.getElementById('res-rem-days').innerText = "Infinity";
  }

  const targetDailyRate = targetDays > 0 ? (remaining / targetDays) : 0;
  document.getElementById('res-daily-target').innerText = targetDailyRate.toFixed(1);

  const deficit = velocity - targetDailyRate;
  const gapEl = document.getElementById('res-fore-gap');
  gapEl.innerText = deficit.toFixed(1);
  if (deficit < 0) {
    gapEl.className = "val text-red";
  } else {
    gapEl.className = "val text-green";
  }

  // Update Status Banner & Alert color
  const banner = document.getElementById('forecast-status-pill');
  if (banner) {
    if (velocity === 0) {
      banner.className = "forecast-status-banner bg-red";
      banner.innerHTML = "<strong>NO VELOCITY: Blocker causing total execution stoppage! Forecast frozen</strong>";
      updateWhatsAppForecast(velocity, targetDailyRate, "Blocked", "NO VELOCITY");
    } else if (daysNeeded <= targetDays) {
      banner.className = "forecast-status-banner bg-green";
      banner.innerHTML = `<strong>ON TRACK: Project forecast completion is on schedule (${targetDays - daysNeeded} days buffer)</strong>`;
      updateWhatsAppForecast(velocity, targetDailyRate, "ON TRACK", `${targetDays - daysNeeded} days ahead`);
    } else {
      const delay = daysNeeded - targetDays;
      banner.className = "forecast-status-banner bg-red";
      banner.innerHTML = `<strong>OFF TRACK FORECAST DELAY: Project is running ${delay} days behind schedule</strong>`;
      updateWhatsAppForecast(velocity, targetDailyRate, "OFF TRACK", `${delay} days behind`);
    }
  }
}

function updateWhatsAppForecast(velocity, targetDailyRate, status, delayText) {
  // Sync to WhatsApp preview widget
  const wa7day = document.getElementById('wa-7day-vel');
  const waTarget = document.getElementById('wa-target-rate');
  const waDelay = document.getElementById('wa-delay-val');
  const waStatus = document.getElementById('wa-status-text');

  if (wa7day) wa7day.innerText = velocity;
  if (waTarget) waTarget.innerText = targetDailyRate.toFixed(1);
  if (waDelay) waDelay.innerText = delayText;
  
  if (waStatus) {
    waStatus.innerText = status;
    if (status === 'ON TRACK') {
      waStatus.className = "text-green";
    } else if (status === 'Blocked') {
      waStatus.className = "text-red";
    } else {
      waStatus.className = "text-red";
    }
  }
}

// Frame 10: Operational Kanban task board
let kanbanTasks = [
  { id: 1, title: "Order Replacement Winches", owner: "Purchase Team", priority: "P1", due: "17 Jul", project: "Paras Avenue", status: "todo" },
  { id: 2, title: "Recheck Bracket Measurement", owner: "Site Engineer", priority: "P1", due: "Today", project: "Paras Avenue", status: "progress" },
  { id: 3, title: "Upload Shop Drawing V3", owner: "Designer", priority: "P2", due: "18 Jul", project: "Paras Avenue", status: "done" },
  { id: 4, title: "Arrange 8 Additional Workers", owner: "Contractor", priority: "P2", due: "19 Jul", project: "Paras Avenue", status: "reviewed" }
];

function renderKanban() {
  const todoCol = document.getElementById('cards-todo');
  const progressCol = document.getElementById('cards-progress');
  const doneCol = document.getElementById('cards-done');
  const reviewedCol = document.getElementById('cards-reviewed');

  if (!todoCol || !progressCol || !doneCol || !reviewedCol) return;

  todoCol.innerHTML = '';
  progressCol.innerHTML = '';
  doneCol.innerHTML = '';
  reviewedCol.innerHTML = '';

  kanbanTasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `kanban-card`;
    card.innerHTML = `
      <span class="kcard-title">${task.title}</span>
      <div class="kcard-meta">
        <span>Owner: <strong>${task.owner}</strong></span>
        <span>Priority: <strong style="color:${task.priority === 'P1' ? '#dc2626' : '#d97706'}">${task.priority}</strong> | Due: ${task.due}</span>
        <span style="font-size:0.5rem; color:#94a3b8; text-transform:uppercase;">${task.project}</span>
      </div>
      <div class="kcard-actions">
        <button class="kcard-btn" onclick="moveKanbanTask(${task.id})">Move ➔</button>
      </div>
    `;

    if (task.status === 'todo') todoCol.appendChild(card);
    else if (task.status === 'progress') progressCol.appendChild(card);
    else if (task.status === 'done') doneCol.appendChild(card);
    else if (task.status === 'reviewed') reviewedCol.appendChild(card);
  });
}

function moveKanbanTask(id) {
  const task = kanbanTasks.find(t => t.id === id);
  if (task) {
    if (task.status === 'todo') task.status = 'progress';
    else if (task.status === 'progress') task.status = 'done';
    else if (task.status === 'done') task.status = 'reviewed';
    else task.status = 'todo';
    renderKanban();
  }
}

/* Presentation Mode Toggle */
function togglePresentationMode() {
  const body = document.body;
  body.classList.toggle('presentation-mode');
  
  // When toggling, reset zoom so it spans the board cleanly
  resetMiroZoom();
  
  if (body.classList.contains('presentation-mode')) {
    alert("Fullscreen Presentation Mode Active.\n\nAll headers and navigation are hidden to maximize presentation workspace. Click 'Exit Presentation Mode' in the top-right to return.");
  }
}

/* Draggable Canvas Sticky Notes */
function makeElementDraggable(el) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = el.querySelector('.sticky-note-header');
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // Don't drag if clicking colors or delete button
    if (e.target.className === 'sticky-delete' || e.target.classList.contains('color-dot')) {
      return;
    }
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Factor in zoom scale so cursor speed matches movement speed
    pos1 = (pos3 - e.clientX) / currentZoom;
    pos2 = (pos4 - e.clientY) / currentZoom;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    saveStickyNotes();
  }
}

function createStickyElement(id, left, top, color, text) {
  const div = document.createElement('div');
  div.className = 'miro-sticky-note';
  div.style.left = left;
  div.style.top = top;
  div.style.backgroundColor = color;
  div.setAttribute('data-id', id);
  
  div.innerHTML = `
    <div class="sticky-note-header">
      <div class="sticky-color-dots">
        <span class="color-dot yellow" onclick="changeStickyColor('${id}', '#fef08a')"></span>
        <span class="color-dot green" onclick="changeStickyColor('${id}', '#bbf7d0')"></span>
        <span class="color-dot cyan" onclick="changeStickyColor('${id}', '#cffafe')"></span>
        <span class="color-dot pink" onclick="changeStickyColor('${id}', '#fbcfe8')"></span>
      </div>
      <span class="sticky-delete" onclick="deleteStickyNote('${id}')">✖</span>
    </div>
    <textarea class="sticky-note-text" placeholder="Double-click to write note..." onkeyup="saveStickyNotes()">${text}</textarea>
  `;
  return div;
}

function addNewStickyNote() {
  const canvas = document.getElementById('miro-canvas-el');
  const viewport = document.getElementById('miro-viewport-container');
  if (!canvas || !viewport) return;
  
  const id = Date.now().toString();
  // Spawn in the center of the current screen scroll coordinate
  const left = (viewport.scrollLeft + viewport.offsetWidth / 2 - 80) / currentZoom;
  const top = (viewport.scrollTop + viewport.offsetHeight / 2 - 80) / currentZoom;
  
  const div = createStickyElement(id, `${left}px`, `${top}px`, '#fef08a', '');
  canvas.appendChild(div);
  makeElementDraggable(div);
  saveStickyNotes();
  
  div.querySelector('.sticky-note-text').focus();
}

function changeStickyColor(id, color) {
  const el = document.querySelector(`.miro-sticky-note[data-id="${id}"]`);
  if (el) {
    el.style.backgroundColor = color;
    saveStickyNotes();
  }
}

function deleteStickyNote(id) {
  const el = document.querySelector(`.miro-sticky-note[data-id="${id}"]`);
  if (el) {
    el.remove();
    saveStickyNotes();
  }
}

function saveStickyNotes() {
  const notes = [];
  document.querySelectorAll('.miro-sticky-note').forEach(el => {
    notes.push({
      id: el.getAttribute('data-id'),
      left: el.style.left,
      top: el.style.top,
      color: el.style.backgroundColor || '#fef08a',
      text: el.querySelector('.sticky-note-text').value
    });
  });
  localStorage.setItem('miro_sticky_notes', JSON.stringify(notes));
}

function loadStickyNotes() {
  const data = localStorage.getItem('miro_sticky_notes');
  if (data) {
    try {
      const notes = JSON.parse(data);
      const canvas = document.getElementById('miro-canvas-el');
      if (!canvas) return;
      
      // Clear existing to avoid duplicates
      document.querySelectorAll('.miro-sticky-note').forEach(el => el.remove());
      
      notes.forEach(note => {
        const div = createStickyElement(note.id, note.left, note.top, note.color, note.text);
        canvas.appendChild(div);
        makeElementDraggable(div);
      });
    } catch (e) {
      console.error("Error loading sticky notes:", e);
    }
  }
}

/* Interactive Client Pitch Mode Toggle */
let clientPitchModeActive = true;

function toggleClientPitchMode() {
  clientPitchModeActive = !clientPitchModeActive;
  const badge = document.getElementById('client-pitch-toggle');
  
  // Find other tab buttons
  const tabComparison = document.querySelector('.tab-btn[onclick*="tab-comparison"]');
  const tabFlowchart = document.querySelector('.tab-btn[onclick*="tab-flowchart"]');
  const tabRoles = document.querySelector('.tab-btn[onclick*="tab-roles"]');
  
  if (clientPitchModeActive) {
    // Hide other tabs
    if (tabComparison) tabComparison.style.display = 'none';
    if (tabFlowchart) tabFlowchart.style.display = 'none';
    if (tabRoles) tabRoles.style.display = 'none';
    
    // Switch to Miro tab
    switchTab('tab-miro-board');
    
    if (badge) {
      badge.innerHTML = '🟢 Client Pitch Mode: ON';
      badge.className = 'badge tobe';
    }
  } else {
    // Show all tabs
    if (tabComparison) tabComparison.style.display = '';
    if (tabFlowchart) tabFlowchart.style.display = '';
    if (tabRoles) tabRoles.style.display = '';
    
    if (badge) {
      badge.innerHTML = '⚫ Client Pitch Mode: OFF';
      badge.className = 'badge asis';
    }
  }
  
  // Save status
  localStorage.setItem('client_pitch_mode', clientPitchModeActive ? 'true' : 'false');
}

function loadClientPitchMode() {
  const stored = localStorage.getItem('client_pitch_mode');
  clientPitchModeActive = (stored !== 'false'); 
  
  const badge = document.getElementById('client-pitch-toggle');
  const tabComparison = document.querySelector('.tab-btn[onclick*="tab-comparison"]');
  const tabFlowchart = document.querySelector('.tab-btn[onclick*="tab-flowchart"]');
  const tabRoles = document.querySelector('.tab-btn[onclick*="tab-roles"]');
  
  if (clientPitchModeActive) {
    if (tabComparison) tabComparison.style.display = 'none';
    if (tabFlowchart) tabFlowchart.style.display = 'none';
    if (tabRoles) tabRoles.style.display = 'none';
    switchTab('tab-miro-board');
    if (badge) {
      badge.innerHTML = '🟢 Client Pitch Mode: ON';
      badge.className = 'badge tobe';
    }
  } else {
    if (tabComparison) tabComparison.style.display = '';
    if (tabFlowchart) tabFlowchart.style.display = '';
    if (tabRoles) tabRoles.style.display = '';
    if (badge) {
      badge.innerHTML = '⚫ Client Pitch Mode: OFF';
      badge.className = 'badge asis';
    }
  }
}

// Phase Roadmap Tab Switcher (Frame 20)
function switchPhaseTab(phaseId) {
  // Hide all phase panels
  const panels = ['ph1', 'ph2', 'ph3', 'ph4'];
  panels.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Remove active from all tab buttons
  const tabs = document.querySelectorAll('.phase-tab-btn');
  tabs.forEach(btn => btn.classList.remove('active'));

  // Show selected panel
  const target = document.getElementById(phaseId);
  if (target) target.style.display = 'block';

  // Set active tab button
  const activeBtn = document.getElementById('ptab-' + phaseId);
  if (activeBtn) activeBtn.classList.add('active');
}
