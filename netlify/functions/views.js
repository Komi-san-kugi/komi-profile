exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // Proxy to counterapi.com to avoid CORS and Blobs setup
        // Using 'komi-profile' as namespace and 'views' as key
        const response = await fetch('https://api.counterapi.com/v1/komi-profile/views/up');
        const data = await response.json();

        console.log('CounterAPI response:', data);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, views: data.count })
        };
    } catch (error) {
        console.error('Error proxying to CounterAPI:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};
