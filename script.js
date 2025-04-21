import * as THREE from 'three';

const canvas= document.querySelector('canvas.webgl')

const scene = new THREE.Scene(); // scene
scene.add(new THREE.AxesHelper(2))

// Mesh = Object in Three js
// Mesh = Geometry + Material

const group = new THREE.Group()
const cube1 = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ),new THREE.MeshBasicMaterial( {color: 0xFF0000} ))
const cube2 = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ),new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ))
cube2.position.x= -2
const cube3 = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ),new THREE.MeshBasicMaterial( {color: 0x00ff00} ))
cube3.position.x= 2
group.add(cube1,cube2,cube3);
scene.add(group)



group.rotation.y=10
// Camera
// One type of camera is PerspectiveCamera, two parameters main
// Field of View and aspect ratio

const sizes = {
    width: 800,
    height: 600
}

const camera= new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z= 5
camera.lookAt(group.position)

// Renderer- it renders the scene from the camera prespective, draws it on canvas
// We are going to use WEBGL renderer
const renderer= new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width,sizes.height)

var clock = new THREE.Clock()
const tick = ()=>{

    var deltaTime = clock.getElapsedTime()
    console.log(deltaTime)
    camera.position.x=Math.sin(deltaTime * Math.PI )
    camera.position.y=Math.cos(deltaTime * Math.PI )
    camera.lookAt(group.position)
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
   
}


tick()
