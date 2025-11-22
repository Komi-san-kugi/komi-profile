const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Path to views data file
const VIEWS_FILE = path.join(__dirname, 'views.json');

// Initialize views file if it doesn't exist
if (!fs.existsSync(VIEWS_FILE)) {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify({ views: 0, lastUpdated: new Date().toISOString() }));
    console.log('✅ Created views.json file');
}

// Helper function to read views
function readViews() {
    try {
        const data = fs.readFileSync(VIEWS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('❌ Error reading views.json:', error);
        return { views: 0, lastUpdated: new Date().toISOString() };
    }
}

// Helper function to write views
function writeViews(viewsData) {
    try {
        fs.writeFileSync(VIEWS_FILE, JSON.stringify(viewsData, null, 2));
        return true;
    } catch (error) {
        console.error('❌ Error writing views.json:', error);
        return false;
    }
}

// API endpoint to get and increment views
app.get('/api/views', (req, res) => {
    try {
        // Read current views
        const data = readViews();

        // Increment views
        data.views += 1;
        data.lastUpdated = new Date().toISOString();

        // Save updated views
        const success = writeViews(data);

        if (success) {
            console.log(`👁️  View count: ${data.views}`);
            res.json({
                success: true,
                views: data.views,
                lastUpdated: data.lastUpdated
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to save view count'
            });
        }
    } catch (error) {
        console.error('❌ Error in /api/views:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// API endpoint to get current views without incrementing
app.get('/api/views/current', (req, res) => {
    try {
        const data = readViews();
        res.json({
            success: true,
            views: data.views,
            lastUpdated: data.lastUpdated
        });
    } catch (error) {
        console.error('❌ Error in /api/views/current:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// API endpoint to reset views (admin only - add authentication in production)
app.post('/api/views/reset', (req, res) => {
    try {
        const data = {
            views: 0,
            lastUpdated: new Date().toISOString()
        };

        const success = writeViews(data);

        if (success) {
            console.log('🔄 View count reset to 0');
            res.json({
                success: true,
                message: 'Views reset successfully',
                views: 0
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to reset views'
            });
        }
    } catch (error) {
        console.error('❌ Error in /api/views/reset:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Serve static files (optional - if you want to serve frontend from same server)
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start server
app.listen(PORT, () => {
    const currentViews = readViews();
    console.log('🚀 Server started successfully!');
    console.log(`📍 API running at: http://localhost:${PORT}`);
    console.log(`👁️  Current views: ${currentViews.views}`);
    console.log('');
    console.log('📌 Available endpoints:');
    console.log(`   GET  /api/views         - Increment and get view count`);
    console.log(`   GET  /api/views/current - Get current views (no increment)`);
    console.log(`   POST /api/views/reset   - Reset view count to 0`);
    console.log(`   GET  /api/health        - Health check`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('👋 SIGINT received, shutting down gracefully...');
    process.exit(0);
});
