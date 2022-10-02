import './style.css'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBAFormat } from 'three'
import * as dat from 'dat.gui';

// lets
let moveCoord;
let planetRadius, curRadius;

// adding dat.gui
const gui = new dat.GUI();
const variable = {
    radius: {
        radius: 10
    }
}


// making initials

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer()
const raycaster = new THREE.Raycaster()
const mouse = {
    // mouse
    x: undefined,
    y: undefined
}
// movement along x and y axis


//[x,y]
moveCoord = { x: 0, y: 0 }
//  radii 

planetRadius = 10
curRadius = planetRadius + 7



renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)








// Setting our plane
let planeGeometry = new THREE.PlaneGeometry(300, 300, 30, 30)
const wireFrameGeometry = new THREE.WireframeGeometry(planeGeometry)
const wireFrameMat = new THREE.LineBasicMaterial(

    {

        vertexColors: true,
        side: THREE.DoubleSide
    }
);

const plane = new THREE.Line(planeGeometry, wireFrameMat)


// lights
const light = new THREE.DirectionalLight(0xffffee, 1)
light.position.set(1, 1, 1)
const backLight = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-1, -10, 0)

const generateColor = function (thing) {
    // setting colors
    const colors = []
    for (let i = 0; i < thing.geometry.attributes.position.count; i++) {
        colors.push(0, 0.19, 0.4)
    }
    thing.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3))
    bend.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3))
}

// texture load 
const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpeg')
const planetTexture = new THREE.TextureLoader().load('./assets/earth.jpeg')


const changeRadius = () => {
    sphere.geometry.dispose()
    bend.geometry.dispose()

    sphere.geometry = new THREE.SphereGeometry(variable.radius.radius)

    const geometry = new THREE.SphereGeometry(variable.radius.radius + 7, 32, 15, 0, 6.283185307179586, 4.81291994529956, 2.19283167220568);
    bend.geometry = new THREE.WireframeGeometry(geometry)
    generateColor(plane)
    generateColor(bend)


}
scene.background = spaceTexture
camera.position.z = 50



//  making planet 🌎
const sphericalGeometry = new THREE.SphereGeometry(planetRadius)
const sphericalMesh = new THREE.MeshStandardMaterial({ map: planetTexture, color: 0xffffff })
const sphere = new THREE.Mesh(sphericalGeometry, sphericalMesh)
sphere.position.set(moveCoord.x, moveCoord.y, 10)

// making curve ➰
const geometry = new THREE.SphereGeometry(curRadius, 32, 15, 0, 6.28, 4.81, 2.19);
const curveWireFrameGeometry = new THREE.WireframeGeometry(geometry)
const curWireFrameMat = new THREE.LineBasicMaterial(
    {
        vertexColors: true
    }
);

const bend = new THREE.Line(curveWireFrameGeometry, curWireFrameMat)

bend.position.set(moveCoord.x, moveCoord.y, 2)
bend.rotateX(-1.55)


generateColor(plane)
// generateColor(bend)
gui.add(variable.radius, "radius", 1, 100).onChange(changeRadius)

const move = function (e) {
    const speedFactor = 5





    if (e.key === "ArrowUp") {
        moveCoord.y += speedFactor

        console.log("^ key is pressed")
    } if (e.key === "ArrowRight") {
        moveCoord.x += speedFactor

        console.log("▶ key is pressed")

    }
    if (e.key === "ArrowDown") {
        moveCoord.y -= speedFactor

        console.log("🔽 key is pressed")
    } if (e.key === "ArrowLeft") {
        moveCoord.x -= speedFactor

        console.log("◀ key is pressed")

    }


    if (moveCoord.y === planeGeometry.parameters.height) {
        console.log("limit has reached")

        moveCoord.y = -planeGeometry.parameters.height
    }

    if (moveCoord.x === planeGeometry.parameters.width) {
        console.log("limit has reached")

        moveCoord.x = -planeGeometry.parameters.width
    }
    sphere.position.set(moveCoord.x, moveCoord.y, 10)
    bend.position.set(moveCoord.x, moveCoord.y, 2)


}

scene.add(plane)
scene.add(light)

scene.add(backLight)
scene.add(sphere)
scene.add(bend);
console.log({ scene })

renderer.render(scene, camera)
// animation
let frame = 0
function animate() {
    requestAnimationFrame(animate)
    frame += 0.01


    renderer.render(scene, camera);
}
addEventListener("keydown", move)
animate()
addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1


})
