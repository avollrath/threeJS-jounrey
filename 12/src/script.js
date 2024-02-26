import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
 
/**
 * Base
 */
// Debug
const gui = new GUI()

gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// // Axes helper

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
 */


const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const textGeometry = new TextGeometry(
            'Andre \nVollrath',
            {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4

            }
        )

        textGeometry.center()
        const material = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20 , 45)
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)

        for(let i=0; i < 1000; i++)
        {
            const donut = new THREE.Mesh (donutGeometry, material)

            donut.position.x = (Math.random() -0.5) * 40
            donut.position.y = (Math.random() -0.5) * 40
            donut.position.z = (Math.random() -0.5) * 40

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale,scale,scale)
            scene.add(donut)
        }

        for(let i=0; i < 1000; i++)
        {
            const box = new THREE.Mesh (boxGeometry, material)

            box.position.x = (Math.random() -0.5) * 40
            box.position.y = (Math.random() -0.5) * 40
            box.position.z = (Math.random() -0.5) * 40

            box.rotation.x = Math.random() * Math.PI
            box.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            box.scale.set(scale,scale,scale)
            scene.add(box)
        }

        for(let i=0; i < 1000; i++)
        {
            const sphere = new THREE.Mesh (sphereGeometry, material)

            sphere.position.x = (Math.random() -0.5) * 40
            sphere.position.y = (Math.random() -0.5) * 40
            sphere.position.z = (Math.random() -0.5) * 40

            const scale = Math.random()
            sphere.scale.set(scale,scale,scale)
            scene.add(sphere)
        }
    }
)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 60
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()


let animateCamera = true; // Flag to control the animation

const tick = () => {
    // Update controls
    controls.update();

    // Animate camera position with easing towards the end
    if (camera.position.z > 3 && animateCamera) {
        // Implement easing here, for example:
        // Decrease z position by a smaller amount as it gets closer to 1
        let step = (camera.position.z - 3) * 0.04;
        camera.position.z -= Math.max(step, 0.001);
    } else if (animateCamera) {
        camera.position.z = 3; // Ensure it doesn't go below 1
        animateCamera = false; // Stop the animation
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();



