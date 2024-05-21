import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import GUI from 'lil-gui'


/**
 * Stats
 */
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)


/**
 * Variables
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


/**
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl')


/**
 * Scene
 */
const scene = new THREE.Scene()


/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


/**
 * Debug UI
 */
const gui = new GUI()
const debugObjects = { scale: 1 }

gui.add(debugObjects, 'scale').min(1).max(3).step(0.1).onChange((value) => {
    mesh.scale.set(value, value, value)
})


/**
 * Event Listener
 */
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)


/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('ivory')


/**
 * Animation
 */
const clock = new THREE.Clock()

const animate = () => {
    stats.begin()

    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)

    stats.end()
}

animate()
