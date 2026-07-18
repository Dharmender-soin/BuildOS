# BuildOS — Product Requirements & Technical Specifications
### Client: Axsys Solutions (Art N Glass Group)
### Document Version: 1.2 | Date: July 18, 2026

---

## 1. PROJECT OVERVIEW

### 1.1 Objective
BuildOS is a unified digital operating platform designed specifically for **Axsys Solutions** (Art N Glass Group). The system replaces multiple scattered Excel sheets and manual WhatsApp updates with a single source of truth linking site operations, design approvals, material deliveries, and resource allocations in real-time.

### 1.2 Core Business Model (Axsys)
Axsys designs, manufactures, and installs high-end aluminium facades (unitized glazing, spider canopies, ACP cladding). Their operations follow a linear progress pipeline:
```
[Step 1] Consultant Civil Drawing (BOQ Qty)
       ↓
[Step 2] Client Company Drawing Review + Axsys Internal Estimate (Anuman)
       ↓
[Step 3] On-Site Actual Survey (Elevation-wise Measurement + Hand-drawn Sketch)
       ↓
[Step 4] Axsys Designer → Shop Drawing (CAD / GFC Drawing)
       ↓
[Step 4A] ⭐ Shop Drawing sent to CLIENT'S CONSULTANT for Approval
          → APPROVED (GFC Stamp) → Proceed to Production
          → REJECTED → Revision required → Loop back to Step 4
       ↓
[Step 5] Design Release / BOM → Work Order to Factory
       ↓
[Step 6] Factory Production + External Purchase (Indent)
       ↓
[Step 7] Dispatch Document → Site Delivery (Received)
       ↓
[Step 8] Installation (GPS + Photo)
       ↓
[Step 9] Snag Resolution → Handover Sign-off
```

### 1.3 Why 4 Quantities Exist per Project
Every project has **4 different quantity references** which must all be tracked to resolve disputes:

| Quantity | Source | Who Provides |
|---|---|---|
| **Q1 — Consultant BOQ Qty** | Civil architect/consultant drawing | Client or Consultant |
| **Q2 — Client Drawing Estimate** | Axsys PM reads client company's architectural drawing | Axsys PM |
| **Q3 — Internal Estimate (Anuman)** | Axsys's own calculated estimate for tendering | Axsys Design/Estimation |
| **Q4 — On-site Survey Actual** | Physical measurement done at site | Axsys Site Engineer |

---

## 2. EXCEL TO MODULE MAPPING (Current vs Future)

BuildOS directly translates Axsys's current manual spreadsheets into automated, real-time database modules:

| Current Spreadsheet / File | Operational Area | BuildOS Module | Phase |
|---|---|---|---|
| **MILESTONE (Master list)** | Portfolio Status & T/R/D/I | **Command Centre Dashboard** (Live health cards, TRDI progress) | **Phase 1** |
| **M3M / Vegas / Sky Xotic tabs** | Design Tracking & BOM | **Survey-to-Release Board** (Sketch upload & work order conversion) | **Phase 1** |
| **AJAY ji Sheet & Task Lists** | Site Blocker & Tasks | **Kanban SLA Task Board** (Monday.com style project/owner task board) | **Phase 1** |
| **Deepak Workbook** | Contractor Deployments | **Contractor Allocation Board** (Required vs Actual workers) | **Phase 2** |
| **PROJECT FITTER NEW / fitter sheet** | Fitter Daily Status | **Fitter Attendance App** (E-Code check-ins with check-in stats) | **Phase 3** |
| **HANDOVER Sheet** | Project Handover Checklist | **Closure Handover Board** (Assigned snag/sign-off checklists) | **Phase 2** |
| **ZONE Sheet** | Zone-wise PM Hierarchy | **Zone Control View** (Card grid showing ZPM project mapping) | **Phase 2** |

---

## 3. PRODUCT ROADMAP (Phase-wise Modules)

---

### 🟢 PHASE 1: Core MVP (Month 1 / target 15 August)
**Goal:** Deliver the survey-to-release lifecycle, billing dispatch tracker, mobile DPR app, and a Kanban task board to solve immediate operational delays.

#### Module 1: BOQ & Survey Input
* **Function:** Upload client BOQ Excel, parse items, and enable site survey inputs.
* **Details:** PM/Surveyor enters surveyed quantities (e.g. surveyed 200 sqm out of 1000 sqm item) and uploads hand-drawn/manual survey sketch photos. Tracks total BOQ qty vs surveyed qty.

