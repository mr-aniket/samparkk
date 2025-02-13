document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const title = document.querySelector('.modern-title');
    const subtitle = document.querySelector('.subtitle');
    let isTouchDevice = 'ontouchstart' in window;

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        content.classList.add('active');
        setTimeout(() => loader.remove(), 200);
    }, 2000);

    const handleMove = (e) => {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        if (!isTouchDevice) {
            cursor.style.left = `${clientX}px`;
            cursor.style.top = `${clientY}px`;
            cursorFollower.style.left = `${clientX}px`;
            cursorFollower.style.top = `${clientY}px`;
        }

        const titleRect = title.getBoundingClientRect();
        const titleCenterX = titleRect.left + titleRect.width/2;
        const titleCenterY = titleRect.top + titleRect.height/2;
        
        const deltaX = (clientX - titleCenterX) * 0.03;
        const deltaY = (clientY - titleCenterY) * 0.03;
        
        title.style.transform = `
            translate(-50%, -50%)
            translate(${deltaX}px, ${deltaY}px)
            scale(${1 + Math.abs(deltaX * 0.002)})
        `;
        
        const subDeltaX = (clientX - window.innerWidth/2) * 0.01;
        const subDeltaY = (clientY - window.innerHeight/2) * 0.01;
        
        subtitle.style.transform = `
            translateX(-50%)
            translate(${subDeltaX}px, ${subDeltaY}px)
        `;
    };

    const resetElements = () => {
        title.style.transform = 'translate(-50%, -50%)';
        subtitle.style.transform = 'translateX(-50%)';
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleMove(e);
    }, { passive: false });

    document.addEventListener('mouseleave', resetElements);
    document.addEventListener('touchend', resetElements);

    const handleClick = () => {
        if (!isTouchDevice) {
            cursorFollower.style.transform = 'scale(0.8)';
            setTimeout(() => {
                cursorFollower.style.transform = 'scale(1)';
            }, 100);
        }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleClick);
});

// Prevent right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Prevent F12, Ctrl+Shift+I, Ctrl+Shift+C
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u')
    ) {
        e.preventDefault();
        return false;
    }
});
