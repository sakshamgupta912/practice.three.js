import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Window Resize Handle
window.addEventListener("resize",(e)=>{
    sizes.width= window.innerWidth;
    sizes.height= window.innerHeight;

    //Update Camera
    camera.aspect=sizes.width / sizes.height;
    camera.updateProjectionMatrix()

    //Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
})

//Full Screen Code
window.addEventListener("dblclick",(e)=>{
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement ;
    if(!fullScreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
        
        console.log("Go to full screen")
    }
    else
    {
        if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
            else if (document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen()
            }
    }
})

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1,3,3,3),
    new THREE.MeshBasicMaterial({ color: 0xff0000 , wireframe:false})
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