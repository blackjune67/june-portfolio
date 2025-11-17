// Global variables for 3D objects
let scene, camera, renderer, knot, pointLight;

// --- 1. Three.js Setup ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('bg-canvas'),
        alpha: true // Transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // The 3D Model (a TorusKnot)
    const geometry = new THREE.TorusKnotGeometry(9, 2.5, 150, 20);
    
    // *** THEME CHANGE: Set material to neon green wireframe ***
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x00ff00, // 'pixel-neon'
        wireframe: true  // Enable wireframe
    });
    knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // Lighting
    pointLight = new THREE.PointLight(0xffffff, 1.5); // White light
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);
    
    // *** THEME CHANGE: Dim ambient light for dark mode ***
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Dim grey light
    scene.add(ambientLight);

    camera.position.z = 30;
}

// --- 2. Lenis Smooth Scroll Setup ---
// Note: Assumes Lenis is loaded via CDN and attached to the window object.
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// --- 3. Animation & Scroll Effects ---
// 'parallax-bg'는 더 이상 사용되지 않음.
const fadeInElements = document.querySelectorAll('.fade-in');

// Function to handle fade-in logic
function handleFadeIn() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeInElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add('is-visible');
        } else {
            // Optional: remove to make it fade-in only once
            // el.classList.remove('is-visible'); 
        }
    });
}

// Main animation loop linked to Lenis's scroll event
lenis.on('scroll', (e) => {
    const scrollY = e.scrollY;

    // 3D model rotation based on scroll
    if (knot) {
        knot.rotation.x = scrollY * 0.0003;
        knot.rotation.y = scrollY * 0.0003;
    }
    
    // Fade-in elements
    handleFadeIn();
});

// Loop for non-scroll animations (like 3D model idle rotation)
function animate() {
    requestAnimationFrame(animate);

    // Subtle idle rotation
    if (knot) {
        knot.rotation.z += 0.0005;
    }
    
    renderer.render(scene, camera);
}

// --- 4. Resize Handler ---
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    handleFadeIn(); // Re-check fade-in on resize
}
window.addEventListener('resize', onWindowResize, false);

// --- 5. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    animate();
    handleFadeIn(); // Initial check on load
});