# NZF Ops Portal – Design & UX Document

## Purpose

The NZF Ops Portal is a **modern operations hub** for a milsim unit.

It must serve two audiences equally well:

1. **Active members**
   - See upcoming operations instantly
   - Read clear, structured mission briefings
   - Comment and coordinate without Discord scrollback

2. **Potential recruits / public**
   - Instantly see that NZF is active, organised, and professional
   - View highlights and recent operations
   - Be funneled cleanly into Discord

This site should feel:
- Alive
- Tactical
- Minimal
- Professional
- Not “clan website from 2012”

---

## Core Design Principles

### 1. Operations First
The site exists to surface **what’s coming up next**.

Upcoming operations must be:
- Visible immediately on page load
- Understandable at a glance
- Clickable into deeper detail

If a user has to hunt for the next op, the design has failed.

---

### 2. Tactical, Not Gimmicky

Avoid:
- Overuse of neon green
- Distracting animations

Prefer:
- Clean layouts
- Strong typography
- Subtle contrast
- Purposeful motion

Think *modern command dashboard*, not *hacker movie*.

---

### 3. Public by Default, Secure by Design

- All core content (ops, briefings, highlights) is readable without login.
- Login unlocks **interaction**, not visibility.
- Discord is the source of truth for identity and roles.

This keeps the site welcoming and friction-free.

---

## Information Architecture

### Top-Level Navigation

Minimal and intentional:

- **Operations**
- **Highlights**
- **About**
- **Join Discord**
- **Sign In** (or user avatar when logged in)

No dropdown hell.

---

## Page-by-Page Design

---

## Landing Page (`/`)

### Goal
Immediately answer:
> “What’s happening next, and is this unit active?”

---

### Section 1: Hero / Intro

**Layout**
- Full-width, constrained content
- Dark background
- Subtle texture or gradient (not flat black)

**Content**
- NZF logo (all logos found in the UI folder)
- One-sentence mission statement
- Primary CTA: `View Upcoming Operations`
- Secondary CTA: `Join Discord`

---

### Section 2: Upcoming Operations (Primary Feature)

This is the visual and functional anchor of the page.

**Design**
- Card-based layout
- 3–5 upcoming operations
- Clear hierarchy

**Each Operation Card**
- Operation name (large, bold)
- Date & time (NZT, explicit)
- Game (Arma 3 / Reforger badge)
- Status pill:
  - Open / Limited / Full / Closed
- Short teaser line
- Subtle hover state
- Entire card clickable

**Optional Enhancements**
- “Next Op” highlight
- Countdown (“Starts in 3 days”)

---

### Section 3: Highlights

Split layout:

**Left: Video Highlights**
- Embedded YouTube videos
- Minimal chrome
- Titles only

**Right: Screenshot Gallery**
- Curated images
- Lightbox on click
- No massive galleries

This section exists to build confidence and hype.

---

### Section 4: About + Discord Funnel

- Short paragraph: who NZF are
- Clear expectations (milsim, organised ops, teamwork)
- Large Discord CTA button
- No wall of text

---

## Operations List (`/operations`)

### Goal
Provide a scannable overview of activity.

**Layout**
- List view by default
- Optional calendar toggle later

**Features**
- Upcoming ops first
- Past ops collapsed or paginated
- Filter by:
  - Game
  - Status (optional)

This page should feel calm and structured.

---

## Operation Detail Page (`/operations/:id`)

### Goal
Be the definitive mission reference.

---

### Header Section

- Operation name
- Date & time
- Game
- Mission maker
- Status badge
- Optional player count

Clear, clean, no clutter.

---

### Mission Briefing

Use **consistent structured sections**:

- Situation
- Enemy Forces
- Friendly Forces
- Mission Objectives
- Execution
- Command & Signal
- Rules of Engagement

**Design**
- Section headers with subtle dividers
- Readable line length
- No giant text blocks

This should read like a professional briefing, not a Discord post.

---

### Intel Section

- Image grid (maps, reference shots)
- Captions optional
- External links allowed

This area adds immersion without overwhelming.

---

### Comments Section

- Visible to everyone
- Writable only by logged-in members

**Design**
- Discord avatar + username
- Timestamp
- Clean thread layout
- No reactions / clutter in MVP

Mission makers may have a subtle badge.

---

## Mission Creation / Editing (Mission Makers Only)

### Goal
Fast, low-friction mission authoring.

**Form Design**
- Logical grouping:
  - Basic info
  - Briefing sections
  - Intel uploads
- Autosave if possible
- No modal hell

---

### AI Briefing Helper (Integrated, Optional)

- Button: `Generate Draft Briefing`
- Opens helper panel
- Mission maker provides rough notes
- AI outputs structured draft
- Fully editable before save

AI assists — it never replaces human control.

---

## Authentication UX

### Sign In with Discord

- Single prominent button
- Discord branding respected
- No custom username/password flows

---

### Post-login Experience

- Redirect to `/`
- User avatar appears in nav
- Role-based UI unlocks silently
  - Mission creation buttons appear for mission makers
  - No role labels shown to users

---

### Error Handling

- OAuth failures redirect to `/auth/error`
- Friendly message:
  - “Discord login failed. Please try again.”
- No stack traces or JSON dumps

---

## Visual Design System

### Color Palette

- Dark neutral base
- One strong accent color (NZF branding)
- Muted secondary colors for badges/status

Avoid:
- Pure black
- Neon saturation

---

### Typography

- Sans-serif, modern, readable
- Strong hierarchy:
  - Ops names = bold
  - Section headers = medium
  - Body = regular

No “tactical” novelty fonts.

---

### Motion & Interaction

- Subtle hover states
- Soft transitions
- No parallax or gimmicks

Everything should feel intentional.

---

## Responsiveness

- Desktop-first (this is an ops dashboard)
- Fully usable on tablet
- Mobile readable, not cramped

No separate mobile UX needed.

---

## What “Good” Looks Like

A good NZF Ops Portal:

- Shows upcoming ops in under 2 seconds
- Makes mission briefings easy to read
- Feels calm and confident
- Doesn’t feel like a side project
- Scales cleanly as features are added

If it feels boring but professional — that’s a win.

---

## Non-Goals (Explicit)

- No forums
- No SOP dump (yet)
- No internal Discord replacement
- No slotting system in MVP
- No gimmicky milsim aesthetics

---

## Design North Star

> **A living operations board that makes NZF look organised, active, and worth joining — without shouting.**
