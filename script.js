import * as THREE from 'three';

const canvas= document.querySelector('canvas.webgl')

const scene = new THREE.Scene(); // scene

// Mesh = Object in Three js
// Mesh = Geometry + Material

const geometry = new THREE.BoxGeometry(1, 1, 1); // geometry 
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 ,wireframe: true}); // material
const mesh= new THREE.Mesh(geometry,material)
mesh.position.z=1
scene.add(mesh)

const axesHelper = new THREE.AxesHelper(3)

scene.add(axesHelper)
mesh.scale.set(2,0.5,0.5) 
mesh.rotation.reorder('YXZ')
mesh.rotation.y=Math.PI * 0.25
mesh.rotation.x=Math.PI * 0.25 


// Camera
// One type of camera is PerspectiveCamera, two parameters main
// Field of View and aspect ratio

const sizes = {
    width: 800,
    height: 600
}

const camera= new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z= 3
camera.lookAt(mesh.position)

// Renderer- it renders the scene from the camera prespective, draws it on canvas
// We are going to use WEBGL renderer
const renderer= new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)
