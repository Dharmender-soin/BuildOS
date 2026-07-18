# BuildOS — Complete Client Requirements & Build Specification
### Client: Axsys Solutions (Art N Glass Group)
### Prepared by: Antigravity Team | Version: 2.0 | Date: July 19, 2026

---

## PART 1: IS THE FLOW COMPLETE?

### ✅ Verified 9-Step Axsys Operational Workflow

```
┌──────────────────────────────────────────────────────────────────┐
│ STEP 1 │ CONSULTANT CIVIL DRAWING                                 │
│  Architect/Consultant provides drawing with scope qty (Q1 — BOQ) │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 2 │ CLIENT DRAWING REVIEW + AXSYS INTERNAL ESTIMATE         │
│  Axsys PM reads client's architectural drawing (Q2)              │
│  Axsys makes internal estimate / Anuman (Q3)                     │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 3 │ ON-SITE SURVEY (Elevation-wise)                         │
│  Site engineer physically measures on site (Q4)                  │
│  Breaks project into Elevations: Front/Back/Left/Right (A/B/C/D) │
│  Uploads hand-drawn survey sketch photo                          │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓  (24-Hour SLA Clock Starts)
┌──────────────────────────────────────────────────────────────────┐
│ STEP 4 │ SOFT DRAWING (by Axsys Designer)                        │
│  Designer creates CAD drawing based on survey measurements       │
│  Uploads Soft Drawing PDF to system                              │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 4A │ CONSULTANT GFC APPROVAL LOOP ⭐                        │
│  Soft Drawing submitted to CLIENT'S CONSULTANT                   │
│  ┌── APPROVED → Becomes GFC Drawing (stamped PDF uploaded)       │
│  └── REJECTED → Revision (Rev-1, Rev-2...) → Loop back to Step 4│
└─────────────────────────────┬────────────────────────────────────┘
                              ↓  (Only after GFC stamp)
┌──────────────────────────────────────────────────────────────────┐
│ STEP 5 │ DESIGN RELEASE — WORK ORDER + BOM  (R)                 │
│  After GFC approval: Work Order issued to factory                │
│  BOM (Bill of Materials) generated                               │
│  This = R (Released) in T-R-D-I                                 │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 6 │ FACTORY PRODUCTION + EXTERNAL PURCHASE                  │
│  Factory makes main components (ACP panels, aluminium frames)    │
│  External purchase: screws, silicon, brackets, hardware          │
│  Purchase Indent → Vendor approval → Order placed                │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 7 │ FACTORY DISPATCH — BILLING CLERK ENTRY  (D)            │
│  Billing clerk uploads dispatch bill number + quantity           │
│  This = D (Dispatched) in T-R-D-I                               │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 8 │ SITE DELIVERY — RECEIVED                                │
│  Site engineer logs Received Today qty                           │
│  System auto-calculates Transit Loss (Dispatched - Received)     │
│  Partial deliveries tracked with pending balance                 │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 9 │ INSTALLATION  (I)                                       │
│  Site engineer logs Installed Today                              │
│  Mandatory: Site photo + GPS coordinates                         │
│  QC Snags logged (Minor / Major / Critical)                      │
│  This = I (Installed) in T-R-D-I                                │
└─────────────────────────────┬────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ STEP 10 │ SNAG RESOLUTION + HANDOVER SIGN-OFF                    │
│  All snags resolved before marking project 100% complete         │
│  Digital sign-off checklist (Test & Trace, Compliance)           │
└──────────────────────────────────────────────────────────────────┘
```

> **Flow Status: COMPLETE ✅** — All 10 steps verified and captured in system design.

---

## PART 2: CLIENT REQUIREMENTS

### 2.1 Core Problems Axsys Has Today

| Pain Point | Current Manual Way | Business Impact |
|---|---|---|
| No single dashboard | 50+ projects in separate Excels | Directors call PMs every morning |
| No T-R-D-I tracking | WhatsApp: "T:480 R:420 D:350 I:290" | Not searchable, no history |
| Survey-to-release delay | 3-7 day gap before design release | Factory sits idle |
| No GFC tracking | No record of drawing approval dates | Disputes: "I never approved this" |
| Dispatch vs received mismatch | Material lost in transit — no record | Financial losses |
| Small parts not tracked | Screws/brackets missing from site | Work stops, emergency purchases |
| Blockers stuck | Issues in Excel, no owner/deadline | Projects silently go on HOLD |

