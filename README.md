# React Page Navigation

A page navigation component similar to a form builder, supporting drag-to-reorder, adding pages, context menus, and active page highlighting. Built with React, TypeScript, and Tailwind CSS.

## Features

*   **Page List**: Display a list of pages.
*   **Active Page Highlighting**: Clearly indicates the currently selected page.
*   **Add Pages**: Dynamically add new pages at specific positions.
*   **Drag-and-Drop Reordering**: Intuitively reorder pages.
*   **Context Menu**: Right-click (or click an ellipsis icon) on a page item to:
    *   Rename page
    *   Duplicate page
    *   Delete page
*   **Responsive Design**: UI adapts to screen size (primarily through Tailwind CSS).
*   **Modern Aesthetics**: Clean and user-friendly interface with custom scrollbars and font.

## Technology Stack

*   **React 19**: For building the user interface.
*   **TypeScript**: For static typing and improved developer experience.
*   **Tailwind CSS**: For utility-first styling (loaded via CDN).
*   **ES Modules**: Leveraged for direct browser module loading in development (`index.html` -> `index.tsx`) and for the bundled output (`dist/app.js`).

## Project Structure

```
.
├── components/                 # React components
│   ├── App.tsx                 # Main application component
│   ├── ContextMenu.tsx         # Context menu UI
│   ├── DropZone.tsx            # Drop zones for drag & drop
│   └── PageNavigation.tsx      # Main navigation panel
├── dist/                       # Production build output
│   ├── app.js                  # Bundled JavaScript
│   └── index.html              # HTML for production build
├── icons.tsx               # Icon components and initial data
├── index.html                  # Development HTML (loads index.tsx)
├── index.tsx                   # Main React entry point (development)
├── PageItem.tsx                # Individual page item component (should be in components/)
├── README.md                   # This file
├── types.ts                    # TypeScript type definitions
└── metadata.json               # Project metadata for the hosting environment
```
*(Note: `PageItem.tsx` is currently in the root; ideally, it would reside within the `components/` directory for better organization.)*

## Getting Started

### Prerequisites

*   **Node.js and npm**: Ensure Node.js (which includes npm) is installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **Web Browser**: A modern web browser that supports ES Modules and `importmap`.
