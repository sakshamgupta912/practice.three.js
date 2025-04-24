import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

// Canvas
const canvas = document.querySelector('canvas.webgl')
const debugObject = {color: '#ffffff',segments: 2}
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


// Gerometry for single triangle

const geometry= new THREE.BoxGeometry(1,1,1,debugObject.segments,debugObject.segments,debugObject.segments)

// material

const material = new THREE.MeshBasicMaterial({ color: debugObject.color , wireframe:true})

// Object or Mesh for sqaure
const mesh = new THREE.Mesh(
    geometry,
    material
)

scene.add(mesh)

// Lil Gui

const gui = new GUI({
    width:500,
    closeFolders:true,
    title:'Debug UI'})

    
window.addEventListener('keydown',(e)=>{
    if(e.key == 'h')
        gui.show(gui._hidden)
})    
const cubeDebug = gui.addFolder('Cube');

//Range 
cubeDebug
    .add(mesh.position,'y')
    .min(2)
    .max(10)
    .step(1)
    .name('Elevation')
   
//Checkbox    
cubeDebug
    .add(mesh,'visible') 

cubeDebug
    .add(material,'wireframe') 

//Color    
cubeDebug
    .addColor(debugObject,'color')
    .onChange(()=>{
        material.color.set(debugObject.color)
    })

//Function or Button
debugObject.
    spin= ()=>{
        gsap.to(mesh.rotation,{y: mesh.rotation.y + Math.PI* 2 , duration:2})
    }
cubeDebug
    .add(debugObject,'spin')
    
// Update segments
cubeDebug
    .add(debugObject,'segments')
    .min(1)
    .max(100)
    .step(1)
    .onFinishChange(()=>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(1,1,1,debugObject.segments,debugObject.segments,debugObject.segments)

    })

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