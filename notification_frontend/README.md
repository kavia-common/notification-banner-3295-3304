# React + Tailwind Notification Frontend

A lightweight React application styled with Tailwind CSS that shows a top-right notification when triggered and automatically dismisses after 3 seconds.

## Features
- Tailwind CSS styling with Ocean Professional theme (blue primary, amber secondary)
- Top-right notification with auto-dismiss and close button
- Accessible (role=alert/status, aria-live=polite)
- Smooth gradients, rounded corners, subtle shadows

## Theme
Configured in `tailwind.config.js`:
- colors.extend:
  - primary: #2563EB
  - secondary/success: #F59E0B
  - error: #EF4444
  - background: #f9fafb
  - surface: #ffffff
  - text: #111827

## Getting Started
- npm install
- npm start
- App runs at http://localhost:3000

## Testing
- npm test
- Tests include verification of notification appearing and auto-dismissing after 3 seconds (Jest fake timers).

## Files of interest
- src/components/Notification.jsx: Notification UI and auto-dismiss logic
- src/App.js: Demo UI with input and trigger buttons
- src/index.css: Tailwind directives and base styles
- tailwind.config.js & postcss.config.js: Tailwind/PostCSS configuration

No environment variables are required for this demo, but the app supports standard CRA variables if needed.
