import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Sizes
const sizes = {
    width: 800,
    height: 600
}

const cursor = {
    X: 0,
    Y:0 ,
}
// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1,3,3,3),
    new THREE.MeshBasicMaterial({ color: 0xff0000 , wireframe:true})
)

scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2


scene.add(camera)

//Orbit Controls

const orbitControls = new OrbitControls(camera,canvas)
orbitControls.target.x=0
orbitControls.enableDamping= true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)




const tick = () =>
{   
    
    orbitControls.update()
    // Render   
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()