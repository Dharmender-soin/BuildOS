# BuildOS — Product Requirements & Technical Specifications
### Client: Axsys Solutions (Art N Glass Group)
### Document Version: 1.1 | Date: July 18, 2026

---

## 1. PROJECT OVERVIEW

### 1.1 Objective
BuildOS is a unified digital operating platform designed specifically for **Axsys Solutions** (Art N Glass Group). The system replaces multiple scattered Excel sheets and manual WhatsApp updates with a single source of truth linking site operations, design approvals, material deliveries, and resource allocations in real-time.

### 1.2 Core Business Model (Axsys)
Axsys designs, manufactures, and installs high-end aluminium facades (unitized glazing, spider canopies, ACP cladding). Their operations follow a linear progress pipeline:
```
BOQ Upload ➔ WBS Division ➔ Design Stages ➔ Factory Release (BOM) ➔ Dispatch & Delivery ➔ Installation ➔ Handover
```

---

## 2. EXCEL TO MODULE MAPPING (Current vs Future)

BuildOS directly translates Axsys's current manual spreadsheets into automated, real-time database modules:

| Current Spreadsheet | Operational Area | BuildOS Module |
|---|---|---|
| **MILESTONE (Master list)** | Portfolio Status & T/R/D/I | **Command Centre Dashboard** (Live health cards, TRDI progress) |
| **M3M / Vegas / Sky Xotic tabs** | Drawing Stage Tracking | **Design Stage Board** (7-stage approvals, drawing lock) |
| **AJAY ji Sheet** | Site Blocker/Issue Logger | **Escalation Issue Tracker** (48hr auto-escalation via WhatsApp) |
| **Deepak Workbook** | Contractor Deployments | **Contractor Allocation Board** (Required vs Actual workers) |
| **PROJECT FITTER NEW / fitter sheet** | Fitter Daily Status | **Fitter Attendance App** (E-Code check-ins with check-in stats) |
| **HANDOVER Sheet** | Project Handover Checklist | **Closure Handover Board** (Assigned snag/sign-off checklists) |
| **ZONE Sheet** | Zone-wise PM Hierarchy | **Zone Control View** (Card grid showing ZPM project mapping) |

---

## 3. PRODUCT ROADMAP (Phase-wise Modules)

---

### 🟢 PHASE 1: Core Execution Engine (Month 1)
**Goal:** Deliver the foundation tracking system, replacing design spreadsheets and manual WhatsApp logs.

#### Module 1: Project Setup & BOQ Parser
* **Function:** Upload any client BOQ Excel, map columns, and parse items into structured line items.
* **Details:** Creates database records for projects and items (A.1, WT-01, etc.) with totals, units, and tags.

#### Module 2: MILESTONE Command Centre
* **Function:** One dashboard displaying all 50+ projects as status cards.
* **Details:** Live badges: `ON TRACK` (green), `OFF TRACK` (red), `AT RISK` (yellow), `HOLD` (grey). Shows PM, Designer, and live TRDI progress bars.

#### Module 3: Design Stage Tracker
* **Function:** Tracks 7 design stages per BOQ item: Concept ➔ Structure ➔ Shop ➔ Colour ➔ MS ➔ Glass ➔ BOM.
* **Details:** Simple approval flow (Designer submits ➔ PM/Client reviews ➔ Approves). Active version lock (e.g., only V3 is active; site engineers get alerts if scanning V2 printouts).

#### Module 4: Mobile DPR App (Flutter)
* **Function:** site engineers submit daily reports in 30 seconds.
* **Details:** Enter "Delivered Today" and "Installed Today" per BOQ item. Mandatory site photo and GPS coordinates stamp. Works offline (queues entries, auto-syncs when online).

---

### 🔵 PHASE 2: Operations & Resource Management (Month 2-3)
**Goal:** Digitalize contractor worker sheets, site issues, and zone project mappings.

