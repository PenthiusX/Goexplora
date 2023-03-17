//Container to eliminate Globals
var adi = adi || {};
adi.mInstance = adi.mInstance || {};
//-----------------------------
var clock = new THREE.Clock();
var textureLoader = new THREE.TextureLoader();

init();
animate();

adi.mInstance.camera;
adi.mInstance.scene;
adi.mInstance.render;
adi.mInstance.sphere;
adi.mInstance.floor;
adi.mInstance.background;

adi.mInstance.frametime;

adi.mInstance.groundGeometry;
adi.mInstance.groundMaterial;

function init() //Start
{
    //
    adi.mInstance.render = new THREE.WebGLRenderer({
        alpha: true
    });
    //adi.mInstance.render.setPixelRatio(window.devicePixelRatio);
    adi.mInstance.render.setSize(window.innerWidth, window.innerHeight);
    //adi.mInstance.render.setSize(400, 400);
    document.body.appendChild(adi.mInstance.render.domElement);
    adi.mInstance.render.domElement.id = "Webgl_CSS_canvas";
    //
    adi.mInstance.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    adi.mInstance.camera.position.set(5, 5, 220);
    //
    adi.mInstance.scene = new THREE.Scene();
    //
    // GROUND
    adi.mInstance.groundGeometry = new THREE.BoxBufferGeometry(150, 0.01, 150);
    adi.mInstance.groundMaterial = new THREE.MeshBasicMaterial({
        color: 'rgb(200,200,200)',
        wireframe: true
    });
    adi.mInstance.floor = new THREE.Mesh(adi.mInstance.groundGeometry, adi.mInstance.groundMaterial );
    adi.mInstance.floor.position.y = -50.0;
    adi.mInstance.scene.add(adi.mInstance.floor);
    // Background
    let material = new THREE.MeshPhongMaterial( );
	let object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 4, 4 ), material );
				object.position.set( - 300, 0, 0 );
                adi.mInstance.scene.add( object );
    adi.mInstance.scene.add(adi.mInstance.sphere);
       //Scene Objects
       adi.mInstance.sphere = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 100, 20),
       new THREE.MeshBasicMaterial({
           color: 'rgb(0,0,0)',
           wireframe: true
       }));
   adi.mInstance.scene.add(adi.mInstance.sphere);
}



function twist(geometry) {
    const quaternion = new THREE.Quaternion();
  
    for (let i = 0; i < geometry.attributes.position.array.length; i = i + 3) {
      // a single vertex Y position
      let p = new THREE.Vector3(geometry.attributes.position.array[i],geometry.attributes.position.array[i+1],geometry.attributes.position.array[i+2]);

      const yPos = p.y;
      const twistAmount = 10;
      const upVec = new THREE.Vector3(0, 1, 0);
  
      quaternion.setFromAxisAngle(
        upVec, 
        (Math.PI / 180) * (yPos / twistAmount)
      );
        
       p = p.applyQuaternion(quaternion);
       geometry.attributes.position.array[i] = p.x;
       geometry.attributes.position.array[i+1] = p.y;
       geometry.attributes.position.array[i+2] = p.z;
    }

    // tells Three.js to re-render this mesh
    geometry.verticesNeedUpdate = true;
  }

  adi.mInstance.counter = 0;
function animate() //Update loop
{
    requestAnimationFrame(animate);
    frametime = clock.getDelta();
    let time = clock.getElapsedTime();

    adi.mInstance.groundGeometry.attributes.position.needsUpdate = true

    // adi.mInstance.counter += 0.01;
    // adi.mInstance.groundGeometry.attributes.position.array[0] = Math.sin(adi.mInstance.counter) * 2.5;
    // adi.mInstance.groundGeometry.attributes.position.array[1] = Math.sin(adi.mInstance.counter) * 2.5;
    // adi.mInstance.groundGeometry.attributes.position.array[2] = Math.sin(adi.mInstance.counter) * 2.5;
    twist(adi.mInstance.groundGeometry);
    adi.mInstance.floor = new THREE.Mesh(adi.mInstance.groundGeometry, adi.mInstance.groundMaterial);
    console.log(adi.mInstance.groundGeometry.attributes.position.array[0],adi.mInstance.groundGeometry.attributes.position.array[1],adi.mInstance.groundGeometry.attributes.position.array[2]);
 
    // adi.mInstance.sphere.rotation.x += (Math.sin(time) * 3) * frametime;
    // adi.mInstance.sphere.rotation.y += (Math.sin(time) * 3) * frametime;
    // adi.mInstance.sphere.position.y = Math.abs(Math.sin(time) * 15);

    // adi.mInstance.floor.rotation.y += 1.0 * frametime;

    let elapsed = clock.getElapsedTime();
    adi.mInstance.render.render(adi.mInstance.scene, adi.mInstance.camera);
}