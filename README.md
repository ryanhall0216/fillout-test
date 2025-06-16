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
*   **Node.js & Express**: For the simple local server (`server.js`) to serve the production build.

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
├── constants.tsx               # Icon components and initial data
├── index.html                  # Development HTML (loads index.tsx)
├── index.tsx                   # Main React entry point (development)
├── PageItem.tsx                # Individual page item component (should be in components/)
├── README.md                   # This file
├── server.js                   # Node.js/Express server for dist/
├── types.ts                    # TypeScript type definitions
└── metadata.json               # Project metadata for the hosting environment
```
*(Note: `PageItem.tsx` is currently in the root; ideally, it would reside within the `components/` directory for better organization.)*

## Getting Started

### Prerequisites

*   **Node.js and npm**: Ensure Node.js (which includes npm) is installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **Web Browser**: A modern web browser that supports ES Modules and `importmap`.

### Development Mode (using source files directly)

The project appears to be set up to allow running directly from the source TypeScript files (`.tsx`) using the `index.html` at the project root. This typically relies on the browser's native ES Module support and the `importmap` for resolving React dependencies from a CDN.

1.  **Serve the root directory**: Use a simple HTTP server (like `live-server` via `npx live-server .` or VS Code's Live Server extension) from the project's root directory.
2.  Open `index.html` in your browser.

*Note: This setup directly runs `.tsx` files. Depending on your browser and any extensions, this might work out-of-the-box for simple cases or might require a development server that can transpile TSX on the fly if not configured explicitly.*

### Serving the Production Build (from `dist/` folder)

The `dist/` folder contains a pre-built version of the application (`dist/app.js` and `dist/index.html`). The `server.js` file is provided to serve these files.

1.  **Install Dependencies** (if you haven't already for the server):
    Navigate to the project's root directory in your terminal and install Express:
    ```bash
    npm install express
    ```
    *(If a `package.json` doesn't exist, you might want to create one first with `npm init -y`)*

2.  **Ensure `dist/` files are up-to-date**:
    The `dist/app.js` file should be the compiled output of your TypeScript/React source code. The method for generating/updating this file (e.g., a build script) is not explicitly defined in the provided project structure but is crucial. For this example, we assume `dist/app.js` is already correctly bundled.

3.  **Start the App**:
    Run command npm run dev to start the app
    ```

4.  **Access in Browser**:
    Open your web browser and navigate to `http://localhost:3000` (or the port specified if `process.env.PORT` is set).