#### Module 5: Resource OS (Staff Allocation)
* **Function:** Org hierarchy setup: DGM ➔ ZPM ➔ PM ➔ Supervisor ➔ Site Engineer.
* **Details:** Assign personnel to active projects. Raises alerts if any project has no PM or lead designer assigned.

#### Module 6: SLA Issue & Blocker Tracker
* **Function:** Logs site blockers (scaffolding issues, material stockouts, CAD errors).
* **Details:** Assigns to owner with target deadline. If unresolved within 48 hours, automatically sends a WhatsApp escalation alert to PM and DGM.

#### Module 7: Contractor Allocation Board
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
  role TEXT CHECK (role IN ('DIRECTOR','DGM','ZPM','PM','DESIGNER','SITE_ENGINEER','STORE')),
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
  payment_terms TEXT,
  status TEXT CHECK (status IN ('ON_TRACK','OFF_TRACK','AT_RISK','HOLD','COMPLETED')) DEFAULT 'ON_TRACK',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOQ ITEMS
boq_items (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  item_no TEXT NOT NULL,              -- e.g., "A.1" or "WT-01"
  description TEXT NOT NULL,
  unit TEXT NOT NULL,                 -- e.g., "SQM", "NOS", "RMT"
  total_qty_boq NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DAILY DPR RECORDS
dpr_entries (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  boq_item_id UUID REFERENCES boq_items(id),
  engineer_id UUID REFERENCES users(id),
  entry_date DATE NOT NULL,
  delivered_today NUMERIC DEFAULT 0,
  installed_today NUMERIC DEFAULT 0,
  site_photo_url TEXT,
  gps_lat NUMERIC,
  gps_lng NUMERIC,
  has_blocker BOOLEAN DEFAULT false,
  blocker_desc TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
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

### 5.1 The TRDI Quantity Rule
To prevent data entry errors, the system enforces the following hierarchy at all times:
$$\text{Total Scope (T)} \ge \text{Released (R)} \ge \text{Delivered (D)} \ge \text{Installed (I)}$$
- Site engineers cannot submit an installation count ($I$) that exceeds the available delivered stock ($D - I$).
- Delivered count ($D$) cannot exceed the released count ($R$).

### 5.2 Mobile DPR Constraints
- GPS coordinates stamp must match the project site location within a 2.5km radius.
- Site photo upload is mandatory to save any installation numbers.
- No negative progress quantities are accepted.

---

## 6. SYSTEM INTEGRATIONS

### 6.1 WhatsApp Gateway (Whatshub.live)
- **Role:** Handles notification delivery.
- **Trigger 1 (Real-Time):** Critical site blocker reported (escalates to PM/DGM after 48 hours).
- **Trigger 2 (Scheduled):** at 6:30 PM, auto-compiles daily site logs and posts a summary report directly into the Axsys Project Group chat.

---

## 7. KEY QUESTIONS FOR KAL MEETING

Aap kal meeting mein client se ye **8 practical questions** zaroor discuss karein:

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

## 9. SPRINT CHECKLIST FOR DEVELOPERS (Sprint 1-4)

```markdown
- [ ] Setup Supabase DB & Auth configuration (tenants, users, projects, boq_items)
- [ ] Next.js 14 template deployment on Vercel
- [ ] Create BOQ Importer with custom column mapper interface
- [ ] Build MILESTONE Command Centre dashboard with status cards and search filters
- [ ] Create Design Stage approvals board with file version lock (V1/V2/V3)
- [ ] Build Flutter Mobile login with OTP SMS authentication
- [ ] Setup mobile DPR entry screen with GPS coordinates stamp and camera photo uploads
```

---

## 10. DEVELOPER BRIEF

> Build a multi-tenant web + mobile platform (Next.js + Supabase + Flutter) for Axsys Solutions — a facade company with 50+ active projects. Replace their manual Excel spreadsheets and WhatsApp log entries with a unified cloud command dashboard, a design stage tracker, and a mobile site supervisor DPR tool. Row-level tenant configurations (`tenant_id`) must be integrated from Day 1 to allow multi-tenant scale to Art-N-Glass and Green Fenestration later.
