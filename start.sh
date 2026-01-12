#!/bin/bash

echo ""
echo "  ╔═══════════════════════════════════════════════════════════╗"
echo "  ║                                                           ║"
echo "  ║   ██████╗ ███████╗██████╗ ███████╗ ██████╗                ║"
echo "  ║   ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝                ║"
echo "  ║   ██████╔╝█████╗  ██████╔╝█████╗  ██║                     ║"
echo "  ║   ██╔═══╝ ██╔══╝  ██╔══██╗██╔══╝  ██║                     ║"
echo "  ║   ██║     ███████╗██║  ██║███████╗╚██████╗                ║"
echo "  ║   ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ TEST          ║"
echo "  ║                                                           ║"
echo "  ║         Films That Know When to Stop                      ║"
echo "  ║                                                           ║"
echo "  ╚═══════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "  Installing dependencies..."
    npm install
    echo ""
fi

echo "  Starting development server..."
echo ""
echo "  ─────────────────────────────────────────────────────────────"
echo "  The site will open at: http://localhost:3000"
echo "  Press Ctrl+C to stop the server"
echo "  ─────────────────────────────────────────────────────────────"
echo ""

# Open browser after a short delay
(sleep 3 && open "http://localhost:3000" 2>/dev/null || xdg-open "http://localhost:3000" 2>/dev/null || start "http://localhost:3000" 2>/dev/null) &

# Start the dev server
npm run dev
