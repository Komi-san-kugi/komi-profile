const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // Get Netlify Blobs store
        const store = getStore('views');

        // Get current views
        let views = await store.get('count', { type: 'json' });
        views = views ? views.count : 0;

        // Increment
        views++;

        // Save back
        await store.set('count', JSON.stringify({ count: views }));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, views })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};
