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
updateSidePanelData();

adi.mInstance.camera;
adi.mInstance.scene;
adi.mInstance.render;
adi.mInstance.raycaster;
adi.mInstance.transformControll;
adi.mInstance.orbitControl;
//--------------------
adi.mInstance.mainmesh;
adi.mInstance.floor;
adi.mInstance.pickedMeshs;
//--------------------
adi.mInstance.frametime;
//--------------------
adi.mInstance.groundGeometry;
adi.mInstance.groundMaterial;
//--------------------
adi.mInstance.hoverElementInfo;
adi.mInstance.meshOption;
adi.mInstance.addMesh = false;
//--------------------
adi.mInstance.px;
adi.mInstance.py;
adi.mInstance.pz;

adi.mInstance.rx;
adi.mInstance.ry;
adi.mInstance.rz;

adi.mInstance.sx;
adi.mInstance.sy;
adi.mInstance.sz;

adi.mInstance.cx;
adi.mInstance.cy;
adi.mInstance.cz;
//----------------------------------------------------------
function updateSidePanelData(meshObject){
    if(meshObject){
        //pos
        var epx = document.getElementById("positionValX");
        var epy = document.getElementById("positionValY");
        var epz = document.getElementById("positionValZ");
        //rot
        var rpx = document.getElementById("rotValX");
        var rpy = document.getElementById("rotValY");
        var rpz = document.getElementById("rotValZ");
        //scale
        var spx = document.getElementById("scaleValX");
        var spy = document.getElementById("scaleValY");
        var spz = document.getElementById("scaleValZ");
        //color
        var cpx = document.getElementById("colorValX");
        var cpy = document.getElementById("colorValY");
        var cpz = document.getElementById("colorValZ");
    
        
        epx.value = meshObject.position.x;
        epy.value = meshObject.position.y;
        epz.value = meshObject.position.z

        rpx.value = meshObject.rotation.x;
        rpy.value = meshObject.rotation.y;
        rpz.value = meshObject.rotation.z;

        spx.value = meshObject.scale.x;
        spy.value = meshObject.scale.y;
        spz.value = meshObject.scale.z;

        cpx.value = meshObject.material.color.r;
        cpy.value = meshObject.material.color.g;
        cpz.value = meshObject.material.color.b;


   
        adi.mInstance.px = meshObject.position.x;
        adi.mInstance.py = meshObject.position.y;
        adi.mInstance.pz = meshObject.position.z;
    
        adi.mInstance.rx = meshObject.rotation.x;
        adi.mInstance.ry = meshObject.rotation.y;
        adi.mInstance.rz = meshObject.rotation.z;
    
        adi.mInstance.sx = meshObject.scale.x;
        adi.mInstance.sy = meshObject.scale.y;
        adi.mInstance.sz = meshObject.scale.z;

        adi.mInstance.cx = meshObject.material.color.r
        adi.mInstance.cy = meshObject.material.color.g
        adi.mInstance.cz = meshObject.material.color.b
    }
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
const px = async (event) =>{
    if(event){
        adi.mInstance.px = event.value;
        event.value = adi.mInstance.px;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.position.x = adi.mInstance.px;
        }
    }
}
const py = async (event) =>{
    if(event){
        adi.mInstance.py = event.value;
        event.value = adi.mInstance.py;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.position.y = adi.mInstance.py;
        }
    }
}
const pz = async (event) =>{
    if(event){
        adi.mInstance.pz = event.value;
        event.value = adi.mInstance.pz;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.position.z = adi.mInstance.pz;
        }
    }
}

//---------------------------------------------------------------------------------
const rx = async (event) =>{
    if(event){
        adi.mInstance.rx = event.value;
        event.value = adi.mInstance.rx;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.rotation.x = adi.mInstance.rx;
        }
    }
}
const ry = async (event) =>{
    if(event){
        adi.mInstance.ry = event.value;
        event.value = adi.mInstance.ry;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.rotation.y = adi.mInstance.ry;
        }
    }
}
const rz = async (event) =>{
    if(event){
        adi.mInstance.rz = event.value;
        event.value = adi.mInstance.rz;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.rotation.z = adi.mInstance.rz;
        }
    }
}
//---------------------------------------------------------------------------------
const sx = async (event) =>{
    if(event){
        adi.mInstance.sx = event.value;
        event.value = adi.mInstance.sx;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.scale.x = adi.mInstance.sx;
        }
    }
}
const sy = async (event) =>{
    if(event){
        adi.mInstance.sy = event.value;
        event.value = adi.mInstance.sy;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.scale.y = adi.mInstance.sy;
        }
    }
}
const sz = async (event) =>{
    if(event){
        adi.mInstance.sz = event.value;
        event.value = adi.mInstance.sz;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.scale.z = adi.mInstance.sz;
        }
    }
}
//---------------------------------------------------------------------------------
const cx = async (event) =>{
    if(event){
        adi.mInstance.cx = event.value;
        event.value = adi.mInstance.cx;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.material.color.r = adi.mInstance.cx;
        }
    }
}
const cy = async (event) =>{
    if(event){
        adi.mInstance.cy = event.value;
        event.value = adi.mInstance.cy;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.material.color.g = adi.mInstance.cy;
        }
    }
}
const cz = async (event) =>{
    if(event){
        adi.mInstance.cz = event.value;
        event.value = adi.mInstance.cz;
        if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
            adi.mInstance.pickedMeshs[0].object.material.color.b = adi.mInstance.cz;
        }
    }
}
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
const deleteObject = async(event)=> {
    adi.mInstance.scene.remove( adi.mInstance.pickedMeshs[0].object );
    animate();
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

        //On mouseclick raycast and check for intersection with scene meshes.
        var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,-( event.clientY / window.innerHeight ) * 2 + 1,0.5);                                  
            adi.mInstance.raycaster.setFromCamera( mouse3D.clone(), adi.mInstance.camera );
            let intersects =  adi.mInstance.raycaster.intersectObjects( adi.mInstance.scene.children );
            if ( intersects.length > 0 && intersects[0].object.name != "grid") {
                adi.mInstance.pickedMeshs = intersects;
                adi.mInstance.pickedMeshs[0].object.material.color.setHex( Math.random() * 0xffffff );
                adi.mInstance.transformControll.attach(adi.mInstance.pickedMeshs[0].object);
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
    adi.mInstance.orbitControl = new THREE.OrbitControls(adi.mInstance.camera, adi.mInstance.render.domElement);
    adi.mInstance.orbitControl.update();
    //
    adi.mInstance.camera.position.set(5, 5, 220);    
    //Transform Control
    adi.mInstance.transformControll = new THREE.TransformControls(adi.mInstance.camera,adi.mInstance.render.domElement );
    adi.mInstance.scene.add(adi.mInstance.transformControll);
    
    // GROUND
    let grid = new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) ;
    grid.name = "grid";
    adi.mInstance.scene.add(grid);
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
        adi.mInstance.scene.add(adi.mInstance.mainmesh);
   }
   adi.mInstance.addMesh = false;

    requestAnimationFrame(animate);
    adi.mInstance.frametime = clock.getDelta();
    let time = clock.getElapsedTime();
    let elapsed = clock.getElapsedTime();

    if(adi.mInstance.pickedMeshs != undefined && adi.mInstance.pickedMeshs.length > 0){
        updateSidePanelData(adi.mInstance.pickedMeshs[0].object);
    }

    adi.mInstance.render.render(adi.mInstance.scene, adi.mInstance.camera);
}