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
