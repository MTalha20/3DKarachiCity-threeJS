import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();

const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

// Orbit for camera movement


const orbit = new OrbitControls(cam, renderer.domElement);

cam.position.z = 5
cam.position.y = 2
cam.position.x = -5
orbit.update()


// Light From Infinite Distance


const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);


// Geometry for surface of city


const surfaceGeo = new THREE.PlaneGeometry(12, 6);
const surfaceMesh = new THREE.MeshBasicMaterial({ color: 0xede9e8, side: THREE.DoubleSide });;
scene.add(cam);

const surface = new THREE.Mesh(surfaceGeo, surfaceMesh);
surface.rotation.x = -11
surface.receiveShadow = true;
scene.add(surface)


// Geometry roundabout


const roundaboutGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 20, 15, 15);
const roundaboutMesh = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xF3E5AB
});
const roundabout = new THREE.Mesh(roundaboutGeo, roundaboutMesh);
roundabout.position.y = 0.25
roundabout.position.x = 0.5
scene.add(roundabout);


// Geometry sphere


const sphereGeo = new THREE.SphereGeometry(0.35, 32, 16);
const sphereMesh = new THREE.MeshBasicMaterial({ color: 0xF3E5AB, wireframe: true });
const sphere = new THREE.Mesh(sphereGeo, sphereMesh);
sphere.position.x = 0.5
sphere.position.y = 0.85
scene.add(sphere);


// Texture Roads


var roads = [];
var rx = -5.5;
var ry = 0.01;
var rz = -0.5;
var rz2 = 2.5
var rx2 = 0;

let roadLoader = new THREE.TextureLoader();
roadLoader.load("road.jpg", function (texture) {
    const roadGeo = new THREE.PlaneGeometry(1, 1);
    const roadMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0x808076,
        map: texture,
        transparent: true
    });

    for (let i = 0; i < 25; i++) {
        const road1 = new THREE.Mesh(roadGeo, roadMesh);
        if (i < 12) {
            road1.rotation.x = -1.572;
            road1.position.x = rx
            road1.position.z = rz
            road1.position.y = ry;
            roads.push(road1);
            rx += 1;
        }
        else if (i == 12) {
            rx = -5.5
            rz = 0.5;
        }
        else if (i >= 12) {
            console.log(rx)
            road1.rotation.x = -1.572;
            road1.position.x = rx
            road1.position.z = rz
            road1.position.y = ry;
            roads.push(road1);
            rx += 1;
        }
    }

    for (let i = 0; i < 12; i++) {
        const road1 = new THREE.Mesh(roadGeo, roadMesh);
        road1.position.x = rx2;
        road1.rotation.x = -1.572;
        road1.position.y = 0.02;
        road1.position.z = rz2
        // road1.rotation.y = -1;
        roads.push(road1);
        rz2 -= 1
        if (i == 5) {
            rx2 += 1
            rz2 = 2.5
        }

    }
});


// Texture roadbroken


var brz = 0;
var brokenroad = [];

let bRoadLoader = new THREE.TextureLoader();
bRoadLoader.load("brokenroad.jpg", function (texture) {
    const bRoadGeo = new THREE.PlaneGeometry(2, 2);
    const bRoadMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        color: 0x808076,
        transparent: true
    });

    const bRoad = new THREE.Mesh(bRoadGeo, bRoadMesh);
    bRoad.position.x = -3
    bRoad.position.y = 0.02;
    bRoad.position.z = brz
    bRoad.rotation.x = -1.572
    brokenroad.push(bRoad);

});


// Texture roadbroken 2


var brz2 = 0;
var brx2 = 2.75;

let bRoadLoader2 = new THREE.TextureLoader();
bRoadLoader2.load("brokenroad2.jpg", function (texture) {
    const bRoadGeo = new THREE.PlaneGeometry(2, 2);
    const bRoadMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        color: 0x0808076,
        transparent: true
    });

    for (let i = 0; i < 1; i++) {
        const bRoad = new THREE.Mesh(bRoadGeo, bRoadMesh);
        bRoad.rotation.x = -1.572
        bRoad.position.x = brx2
        bRoad.position.y = 0.02
        bRoad.position.z = brz2
        brx2 += 1;
        if (i == 1) {
            brx2 = 2.75
            brz2 = 0.5
        }
        brokenroad.push(bRoad);
    }
})


// Texture Main wall 


var walls = ["wall1.jpg", "wall3.jpg", "wall2.jpg"];