---

### 2.2 Full Requirements List

#### 🔴 Phase 1 — MUST HAVE (Target: 15 August 2026)

| Req# | Requirement | System Feature |
|---|---|---|
| R-01 | Track 4 different quantity sources per BOQ item | Q1 (Consultant BOQ), Q2 (Client Drawing), Q3 (Anuman), Q4 (Survey) stored separately |
| R-02 | Break project into elevations | Elevation setup (Front/Back/Left/Right or A/B/C/D) per project |
| R-03 | Log on-site survey with sketch upload | Survey qty entry + mandatory hand-drawn sketch photo |
| R-04 | Track Soft Drawing submission to consultant | Upload soft drawing, track consultant name, submission date |
| R-05 | Track GFC approval / rejection loop | Status: PENDING → APPROVED_GFC / REJECTED. Revision rounds (Rev-0, Rev-1...) logged |
| R-06 | 24-hour design release SLA alert | If soft drawing not submitted within 24hrs of survey → Red alert on dashboard + WhatsApp |
| R-07 | Generate Work Order / BOM after GFC only | System blocks Work Order creation until GFC approved |
| R-08 | Billing clerk enters factory dispatch (D) | Billing clerk adds bill no + dispatch qty daily. D auto-updates |
| R-09 | Site received entry with transit loss detection | Received qty entered. System flags if Dispatched > Received |
| R-10 | Mobile DPR — installation entry (I) | GPS + mandatory site photo. Installed qty logged. Offline queue |
| R-11 | Track accessories by package (Box/Bag) | Screws/brackets tracked in bulk packaging, not individual units |
| R-12 | MILESTONE dashboard — all 50+ projects | Project cards: ON TRACK / AT RISK / HOLD. Filter by city/zone/PM |
| R-13 | Live T-R-D-I progress per project | Auto-calculated from releases + dispatches + DPR entries |
| R-14 | SLA Kanban task/issue board | Drag-drop board. Owner assigned. 48hr delay auto-alarm |
| R-15 | Dispute-proof quantity records | All 4 qty values permanently locked. Alert if survey > BOQ by 5%+ |

#### 🟡 Phase 2 — IMPORTANT (Month 2-3)

| Req# | Requirement | System Feature |
|---|---|---|
| R-16 | Staff allocation per project | DGM → ZPM → PM → Supervisor hierarchy. Alert if no PM assigned |
| R-17 | Contractor manpower tracking | Required vs Actual worker counts. Labor yield (installed ÷ workers) |
| R-18 | Handover digital sign-off | Closure checklist. Snags must resolve before 100% mark |
| R-19 | Zone control view | City-wise project grids (Delhi/Gurgaon/Noida). Delays at top |
| R-20 | Purchase indent / vendor order tracking | Track external purchases (screws/hardware) with vendor lead times |

#### 🔵 Phase 3-4 — FUTURE

| Req# | Requirement |
|---|---|
| R-21 | Fitter attendance app (E-Code mobile check-in) |
| R-22 | Auto WhatsApp report at 6:30 PM |
| R-23 | 7-day velocity completion forecast |
| R-24 | Client portal (M3M, Paras Avenue read-only login) |
| R-25 | AI site photo audit (fake photo detection) |
| R-26 | BIM 3D Digital Twin (panels turn green as installed) |

---

## PART 3: WHAT WE WILL BUILD

### 3.1 Platform Architecture

