document.addEventListener('DOMContentLoaded', () => {
    const avatar = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea"/%3E%3Cstop offset="100%25" style="stop-color:%23764ba2"/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx="100" cy="100" r="100" fill="url(%23g)"/%3E%3Ctext x="100" y="130" font-size="100" text-anchor="middle"%3E👧%3C/text%3E%3C/svg%3E';
    document.getElementById('avatarImg').src = avatar;
    document.getElementById('subcardAvatarImg').src = avatar;

    // VIEW COUNTER - Direct CountAPI (FREE, no backend needed!)
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (isLocal) {
        // LOCAL: localStorage
        let v = parseInt(localStorage.getItem('komi_views') || '0') + 1;
        localStorage.setItem('komi_views', v);
        document.getElementById('viewCount').textContent = v;
        console.log('✅ Local views:', v);
    } else {
        // PRODUCTION: CountAPI global counter
        fetch('https://api.counterapi.com/v1/komi-profile/visits/up')
            .then(r => r.json())
            .then(d => {
                document.getElementById('viewCount').textContent = d.count || 0;
                console.log('✅ Global views:', d.count);
            })
            .catch(err => {
                console.error('View counter error:', err);
                document.getElementById('viewCount').textContent = '—';
            });
    }

    document.head.innerHTML += '<style>@keyframes countUp{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}@keyframes ripple{from{transform:scale(0);opacity:1}to{transform:scale(2);opacity:0}}@keyframes spin{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(1.05)}100%{transform:rotate(360deg) scale(1)}}@keyframes slide{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes out{to{transform:translateX(100%);opacity:0}}@keyframes float{to{transform:translateY(-100vh);opacity:0}}@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.2)}}@keyframes fade{to{opacity:0;transform:translate(-50%,-50%) scale(2)}}</style>';

    document.getElementById('viewCount').style.animation = 'countUp .5s ease-out';

    document.getElementById('facebookBtn').addEventListener('click', function () {
        const r = document.createElement('span');
        r.style.cssText = 'position:absolute;border-radius:50%;background:rgba(24,119,242,.3);width:100%;height:100%;animation:ripple .6s';
        this.style.cssText += ';position:relative;overflow:hidden';
        this.appendChild(r);
        setTimeout(() => r.remove(), 600);
    });

    const av = document.querySelector('.avatar');
    let rot = false;
    av.addEventListener('mouseenter', () => {
        if (!rot) {
            av.style.animation = 'spin 1s ease-in-out';
            rot = true;
            setTimeout(() => { av.style.animation = ''; rot = false; }, 1000);
        }
    });

    document.querySelector('.subcard').addEventListener('click', () => {
        navigator.clipboard.writeText(document.querySelector('.username').textContent).then(() => {
            const n = document.createElement('div');
            n.textContent = 'Username copied!';
            n.style.cssText = 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:600;box-shadow:0 8px 20px rgba(0,0,0,.3);z-index:9999;animation:slide .3s';
            document.body.appendChild(n);
            setTimeout(() => {
                n.style.animation = 'out .3s';
                setTimeout(() => n.remove(), 300);
            }, 2000);
        });
    });

    setInterval(() => {
        const p = document.createElement('div');
        p.style.cssText = `position:fixed;width:4px;height:4px;background:linear-gradient(135deg,rgba(255,255,255,.8),rgba(196,113,237,.8));border-radius:50%;pointer-events:none;z-index:0;left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;animation:float ${5 + Math.random() * 5}s linear;opacity:${.3 + Math.random() * .4}`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 10000);
    }, 2000);

    document.querySelector('.status-indicator').style.animation = 'pulse 2s ease-in-out infinite';

    document.addEventListener('keydown', e => {
        if (e.key === 'f' || e.key === 'F') { e.preventDefault(); document.getElementById('facebookBtn').click(); }
        if (e.key === 'c' || e.key === 'C') { e.preventDefault(); document.querySelector('.subcard').click(); }
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity .5s';
    setTimeout(() => document.body.style.opacity = '1', 100);
});

document.addEventListener('mousemove', e => {
    if (Math.random() > .9) {
        const t = document.createElement('div');
        t.style.cssText = `position:fixed;width:6px;height:6px;background:radial-gradient(circle,rgba(196,113,237,.6),transparent);border-radius:50%;pointer-events:none;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);animation:fade 1s;z-index:0`;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 1000);
    }
});
