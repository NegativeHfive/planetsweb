import "../src/index.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

//making camera
const fov = 50
const aspect = window.innerWidth / window.outerHeight
const near = 0.1
const far = 700

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z = 10;

//making a loader
const loader = new THREE.TextureLoader()

//mesh for mars
const marsGroup = new THREE.Group()
marsGroup.position.set(0,0,4)
scene.add(marsGroup)

//making the geometry for the mars 
const marsGeometry = new THREE.IcosahedronGeometry(1,20)
const marsTexture = loader.load("/public/textures/mars.jpg")
const marsMaterial = new THREE.MeshBasicMaterial({
    map:marsTexture,
    color : "orange"
})

//increasing the sharpness
marsTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const marsMesh = new THREE.Mesh(marsGeometry,marsMaterial);
marsGroup.add(marsMesh)

function animate(){
    requestAnimationFrame(animate)
    marsGroup.rotation.y += 0.001;
    renderer.render(scene,camera)
}

animate()