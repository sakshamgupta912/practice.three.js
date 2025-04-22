import * as THREE from 'three'

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
window.addEventListener('mousemove',(e)=>{
    cursor.X= e.clientX/sizes.width -0.5;
    cursor.Y= -(e.clientY/sizes.height -0.5);
    console.log(cursor.X,cursor.Y)
})
// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2


scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate


const tick = () =>
{   
    camera.position.x=Math.sin(cursor.X*Math.PI*2)*3
    camera.position.z=Math.cos(cursor.X*Math.PI*2)*3
    camera.position.y=cursor.Y*5
    camera.lookAt(mesh.position)
    // Render   
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()