```
┌─────────────────────────────────────────────────────┐
│                  BuildOS Platform                    │
│                                                      │
│   Web Dashboard (Next.js 14)                         │
│   ├── MILESTONE Dashboard (all projects)             │
│   ├── Project Detail (T-R-D-I + elevations)         │
│   ├── Survey & Soft Drawing Upload                  │
│   ├── GFC Approval Tracker                          │
│   ├── Design Release / Work Order Board             │
│   ├── Dispatch Clerk Entry Portal                   │
│   ├── Kanban Task Board                             │
│   └── Reports                                       │
│                                                      │
│   Mobile App (Flutter — Android First)               │
│   ├── Survey logging + sketch photo                 │
│   ├── DPR: Received Today                           │
│   ├── DPR: Installed Today + GPS + Photo            │
│   └── Offline queue (auto-sync on reconnect)        │
│                                                      │
│   Backend: Supabase (PostgreSQL + Auth + Storage)   │
│   Notifications: Whatshub.live (WhatsApp API)       │
│   Hosting: Vercel (Web) + Play Store (Mobile)       │
└─────────────────────────────────────────────────────┘
```

### 3.2 Who Uses What

| Role | App | Actions |
|---|---|---|
| Director / DGM | Web Dashboard | View MILESTONE, overall project health |
| ZPM / PM | Web Dashboard | Manage projects, review surveys, approve releases |
| Designer | Web Dashboard | Upload Soft Drawing, track GFC, generate Work Order |
| Billing Clerk | Web Dashboard | Upload daily dispatch bills |
| Site Engineer | Mobile App | Log survey, sketch, received qty |
| Site Supervisor | Mobile App | Log installed qty, GPS photo, raise Kanban issues |

### 3.3 Tech Stack

| Layer | Technology |
|---|---|
| Web Frontend | Next.js 14 (App Router) |
| Mobile | Flutter (Android first) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (OTP / Email) |
| File Storage | Supabase Storage (drawings, photos, BOM files) |
| WhatsApp Alerts | Whatshub.live API |
| Hosting | Vercel (web) |

---

## PART 4: DATABASE TABLES — COMPLETE LIST

| Table | What It Stores | Workflow Step |
|---|---|---|
| `tenants` | Company accounts (Axsys, Art-N-Glass, Green Fenestration) | Setup |
| `users` | All staff with roles (Director → Billing Clerk → Site Engineer) | Setup |
| `projects` | Project details + Civil/MEP/Facade coordination dates | Setup |
| `consultant_drawings` | Civil drawings received (with revision tracking, GFC flag) | Step 1 |
| `elevations` | Elevation breakdown per project (Front/Back/A/B/C/D) | Step 2 |
| `boq_items` | BOQ items with Q1/Q2/Q3 + accessory category | Step 2 |
| `surveys` | On-site survey qty (Q4) + sketch photo (elevation-wise) | Step 3 |
| `soft_drawing_approvals` | Soft drawing upload + GFC approval loop + revision tracking | Step 4/4A |
| `production_releases` | Work Order + BOM (only after GFC approved) — R qty | Step 5 |
| `dispatches` | Factory dispatch bills by billing clerk — D qty | Step 7 |
| `dpr_entries` | Daily Received + Installed + Transit Loss + Snag count | Steps 8-9 |
| `issues` | Kanban board — site blockers with owner + SLA deadline | Ongoing |
| `trdi_snapshots` | Auto-calculated T/R/D/I summary per BOQ item | Auto |

---

## PART 5: KNOWN GAPS (To Fix)

| # | Gap | Plan |
|---|---|---|
| G-01 | Detailed Snag Register (severity + owner + resolution) | Add `snag_logs` table in Phase 1 update |
| G-02 | Purchase Indent / Vendor order tracking | Add `purchase_indents` table in Phase 2 |
| G-03 | Running Account Bill / Payment milestone tracking | Add `ra_bills` table in Phase 3 |

---

## PART 6: PHASE 1 BUILD PLAN

**Target: 15 August 2026 | 4 Sprints × ~2 weeks each**

| Sprint | Deliverable | Who Benefits |
|---|---|---|
| **Sprint 1** | Project setup, BOQ upload + column mapper, Elevation breakdown, User roles + login | PM, Director |
| **Sprint 2** | Survey entry + sketch upload, Soft Drawing upload, GFC approval tracker (status + revision rounds) | Designer, Site Engineer |
| **Sprint 3** | MILESTONE Dashboard (50+ project cards, T-R-D-I bars), Billing Clerk dispatch entry | Director, Billing Clerk |
| **Sprint 4** | Mobile DPR App (Received + Installed + GPS + Photo), SLA Kanban Task Board | Site Engineer, Supervisor |
