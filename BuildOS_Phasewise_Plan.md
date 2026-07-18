# BuildOS — Implementation & Delivery Roadmap (Phase-wise)
### Client: Axsys Solutions (Art N Glass Group)
### Output Reference: Axsys Product Board (Frame 20 & 21)

---

## 🟢 PHASE 1: Core MVP (Month 1 / target 15 August)
**Focus:** Core Progress Tracking, Survey-to-Release Cycle, Dispatch Tracking & Task Management.  
*Directly replaces: MILESTONE Master Excel, Per-Project Design spreadsheets, WhatsApp progress texts, and manual task lists.*

### Module 1: BOQ & Survey Input
* **What it does:** Upload client BOQ Excel, map columns, and parse items. Support logging of surveys (e.g. out of 1000 sqm door BOQ, we surveyed 200 sqm today) along with uploading a hand-drawn/manual survey sketch photo.
* **Axsys Excel Replaced:** Individual project sheets (M3M, Vegas, Sky Xotic tabs) + raw site survey sketches.
* **Final Outcome:** Structured project BOQ with logged surveyed quantities and attached sketch documentation.

### Module 2: Design Release Board (Design/Release Team)
* **What it does:** Design/Release team extracts material requirements from surveyed areas, uploads production Excel sheets (Work Orders/BOM), and tracks pending survey conversions (how many surveys are NOT yet converted to design release).
* **Axsys Excel Replaced:** Color-coded design columns and manual BOM spreadsheets.
* **Final Outcome:** Full visibility into pending design-release conversions, preventing production backlogs.

### Module 3: MILESTONE Command Centre & Dispatch/Billing Import
* **What it does:** Unified dashboard displaying all 50+ projects as cards with live status (`ON TRACK`, `AT RISK`, `HOLD`). Supports billing/dispatch clerk uploading daily bill/invoice logs to track dispatched quantities.
* **Axsys Excel Replaced:** Master MILESTONE spreadsheet + manual factory dispatch reports.
* **Final Outcome:** Dashboard showing live T/R/D/I numbers driven directly by factory bills and site inputs.

### Module 4: Mobile DPR Application (Flutter)
* **What it does:** App for site supervisors to log daily **Received Today** (factory dispatches) and **Installed Today** quantities per BOQ item. Mandatory site photo and GPS coordinates stamp. Tracks partial deliveries.
* **Axsys Workflow Replaced:** Site engineers typing manual WhatsApp reports.
* **Final Outcome:** Real-time mismatch tracking (Plant Dispatched vs Site Received) and progress logging with offline support.

### Module 5: SLA Issue Tracker & Task Board (Kanban)
* **What it does:** A drag-and-drop Kanban task board (similar to Monday.com or Google Tasks) to track site blocker issues. Tasks are mapped to a project and assigned to a responsible owner.
* **Axsys Excel Replaced:** AJAY ji sheet + manual notes/reminders.
* **Final Outcome:** Visual task status board per project and per person. Auto-flags tasks delayed beyond 48 hours.

---

## 🔵 PHASE 2: Operations & Resources (Month 2-3)
**Focus:** Contractor Management, Manpower Allocations, and Handover lists.  
*Directly replaces: Deepak Workbook, staff sheets, and Handover lists.*

### Module 6: Resource OS (Staff Allocations)
* **What it does:** Visual DGM ➔ ZPM ➔ PM ➔ Supervisor hierarchy mapping.
* **Axsys Excel Replaced:** PROJECT STAFF NEW sheet.
* **Final Outcome:** Clear visibility of staff roles; system alerts if any project lacks a PM or Lead Designer.

### Module 7: Contractor Allocation Board (Deepak Workbook)
* **What it does:** Dynamic database tracking contractor workforce deployments. Required vs Actual worker counts on sites; auto-calculates yields (panels installed ÷ fitters present).
* **Axsys Excel Replaced:** Deepak Workbook contractor matrix.
* **Final Outcome:** Live workforce visibility, identifying labor shortages and contractor productivity.

### Module 8: Project Handover Checklist
* **What it does:** Digitized completion sign-offs, final measurements, and compliance logs.
* **Axsys Excel Replaced:** HANDOVER sheet.
* **Final Outcome:** Structured project closure checkpoints with designated owners and due dates.

### Module 9: Zone Control View
* **What it does:** Grouping projects by city/zones.
* **Axsys Excel Replaced:** ZONE sheet.
* **Final Outcome:** Visual card grids highlighting ZPM project metrics and site delays.

---

## 🟣 PHASE 3: Automation & Reports (Month 4-5)
**Focus:** Fitter Check-ins, Automated Summaries, and Completion Forecasting.  
*Directly replaces: fitter attendance sheets, manual 6:30 PM WhatsApp texts, and estimation guessing.*

### Module 10: Fitter Attendance Mobile App
* **What it does:** City-wise fitters check in via mobile using E-Codes.
* **Axsys Excel Replaced:** fitter sheet + PROJECT FITTER NEW.
* **Final Outcome:** Real-time fitter check-in logs: Present / Leave / Transit / Today Leave.

### Module 11: 6:30 PM WhatsApp Auto-Report Engine
* **What it does:** Gathers all daily mobile DPR inputs and sends a formatted summary to configured WhatsApp groups at 6:30 PM.
* **Axsys Workflow Replaced:** PMs spending 2 hours compiling logs every evening.
* **Final Outcome:** Fully automated daily management reporting via Whatshub.live API.

### Module 12: 7-Day Velocity Completion Forecast
* **What it does:** Calculates predicted completion dates based on the last 7 days of site velocity.
* **Axsys Workflow Replaced:** Manual estimation guesses.
* **Final Outcome:** Alerts if the rolling forecast predicts project delivery delay beyond contract dates.

### Module 13: Multi-Tenant Tenant Expansion
* **What it does:** Creates isolated client spaces for **Art-N-Glass** and **Green Fenestration** on the same platform.
* **Final Outcome:** A unified platform for Art N Glass Group, increasing developer/SaaS subscription leverage.

---

## 🟡 PHASE 4: Platform Scale & BIM (Month 6+)
**Focus:** BIM 3D Twins, Client Portals, and AI Quality Control.

### Module 14: Client Progress Portal
* **What it does:** Read-only portal logins for Axsys clients (M3M, Smart World, Paras Avenue).
* **Final Outcome:** Clients track progress directly, eliminating "What is the status?" phone calls.

### Module 15: AI site Photo Audit
* **What it does:** Google Gemini Vision API parses site photos uploaded with DPRs.
* **Final Outcome:** Auto-flags fakes, repeat uploads, or stock photos to maintain 100% data integrity.

### Module 16: BIM / 3D Digital Twin
* **What it does:** Three.js interactive 3D model of the building facade.
* **Final Outcome:** As site supervisors upload installation DPRs, the panels automatically light up green in 3D.

### Module 17: Estimation & Billing Triggers
* **What it does:** Auto-invoicing triggered when a project milestone % is crossed.
* **Final Outcome:** Live cash outstanding dashboard and advance tracking metrics.

---

## 💡 IS THIS PROPERLY MENTIONED ON THE BOARD?
**Yes, it is 100% mapped and live on your board!**
- In **Frame 20** (Interactive Phase Roadmap), you can switch tabs between **Phase 1, Phase 2, Phase 3, and Phase 4** to show this exact structure.
- In **Frame 21** (Current Status Board), you can see how Axsys's exact sheets match these phases and outcomes. 
- You can click `🔎 Expand` in the top right of these frames on the board to show this full breakdown in a clear, high-contrast modal during the meeting!
