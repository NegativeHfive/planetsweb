import "../src/index.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";

const scene = new THREE.Scene()


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.outerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(15,32,16)
const material = new THREE.MeshBasicMaterial({color : "red"})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

//making camera
const fov = 50
const aspect = window.innerWidth / window.outerHeight
const near = 0.1
const far = 700

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z = 100;

function animate(){
    renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)