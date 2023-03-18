//Container to eliminate Globals
var adi = adi || {};
adi.mInstance = adi.mInstance || {};
//-----------------------------
var clock = new THREE.Clock();
var textureLoader = new THREE.TextureLoader();
//-----------------------------
initThree();
animate();
onDocumentMouseDown();

adi.mInstance.camera;
adi.mInstance.scene;
adi.mInstance.render;
adi.mInstance.raycaster;
adi.mInstance.transformControll;
//
adi.mInstance.mainmesh;
adi.mInstance.floor;
//
adi.mInstance.frametime;
//
adi.mInstance.groundGeometry;
adi.mInstance.groundMaterial;
//
adi.mInstance.hoverElementInfo;
adi.mInstance.meshOption;
adi.mInstance.addMesh = false;
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
const shapeOptions = async (event) => {
    let pds = document.getElementById('optionId');
    if (pds) {
        adi.mInstance.meshOption = pds.options[pds.selectedIndex].text; 
    }
}
//---------------------------------------------------------------------------------
const addButtonPress = async (event) => {
    adi.mInstance.addMesh = true;
}
//---------------------------------------------------------------------------------
const openNav = async(event) => { 
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("mySidepanel").style.paddingLeft = "20px";
    document.getElementById("mySidepanel").style.paddingBottom = "100px";
}
//---------------------------------------------------------------------------------
const closeNav = async(event) => {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("mySidepanel").style.paddingLeft = "0px";
    document.getElementById("mySidepanel").style.paddingBottom = "0px";
}
//---------------------------------------------------------------------------------
//Toogle focus based on Element detection 
//Note : non optimal, looses focus intermittently
//---------------------------------------------------------------------------------
function elementFocusToggle() {
    document.addEventListener('mousemove', function (e) {
        if (e != null && e.target != null) {//Scan elements under mouse cursor.
            adi.mInstance.hoverElementInfo = { element: e.target, posX: e.clientX, posY: e.clientY }
            let ele = document.getElementsByClassName(adi.mInstance.hoverElementInfo.element.parentElement.className);
            adi.mInstance.hoverElementInfo = { element: e.target, parent: ele, posX: e.clientX, posY: e.clientY }
            // console.log(adi.mInstance.hoverElementInfo);
        }    
    },false);
}
//---------------------------------------------------------------------------------
// 
//---------------------------------------------------------------------------------
async function onDocumentMouseDown (event) {
    if(event){
        //Hack to allow for correct focus on overlaying Canvas and other Elements
        //will toggle the z index for the canvas based on where the mouse position is.
        let we = document.getElementById("Webgl_CSS_canvas");
        if(we && adi.mInstance.hoverElementInfo.element.id == "body") {
            we.style.zIndex = 0;
        }
        else if(we && we.style.zIndex == 0) {
            we.style.zIndex = -1;
        }

    //------
        var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
                                        -( event.clientY / window.innerHeight ) * 2 + 1,  
                                        0.5 );     
                                    
            adi.mInstance.raycaster.setFromCamera( mouse3D.clone(), adi.mInstance.camera );
            var intersects = adi.mInstance.raycaster.intersectObjects( adi.mInstance.scene.children );
    
            if ( intersects.length > 0 ) {
                intersects[0].object.material.color.setHex( Math.random() * 0xffffff );
                adi.mInstance.transformControll.attach(intersects[0].object);
            }
    }
}
//---------------------------------------------------------------------------------
function activateMouse() {
    document.addEventListener( 'mousedown', onDocumentMouseDown );
}
//---------------------------------------------------------------------------------
//Init the Three.js context.
//---------------------------------------------------------------------------------
function initThree() //Start
{   
    elementFocusToggle();
    activateMouse();
    //Rendering Context
    adi.mInstance.render = new THREE.WebGLRenderer({
        alpha: true
    });
     //Scene
    adi.mInstance.scene = new THREE.Scene();
    //adi.mInstance.render.setPixelRatio(window.devicePixelRatio);
    adi.mInstance.render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(adi.mInstance.render.domElement);
    adi.mInstance.render.domElement.id = "Webgl_CSS_canvas";   
    //Camera
    adi.mInstance.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);   
    //Raycaster
    adi.mInstance.raycaster = new THREE.Raycaster(); 
    //Controls
    const orbit = new THREE.OrbitControls(adi.mInstance.camera, adi.mInstance.render.domElement);
    orbit.update();
    orbit.addEventListener( 'change', adi.mInstance.render );
    //
    adi.mInstance.camera.position.set(5, 5, 220);    
    //
    adi.mInstance.transformControll = new THREE.TransformControls(adi.mInstance.camera,adi.mInstance.render.domElement );
    adi.mInstance.transformControll.addEventListener( 'change',  adi.mInstance.render );
    adi.mInstance.transformControll.addEventListener( 'dragging-changed', function ( event ) {
        orbit.enabled = ! event.value;
    });
    adi.mInstance.scene.add(adi.mInstance.transformControll);
    
    // GROUND
    adi.mInstance.scene.add( new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) );
}
//--------------------------------------
function animate() //Update loop
{
    if(adi.mInstance.meshOption == "Sphere" && adi.mInstance.addMesh){
        
        let radius = 10;
        let bwidthSegments = 10; 
        let bheightSegments = 10; 
            adi.mInstance.mainmesh = new THREE.Mesh(new THREE.SphereGeometry( radius, bwidthSegments, bheightSegments),
            new THREE.MeshBasicMaterial({
                color: 'rgb(0.5,0.5,0.5)',
                wireframe: true,
            }));
            
            // adi.mInstance.mainmesh.materials[0].transparent = true;
            // adi.mInstance.mainmesh.material[0].opacity = 1;
            
            adi.mInstance.scene.add(adi.mInstance.mainmesh);
    }

    if(adi.mInstance.meshOption  == "Cube" && adi.mInstance.addMesh){
        let bwidth = 10;
        let bheight = 10; 
        let bdepth = 10; 
        let bwidthSegments = 5;
        let bheightSegments= 5;
        let bdepthSegments = 5;
        adi.mInstance.mainmesh = new THREE.Mesh(new THREE.BoxGeometry( bwidth, bheight, bdepth, bwidthSegments, bheightSegments, bdepthSegments),
        new THREE.MeshBasicMaterial({
            color: 'rgb(0.5,0.5,0.5)',
            wireframe: true,
        }));

        // adi.mInstance.mainmesh.materials[0].transparent = true;
        // adi.mInstance.mainmesh.material[0].opacity = 1;
        adi.mInstance.scene.add(adi.mInstance.mainmesh);
   }
   adi.mInstance.addMesh = false;

    requestAnimationFrame(animate);
    adi.mInstance.frametime = clock.getDelta();
    let time = clock.getElapsedTime();
    let elapsed = clock.getElapsedTime();

    adi.mInstance.render.render(adi.mInstance.scene, adi.mInstance.camera);
}