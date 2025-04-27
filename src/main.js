import "../src/index.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import getStarfield from './getStarfield';
import gsap from "gsap";

// html texts
const planetName = document.querySelector(".planetname");
const information = document.querySelector(".information");
const distanceFromEarthKm = document.querySelector(".distanceKm");
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

// saturn planet
// Saturn planet
const saturnGroup = new THREE.Group();
saturnGroup.position.x = 40;
saturnGroup.rotation.z = -10.756 * Math.PI / 140;
scene.add(saturnGroup);

const saturnGeometry = new THREE.IcosahedronGeometry(1, 20);
const saturnMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/saturn.jpg"),
});

const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturnGroup.add(saturnMesh);

// Saturn ring
const saturnRingGeometry = new THREE.RingGeometry(1.2, 1.4, 100);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/saturnring.jpg"),
  side: THREE.DoubleSide, 
});

const saturnRingMesh = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRingMesh.rotation.x = Math.PI / -2; 
saturnRingMesh.position.y = 0;
saturnRingMesh.position.z = 0;
saturnGroup.add(saturnRingMesh);


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
  jupiterMesh.rotation.x += 0.001;

  renderer.render(scene, camera);
}

function animateSaturn() {
  requestAnimationFrame(animateSaturn);
  saturnGroup.rotation.y += 0.0005;

  renderer.render(scene, camera);
}


// the function for the next button for moving to next planets
nextButton.addEventListener("click",()=>{

  if (planetName.innerHTML === "Mars") {
    // testing if it works
    console.log("The current planet is Mars");

    //text for neptune
    planetName.innerHTML = "Neptune";
    information.innerHTML =
      "Neptune is the eighth planet from the Sun. It is known for its deep blue color and strong winds.";
    distanceFromEarthKm.innerHTML = "4.3B km";
    nextPlanetText.innerHTML = "NEXT PLANET IS JUPITER";
    element.innerHTML = "He";
    planetName.style.color = "rgb(12, 40, 130)";
    nextButton.style.backgroundColor = "rgb(12, 40, 130)";

    //animating mars moving out of the view
    gsap.to(marsGroup.position, {
      x: 0,
      y: 0,
      z: 40,
      duration: 5,
      ease: "power3.inOut",
    });

    //bringin neptune to the front
    gsap.to(neptuneGroup.position, {
      x: 0,
      y: 0,
      z: 3,
      duration: 5,
      ease: "power3.inOut",
      onComplete: () => {
        animateNeptune();
      },
    });
  }

  //jupiter
  else if (planetName.innerHTML === "Neptune") {
    // testing if it works
    console.log("The current planet is Mars");

    //text for neptune
    planetName.innerHTML = "Jupiter";
    information.innerHTML =
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than 2.5 times";
    distanceFromEarthKm.innerHTML = "484m km";
    nextPlanetText.innerHTML = "NEXT PLANET IS SATURN";
    element.innerHTML = "H2";
    planetName.style.color = "rgb(245, 213, 159)";
    nextButton.style.backgroundColor = "rgb(245, 213, 159)";

    //animating mars moving out of the view
    gsap.to(neptuneGroup.position, {
      x: 0,
      y: 0,
      z: 40,
      duration: 5,
      ease: "power3.inOut",
    });

    //bringin neptune to the front
    gsap.to(jupiterGroup.position, {
      x: 0,
      y: 0,
      z: 3,
      duration: 5,
      ease: "power3.inOut",
      onComplete: () => {
        animateJupiter();
      },
    });
  }

  //saturn
  else if (planetName.innerHTML === "Jupiter") {
    // testing if it works
    console.log("The current planet is Jupiter");

    //text for neptune
    planetName.innerHTML = "Saturn";
    information.innerHTML =
      "Saturn is the sixth planet from the Sun and the second largest planet in our solar system";
    distanceFromEarthKm.innerHTML = "1,434m km";
    nextPlanetText.innerHTML = "NEXT PLANET IS MOON";
    element.innerHTML = "H";
    planetName.style.color = "rgb(214, 201, 179)";
    nextButton.style.backgroundColor = "rgb(214, 201, 179)";

    //animating mars moving out of the view
    gsap.to(jupiterGroup.position, {
      x: 0,
      y: 0,
      z: 100,
      duration: 5,
      ease: "power3.inOut",
    });

    //bringin neptune to the front
    gsap.to(saturnGroup.position, {
      x: 0,
      y: 0,
      z: 3,
      duration: 5,
      ease: "power3.inOut",
      onComplete: () => {
        animateSaturn();
      },
    });
  }


})

