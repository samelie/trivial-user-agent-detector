# User Agent Detector Demo

A live demo page showcasing the `@adddog/trivial-user-agent-detector` library.

## Running Locally

Since this demo uses ES modules, you'll need to serve it with a local HTTP server:

### Option 1: Using Python (built-in)
```bash
# From this directory
python3 -m http.server 8000
# Then open http://localhost:8000
```

### Option 2: Using Node.js http-server
```bash
npx http-server -p 8000
# Then open http://localhost:8000
```

### Option 3: Using VS Code Live Server
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Deployment to GitHub Pages

To deploy this demo to GitHub Pages:

1. Build the package first:
   ```bash
   cd ..
   pnpm build
   ```

2. The `example/` directory can be deployed directly to GitHub Pages

3. Configure GitHub Pages to serve from the `packages/trivial-user-agent-detector/example` directory, or copy the contents to a docs folder in the root

## Testing

Open the demo page on different devices to see accurate detection:
- Desktop browsers (Chrome, Firefox, Safari)
- Mobile devices (iOS Safari, Android Chrome)
- Tablets (iPad, Android tablets)

The page will display:
- Device type and capabilities
- Platform information (iOS/Android version)
- Browser detection
- Hardware capabilities
- Display information
- Complete JSON output