#### Module 2: Design Release Board (Design/Release Team)
* **Function:** Axsys designer creates shop drawings from surveyed data, submits to client's consultant for approval (GFC stamp), and then generates the BOM/Work Order for factory production.
* **Details:**
  - Designer uploads shop drawing (CAD/PDF) after survey
  - System tracks submission to consultant (date + who sent)
  - Consultant status: `PENDING_APPROVAL` → `APPROVED (GFC)` → `REJECTED (Revision)`
  - If rejected → revision round tracked (Rev-1, Rev-2, etc.)
  - Only after GFC stamp → Work Order/BOM generated for factory
  - Pending surveys NOT yet converted to approved drawings are shown as a risk list
  - 24-hour SLA alert: if drawing is not submitted to consultant within 24hrs of survey

#### Module 3: MILESTONE Command Centre & Dispatch Clerk Import
* **Function:** Unified dashboard displaying all 50+ projects as status cards.
* **Details:** Billing clerk uploads daily bill/invoice details from ERP to log plant dispatch quantities ($D$). Cards show live project health (`ON TRACK`, `AT RISK`, `HOLD`) and live TRDI progress bars.

#### Module 4: Mobile DPR Application (Flutter / Web)
* **Function:** App for site supervisors to log daily progress.
* **Details:** Enter **Received Today** (checks against factory dispatches to track transit losses) and **Installed Today** quantities per BOQ item. Mandatory site photo and GPS coordinates stamp. Supports **partial deliveries** (remaining balance remains pending).

#### Module 5: SLA Kanban Task & Issue Board
* **Function:** A drag-and-drop Kanban task board (similar to Monday.com or Google Tasks) to track site blockers and dependencies.
* **Details:** Tasks are mapped to a project and assigned to a responsible owner. Auto-flags tasks delayed beyond 48 hours.

---

### 🔵 PHASE 2: Operations & Resource Management (Month 2-3)
**Goal:** Digitalize contractor worker sheets, staff allocations, and zone project mappings.

#### Module 6: Resource OS (Staff Allocation)
* **Function:** Org hierarchy setup: DGM ➔ ZPM ➔ PM ➔ Supervisor ➔ Site Engineer.
* **Details:** Assign personnel to active projects. Raises alerts if any project has no PM or lead designer assigned.

#### Module 7: Contractor Allocation Board (Deepak Workbook)
* **Function:** Digitizes the manual Deepak Workbook matrix.
* **Details:** Contractor-wise headcounts. Compares required manpower against actual site present counts. Calculates labor yield (panels installed ÷ workers present).

#### Module 8: Project Handover Checklist
* **Function:** Standardized checklist per project (Test & Trace, Paper Signatures, Compliance, final measurements).
* **Details:** Assigns items to owners with deadline alerts.

#### Module 9: Zone Control View
* **Function:** Grid cards for Delhi, Gurgaon, Noida showing ZPM workloads and highlighting delayed projects at the top of each zone.

---

### 🟣 PHASE 3: Automation & Intelligence (Month 4-5)
**Goal:** Automate WhatsApp reports, track daily fitter check-ins, and calculate rolling completion dates.

#### Module 10: Fitter Attendance Mobile App
* **Function:** Daily fitter check-ins via mobile (E-Code check-ins).
* **Details:** Fitter marks status: Present / Leave / Transit / Today Leave. Auto-updates the daily fitter sheet.

#### Module 11: 6:30 PM WhatsApp Auto-Report Engine
* **Function:** Collects all DPR submissions of the day and compiles a formatted summary report.
* **Details:** Auto-posts to management WhatsApp groups at 6:30 PM (via Whatshub.live API). Eliminates 2 hours of manual compilation daily.

#### Module 12: 7-Day Velocity Completion Forecast
* **Function:** Estimates project completion dates based on the last 7 days of site installation speed.
* **Details:** Displays completion gap status (e.g., "Project is running 18 days behind schedule") and lists remediation tasks.

---

### 🟡 PHASE 4: Platform Scale & BIM (Month 6+)
**Goal:** Premium features to differentiate Axsys in the market and expand the platform to group companies.

#### Module 13: Multi-Tenant Tenant Expansion
* **Function:** Onboard sister companies (**Art-N-Glass** and **Green Fenestration**).
* **Details:** Separate company environments on the same platform. Group-level dashboard for group directors.

#### Module 14: Client Progress Portal
* **Function:** Read-only access portals for M3M, Smart World, and Paras Avenue.
* **Details:** Clients see live progress, reducing follow-up calls to directors.

