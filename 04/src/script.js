import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 * 
 * 
 * 
 * 
 */

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)
cube1.rotation.y = Math.PI * 0.1
cube1.rotation.x = Math.PI * - 0.1



group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'skyblue' })
)


cube2.position.x = -1.5;
cube2.scale.set(1.2, 1.2, 1.2)
cube2.rotation.x = Math.PI * 0.1

group.add(cube2);


const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'fuchsia'})
)

cube3.position.x = 1.5;
cube3.scale.set(0.7, 0.7, 0.7)
cube3.rotation.y = Math.PI * 0.25

group.add(cube3);

group.rotation.z = Math.PI * 0.2


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3


scene.add(camera)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)