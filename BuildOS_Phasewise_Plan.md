# BuildOS — Implementation & Delivery Roadmap (Phase-wise)
### Client: Axsys Solutions (Art N Glass Group)
### Output Reference: Axsys Product Board (Frame 20 & 21)

---

## 🟢 PHASE 1: Core MVP (Month 1)
**Focus:** Core Progress Tracking & Version Control.  
*Directly replaces: MILESTONE Master Excel, Per-Project Design spreadsheets, and WhatsApp progress texts.*

### Module 1: Project Setup & BOQ Parser
* **What it does:** Allows Axsys PMs to upload client BOQs (Excel) ➔ System auto-parses rows into structured work items.
* **Axsys Excel Replaced:** Individual project sheets (Paras Avenue, M3M, Vegas tabs).
* **Final Outcome:** 1-click database setup for new projects with exact quantities and units locked.

### Module 2: MILESTONE Command Centre Dashboard
* **What it does:** A unified dashboard showing all 50+ projects as cards with live status badges (`ON TRACK`, `AT RISK`, `HOLD`).
* **Axsys Excel Replaced:** Master MILESTONE spreadsheet.
* **Final Outcome:** Directors can check portfolio health in 30 seconds without calling site managers.

### Module 3: Design Stage Tracker
* **What it does:** Track 7 design approval stages per item (Concept ➔ Structure ➔ Shop ➔ Colour ➔ MS ➔ Glass ➔ BOM) with active version locking.
* **Axsys Excel Replaced:** Color-coded design columns in project tabs.
* **Final Outcome:** Site engineers only view the latest locked drawing (e.g. V3); scanning V2 sheet triggers a warning popup.

### Module 4: Mobile DPR Application (Flutter)
* **What it does:** Mobile app for site supervisors to log daily "Delivered" and "Installed" quantities. Mandatory site photo + GPS coordinate checks.
* **Axsys Workflow Replaced:** Site engineers typing manual WhatsApp texts.
* **Final Outcome:** Standardized progress uploads that auto-update dashboards instantly (works offline in dead zones).

---

## 🔵 PHASE 2: Operations & Resources (Month 2-3)
**Focus:** Contractor Management, Site Issues, and Zone Coordination.  
*Directly replaces: Deepak Workbook, AJAY ji Issues sheet, staff sheets, and Handover lists.*

### Module 5: Resource OS (Staff Allocations)
* **What it does:** Visual DGM ➔ ZPM ➔ PM ➔ Supervisor hierarchy mapping.
* **Axsys Excel Replaced:** PROJECT STAFF NEW sheet.
* **Final Outcome:** Clear visibility of staff roles; system alerts if any project lacks a PM or Lead Designer.

### Module 6: SLA Issue & Blocker Tracker
* **What it does:** Site engineers log blocker issues (civil variations, raw material shortages) on the app.
* **Axsys Excel Replaced:** AJAY ji sheet.
* **Final Outcome:** SLA deadlines assigned. If unresolved in 48 hours, automatically escalates to PM/DGM via WhatsApp.

### Module 7: Contractor Allocation Board
* **What it does:** Dynamic database tracking contractor workforce deployments.
* **Axsys Excel Replaced:** Deepak Workbook contractor matrix.
* **Final Outcome:** Required vs Actual worker counts on sites; auto-calculates yields (panels installed ÷ fitters present).

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
