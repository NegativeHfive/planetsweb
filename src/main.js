import "../src/index.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import getStarfield from './getStarfield';

// html texts
const planetName = document.querySelector(".planetname");
const information = document.querySelector(".information");
const distanceFromEarthKm = document.querySelector("distanceKm");
const nextPlanetText = document.querySelector(".nextplanettext");
const atmosphere = document.querySelector(".atmosphere");
const element = document.querySelector(".element")

const nextButton = document.querySelector(".nextbutton");

//making a scene
const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

//making camera
const fov = 45
const aspect = window.innerWidth / window.outerHeight
const near = 0.1
const far = 700

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z = 7.3;

//making a loader
const loader = new THREE.TextureLoader()

//mesh for mars
const marsGroup = new THREE.Group()
marsGroup.position.set(0,0,3) //3
scene.add(marsGroup)

//making the geometry for the mars 
const marsGeometry = new THREE.IcosahedronGeometry(1,20)
const marsTexture = loader.load("/textures/8k_mars.jpg")
const marsMaterial = new THREE.MeshBasicMaterial({
  map: marsTexture,
  color: "rgb(239, 179, 142)",
});

//increasing the sharpness
marsTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const marsMesh = new THREE.Mesh(marsGeometry,marsMaterial);
marsGroup.add(marsMesh)


//neptune
const neptuneGroup = new THREE.Group()
neptuneGroup.position.set(0,0,-20)//-20
scene.add(neptuneGroup)

const neptuneGeometry = new THREE.IcosahedronGeometry(1,20)
const neptuneTexture = loader.load("/textures/2k_neptune.jpg");
const neptuneMaterial = new THREE.MeshBasicMaterial({
  map: neptuneTexture,
  color: "rgb(12, 40, 130)",
});

const neptuneMesh = new THREE.Mesh(neptuneGeometry,neptuneMaterial);
neptuneGroup.add(neptuneMesh)

// jupiter planet
const jupiterGroup = new THREE.Group()
jupiterGroup.position.set(0,0,-40)//-40
scene.add(jupiterGroup)

const jupiterGeometry = new THREE.IcosahedronGeometry(1,20)
const jupiterTexture = loader.load("/textures/jupiter.jpg");
const jupiterMaterial = new THREE.MeshBasicMaterial({
  map: jupiterTexture,
  color: "rgb(245, 213, 159)",
});

const jupiterMesh = new THREE.Mesh(jupiterGeometry,jupiterMaterial);
jupiterGroup.add(jupiterMesh)


//getting the stars
const stars = getStarfield({numStars:1000});
scene.add(stars)

function animateMars() {
  requestAnimationFrame(animateMars);
  marsGroup.rotation.y += 0.001;
  //neptuneMesh.rotation.y += 0.007;

  renderer.render(scene, camera);
}

animateMars();

//function for neptune
function animateNeptune() {
  requestAnimationFrame(animateNeptune);
  neptuneMesh.rotation.y += 0.007;

  renderer.render(scene, camera);
}


// function for jupiter
function animateJupiter(){
  requestAnimationFrame(animateJupiter);
  jupiterMesh.rotation.y += 0.001;

  renderer.render(scene, camera);
}


// the function for the next button for moving to next planets