let Mwall = new THREE.TextureLoader();
Mwall.load("wall.jpg", function (texture) {
    const wallGeo = new THREE.BoxGeometry(0.125, 0.5, 4);
    const wallMesh = new THREE.MeshBasicMaterial({
        // side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });

    const wall = new THREE.Mesh(wallGeo, wallMesh);
    scene.add(wall)

    wall.position.x = -4
    wall.position.y = 0.25
    wall.position.z = -1.5
    wall.rotation.y = 1.6
    // wall.rotation.z = -1 
    scene.add(wall);
});


// Texture Wall Chalikng 1


let wall1 = new THREE.TextureLoader();
wall1.load(walls[0], function (texture) {
    const wallGeo = new THREE.PlaneGeometry(1.2, 0.5);
    const wallMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });

    const wall = new THREE.Mesh(wallGeo, wallMesh);
    scene.add(wall)

    wall.position.y = 0.25;
    wall.position.z = -1.38
    wall.position.x = -5.4
    wall.rotation.y = 0.03
});


// Texture Wall Chalikng 2


let wall3 = new THREE.TextureLoader();
wall3.load(walls[1], function (texture) {
    const wallGeo = new THREE.PlaneGeometry(1.2, 0.5);
    const wallMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });

    const wall = new THREE.Mesh(wallGeo, wallMesh);
    scene.add(wall)

    wall.position.y = 0.25;
    wall.position.z = -1.38
    wall.position.x = -4.4
    wall.rotation.y = 0.03
});


// Texture Wall Chalikng 3


let wall2 = new THREE.TextureLoader();
wall2.load(walls[2], function (texture) {
    const wallGeo = new THREE.PlaneGeometry(1.2, 0.5);
    const wallMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });

    const wall = new THREE.Mesh(wallGeo, wallMesh);
    scene.add(wall)

    wall.position.y = 0.25;
    wall.position.x = -3.3
    wall.position.z = -1.42
    wall.rotation.y = 0.04


});


// Texture footpath


var rfx = -5.5;

let footpathLoader = new THREE.TextureLoader();
footpathLoader.load("wall.jpg", function (texture) {
    const footpathGeo = new THREE.BoxGeometry(1, 0.07, 0.4);
    const footpathMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });

    for (let i = 0; i < 4; i++) {
        const footpath = new THREE.Mesh(footpathGeo, footpathMesh);
        scene.add(footpath)

        footpath.position.y = 0.04;
        footpath.position.x = rfx
        footpath.position.z = -1.2
        rfx += 1

    }

});



// Texture grass


var rgz = 1.5;
var rgx = -5.5;

let grassLoader = new THREE.TextureLoader();
grassLoader.load("grass.jpg", function (texture) {
    const grassGeo = new THREE.PlaneGeometry(1, 1);
    const grassMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });
    for (let i = 0; i < 10; i++) {
        const grass = new THREE.Mesh(grassGeo, grassMesh);
        grass.rotation.x = -1.582;
        grass.position.x = rgx
        grass.position.z = rgz
        grass.position.y = 0.02
        scene.add(grass);
        rgz += 0.97;
        if (i == 1 || i == 3 || i == 5) {
            rgx += 1
            rgz = 1.5
        }
        else if (i == 7) {
            rgx += 1
            rgz = 1.5
        }
    }

});


// Texture roadside Boundary


var rgbz = 1.5;

let boundaryLoader = new THREE.TextureLoader();
boundaryLoader.load("boundary.jpg", function (texture) {
    const boundaryGeo = new THREE.PlaneGeometry(1, 1);
    const boundaryMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });

    for (let i = 0; i < 2; i++) {
        const boundary = new THREE.Mesh(boundaryGeo, boundaryMesh);
        boundary.rotation.x = -1.582;
        boundary.position.x = -0.9
        boundary.position.z = rgbz
        boundary.position.y = 0.03
        scene.add(boundary);
        rgbz += 1;
    }


});


// Texture Building


var rbx = -5.2;
var rrx = -5.2;  

let buildingLoader = new THREE.TextureLoader();
buildingLoader.load("building.jpg", function (texture) {
    const buildingGeo = new THREE.BoxGeometry(1, 1);
    const buildingMesh = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });

    var roofGeo = new THREE.PlaneBufferGeometry(1, 1);
    var roofMesh = new THREE.MeshBasicMaterial();


    for (let i = 0; i < 2; i++) {
        const building = new THREE.Mesh(buildingGeo, buildingMesh);
        building.position.x = rbx
        building.position.z = -2.3
        building.position.y = 0.5
        scene.add(building);
        rbx += 1.25


        // Geometry Builiding Roof 


        var roof = new THREE.Mesh(roofGeo, roofMesh);
        roof.position.x = rrx;
        roof.position.y = 1.02;
        roof.position.z = -2.3;
        roof.rotation.x = -1.58;
        scene.add(roof);
        rrx += 1.25;

    }


});


console.log(window.innerWidth)
console.log(window.innerHeight)


function animate(time) {
    roads.forEach(p => {
        scene.add(p);
    });
    brokenroad.forEach(p => {
        scene.add(p);
    })

    sphere.rotation.x = time / 3000;
    sphere.rotation.y = time / 3000;
    renderer.render(scene, cam);
}

renderer.setAnimationLoop(animate);