#### Module 15: AI site Photo Audit
* **Function:** Automatically validates site photos uploaded by site engineers using Google Gemini Vision API to prevent repeated or fake progress logs.

#### Module 16: BIM / 3D Digital Twin
* **Function:** Interactive 3D building render (Three.js).
* **Details:** As panels are logged as installed in mobile DPRs, the corresponding panels in the 3D model turn green.

---

## 4. DATABASE SCHEMA (Core tables)

```sql
-- MULTI-TENANT CONFIG
tenants (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER ACCOUNTS
users (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT CHECK (role IN ('DIRECTOR','DGM','ZPM','PM','DESIGNER','SITE_ENGINEER','STORE','BILLING_CLERK')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECTS
projects (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  name TEXT NOT NULL,
  client_name TEXT,
  location TEXT,
  city TEXT,
  pm_id UUID REFERENCES users(id),
  designer_id UUID REFERENCES users(id),
  start_date DATE,
  end_date DATE,
  civil_ready_date DATE,              -- Coordinating Civil construction stage
  mep_coordination_date DATE,          -- Coordinating MEP construction stage
  facade_start_date DATE,             -- Coordinating Facade construction stage
  payment_terms TEXT,
  status TEXT CHECK (status IN ('ON_TRACK','OFF_TRACK','AT_RISK','HOLD','COMPLETED')) DEFAULT 'ON_TRACK',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONSULTANT & CLIENT DRAWINGS (Pre-Survey Reference Documents)
consultant_drawings (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  drawing_type TEXT CHECK (drawing_type IN ('CONSULTANT_CIVIL', 'CLIENT_ARCHITECTURAL')) NOT NULL,
  revision_no TEXT,                   -- e.g. "Rev-0", "Rev-2"
  drawing_file_url TEXT,             -- Uploaded PDF
  issued_by TEXT,                    -- Consultant/Architect name
  gfc_approved BOOLEAN DEFAULT false, -- Good For Construction stamped?
  issued_date DATE,
  received_date DATE,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT ELEVATIONS (Elevation-wise breakdown: Front/Back/Left/Right or A/B/C/D)
elevations (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  elevation_code TEXT NOT NULL,       -- e.g. "A", "Front", "North"
  description TEXT,
  estimated_area NUMERIC,             -- sqm from drawing
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOQ ITEMS
boq_items (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  item_no TEXT NOT NULL,              -- e.g., "A.1" or "WT-01"
  description TEXT NOT NULL,
  unit TEXT NOT NULL,                 -- e.g., "SQM", "NOS", "RMT", "MT"
  total_qty_boq NUMERIC NOT NULL,     -- Q1: Consultant BOQ qty
  client_drawing_qty NUMERIC,         -- Q2: Qty read from client's own architectural drawing
  internal_estimate_qty NUMERIC,      -- Q3: Axsys internal estimate/anuman (for tendering)
  item_category TEXT CHECK (item_category IN ('MAIN_FACADE', 'ACCESSORY_SCREW_BRACKET')) DEFAULT 'MAIN_FACADE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SURVEY TRACKING (Q4: On-site actual measurement)
surveys (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  boq_item_id UUID REFERENCES boq_items(id),
  elevation_id UUID REFERENCES elevations(id), -- Which elevation was surveyed
  surveyor_id UUID REFERENCES users(id),
  survey_qty NUMERIC NOT NULL,        -- Q4: Actual measured qty on site
  sketch_url TEXT,                    -- Hand-drawn/manual survey sketch photo
  status TEXT CHECK (status IN ('PENDING_DRAWING', 'DRAWING_SUBMITTED', 'CONSULTANT_APPROVED', 'CONSULTANT_REJECTED', 'RELEASED_TO_PRODUCTION')) DEFAULT 'PENDING_DRAWING',
  release_deadline TIMESTAMPTZ,       -- auto = created_at + 24 hours (SLA enforcement)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ⭐ CONSULTANT DRAWING APPROVALS (Step 4A — GFC Approval Loop)
-- After survey, Axsys designer makes shop drawing and sends to client's consultant for GFC stamp
shop_drawing_approvals (
  id UUID PRIMARY KEY,
  survey_id UUID REFERENCES surveys(id),
  project_id UUID REFERENCES projects(id),
  elevation_id UUID REFERENCES elevations(id),
  drawing_file_url TEXT NOT NULL,     -- Axsys shop drawing PDF uploaded
  revision_no TEXT DEFAULT 'Rev-0',   -- Tracks revision rounds (Rev-0, Rev-1, Rev-2...)
  submitted_by UUID REFERENCES users(id),  -- Axsys designer who submitted
  submitted_date DATE,
  consultant_name TEXT,               -- Name of client's consultant/architect
  approval_status TEXT CHECK (approval_status IN ('PENDING_APPROVAL', 'APPROVED_GFC', 'REJECTED_REVISION')) DEFAULT 'PENDING_APPROVAL',
  approval_date DATE,                 -- Date consultant gave GFC stamp
  rejection_remarks TEXT,             -- If rejected, consultant's comments for revision
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DESIGN RELEASES (Only created AFTER shop_drawing_approvals.approval_status = 'APPROVED_GFC')
production_releases (
  id UUID PRIMARY KEY,
  survey_id UUID REFERENCES surveys(id),
  release_no TEXT NOT NULL,           -- e.g., "WO-05"
  bom_excel_url TEXT,                 -- Uploaded BOM/Cutlist spreadsheet
  release_qty NUMERIC NOT NULL,
  designer_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FACTORY DISPATCH LOGS (Billing Clerk Entries)
dispatches (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  boq_item_id UUID REFERENCES boq_items(id),
  clerk_id UUID REFERENCES users(id),
  bill_no TEXT NOT NULL,
  dispatch_qty NUMERIC NOT NULL,
  recorded_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DAILY DPR RECORDS
dpr_entries (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  boq_item_id UUID REFERENCES boq_items(id),
  engineer_id UUID REFERENCES users(id),
  entry_date DATE NOT NULL,
  received_today NUMERIC DEFAULT 0,    -- Delivered to site today
  installed_today NUMERIC DEFAULT 0,
  transit_loss_qty NUMERIC DEFAULT 0,  -- Dispatched vs Received discrepancy calculation
  snag_logs_count INT DEFAULT 0,      -- Tracks technical errors/snags during install
  site_photo_url TEXT,
  gps_lat NUMERIC,
  gps_lng NUMERIC,
  has_blocker BOOLEAN DEFAULT false,
  blocker_desc TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SLA KANBAN TASK / ISSUE BOARD
issues (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES users(id),
  priority TEXT CHECK (priority IN ('P1', 'P2', 'P3')),
  status TEXT CHECK (status IN ('todo', 'progress', 'done', 'reviewed')) DEFAULT 'todo',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT MASTER TRDI METRICS
trdi_snapshots (
  id UUID PRIMARY KEY,
  boq_item_id UUID REFERENCES boq_items(id),
  total_qty NUMERIC NOT NULL,
  released_qty NUMERIC DEFAULT 0,
  delivered_qty NUMERIC DEFAULT 0,
  installed_qty NUMERIC DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. VALIDATION RULES (System Constraints)

### 5.0 The 4-Quantity Comparison Rule (Dispute Prevention)
Every BOQ item tracks **4 different quantity sources** to provide evidence in client disputes:

| Field | Source | Purpose |
|---|---|---|
| `total_qty_boq` | Consultant's Civil Drawing | Original contracted scope |
| `client_drawing_qty` | Client company's architectural drawing (read by Axsys PM) | Cross-reference check |
| `internal_estimate_qty` | Axsys internal estimate (Anuman) | Tendering baseline |
| `survey_qty` | On-site physical measurement | Actual work reality |

**Dashboard Warning Rules:**
- If `survey_qty` > `total_qty_boq` by more than **5%** → Flag as **"Scope Increase - Client Approval Needed"**
- If `survey_qty` < `internal_estimate_qty` by more than **10%** → Flag as **"Under-scope Risk"**
- The system stores all 4 values permanently — they cannot be edited after submission (audit trail).

### 5.1 The TRDI Quantity Rule
To prevent data entry errors, the system enforces the following hierarchy at all times:
$$\text{Total Scope (T)} \ge \text{Released (R)} \ge \text{Delivered (D)} \ge \text{Installed (I)}$$
- Site engineers cannot submit an installation count ($I$) that exceeds the available delivered stock ($D - I$).
- Delivered count ($D$) cannot exceed the released count ($R$).
- Released count ($R$) cannot exceed the surveyed count ($S$).
- Surveyed count ($S$) cannot exceed the BOQ scope ($T$).

### 5.2 Mobile DPR Constraints
- GPS coordinates stamp must match the project site location within a 2.5km radius.
- Site photo upload is mandatory to save any installation numbers.
- No negative progress quantities are accepted.

### 5.3 24-Hour Design Release SLA Alert
- Once a survey entry (sketch + quantity) is logged, the system automatically sets a `release_deadline` of `created_at + 24 hours`.
- If the Design/Release team does not upload the corresponding production work order/BOM sheet and update the status to `RELEASED_TO_PRODUCTION` within this 24-hour window:
  - The project card displays a red **SLA Alert** badge on the dashboard.
  - A WhatsApp notification is triggered to the Designer and PM alerting them of the delay.

### 5.4 Accessory & Transit Loss Reconciliation
- **Accessory Tracking:** Items marked under `ACCESSORY_SCREW_BRACKET` are tracked by unit package count (e.g. Box, Bags) instead of individual units to simplify site logs for supervisors.
- **Transit Loss Detection:** If `received_today` (site engineer entry) is less than `dispatch_qty` (billing clerk entry) for a specific dispatch bill, the discrepancy is logged as `transit_loss_qty` and flagged on the PM dashboard.
- **QC Snag Log:** Sites can log installation technical errors (snags). A BOQ item with active/unresolved snags is blocked from being marked as 100% completed.

---

## 6. SYSTEM INTEGRATIONS

### 6.1 WhatsApp Gateway (Whatshub.live)
- **Role:** Handles notification delivery.
- **Trigger 1 (Real-Time):** Critical site blocker reported (escalates to PM/DGM after 48 hours).
- **Trigger 2 (Scheduled):** at 6:30 PM, auto-compiles daily site logs and posts a summary report directly into the Axsys Project Group chat.

---

## 7. KEY DISCUSSION QUESTIONS

1. **BOQ Formats:** M3M, Paras Avenue, aur ACE 153 ke BOQ formats alag hain. Hum column mapping tool bana rahe hain — kya unke paas koi standard template hai jise hum verify kar sakein?
2. **Offline Mode:** Site locations pe standard internet connections hote hain ya completely raw offline/dead-zone areas hain?
3. **Approval Loop:** Drawing version updates kaun approve karta hai? (Designer ➔ PM ➔ Client Architect?)
4. **Drawing QR Scans:** Site team print out drawing sheets check karti hai ya mobile screen se directly verification prefer karegi?
5. **Contractor Data:** Deepak ji ke workbook mein sub-contractors data directly log hona chahiye ya only supervisor check cards update karein?
6. **Mobile UI Language:** Site supervisors/engineers Hindi UI layout pasand karenge ya standard English?
7. **WhatsApp Groups:** WhatsApp summary posts ke liye kaun-kaun se groups match karne hain (separate groups for Director, PM, and site team)?
8. **Client Portal:** Phase 4 client portal ke portal logins hum client directors ke reference clients ko direct distribute kar sakte hain?

---

## 8. TECH STACK SUMMARY

* **Web Front-end:** Next.js 14 (App Router)
* **Web Hosting:** Vercel
* **Mobile Engine:** Flutter (Android first)
* **Database & Auth:** Supabase (PostgreSQL with Email/OTP authentication)
* **Storage:** Supabase Storage
* **Integrations:** Whatshub.live API

---

## 9. SPRINT CHECKLIST FOR DEVELOPERS (Phase 1)

```markdown
- [ ] Setup Supabase DB & Auth configuration (tenants, users, projects, boq_items, surveys, production_releases, dispatches, issues, dpr_entries)
- [ ] Next.js 14 template deployment on Vercel
- [ ] Create BOQ Importer with custom column mapper interface and Survey input form
- [ ] Build MILESTONE Command Centre dashboard with status cards and Dispatch clerk billing uploader
- [ ] Create Design Stage approvals board with file version lock (V1/V2/V3) and survey-to-release conversion tracker
- [ ] Build SLA Kanban Task/Issue board per project for tracking site blockers
- [ ] Build Flutter Mobile login with OTP SMS authentication
- [ ] Setup mobile DPR entry screen with GPS coordinates stamp and camera photo uploads (tracks Received vs Installed)
```

---

## 10. DEVELOPER BRIEF

> Build a multi-tenant web + mobile platform (Next.js + Supabase + Flutter) for Axsys Solutions — a facade company with 50+ active projects. Replace their manual Excel spreadsheets and WhatsApp log entries with a unified cloud command dashboard, a design stage tracker, a mobile site supervisor DPR tool, and a Monday.com style Kanban task board. Row-level tenant configurations (`tenant_id`) must be integrated from Day 1 to allow multi-tenant scale to Art-N-Glass and Green Fenestration later.
