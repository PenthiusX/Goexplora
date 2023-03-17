//Container to eliminate Globals
var adi = adi || {};
adi.mInstance = adi.mInstance || {};
//-----------------------------
var clock = new THREE.Clock();
var textureLoader = new THREE.TextureLoader();


initElements();
initThree();
animate();

adi.mInstance.camera;
adi.mInstance.scene;
adi.mInstance.render;
adi.mInstance.sphere;
adi.mInstance.floor;
adi.mInstance.frametime;

adi.mInstance.groundGeometry;
adi.mInstance.groundMaterial;

adi.mInstance.hoverElementInfo;

adi.mInstance.domContextR;
adi.mInstance.domContextB;
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function initElements(){
    
}
//---------------------------------------------------------------------------------
const openNav = async() => { document.getElementById("mySidepanel").style.width = "250px";}
//---------------------------------------------------------------------------------
const closeNav = async() => {document.getElementById("mySidepanel").style.width = "0";}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
function elementFocusToggle(){
    document.addEventListener('mousemove', function (e) {
        if (e != null && e.target != null) {//Scan elements under mouse cursor.
            adi.mInstance.hoverElementInfo = { element: e.target, posX: e.clientX, posY: e.clientY }
            let ele = document.getElementsByClassName(adi.mInstance.hoverElementInfo.element.parentElement.className);
            adi.mInstance.hoverElementInfo = { element: e.target, parent: ele, posX: e.clientX, posY: e.clientY }
            console.log(adi.mInstance.hoverElementInfo);
        }    

        //Hack to allow for correct focus on overlaying Canvas and other Elements
        //will toggle the z index for the canvas based on where the mouse position is.
        let we = document.getElementById("Webgl_CSS_canvas");
        if(we && adi.mInstance.hoverElementInfo.element.id == "body"){
            we.style.zIndex = 0;
        }
        else if(we){
            we.style.zIndex = -1;
        }

    },false);
}

//--------------------------------------
function initThree() //Start
{   
    elementFocusToggle();
    //Rendering Context
    adi.mInstance.render = new THREE.WebGLRenderer({
        alpha: true
    });
    //adi.mInstance.render.setPixelRatio(window.devicePixelRatio);
    adi.mInstance.render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(adi.mInstance.render.domElement);
    adi.mInstance.render.domElement.id = "Webgl_CSS_canvas";
    
    //Camera
    adi.mInstance.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);   
    //
    adi.mInstance.domContextR =  adi.mInstance.render.domElement;
    adi.mInstance.domContextB =  document.body;

    //Controls
    const controls = new THREE.OrbitControls(adi.mInstance.camera, adi.mInstance.domContextR );
    adi.mInstance.camera.position.set(5, 5, 220);    
    
    //Scene
    adi.mInstance.scene = new THREE.Scene();

    // GROUND
    let pwidth = 10;
    let pheight = 10; 
    let pdepth = 10; 
    let pwidthSegments = 5;
    let pheightSegments= 5;
    adi.mInstance.groundGeometry = new THREE.PlaneGeometry(pwidth, pheight, pwidthSegments,pheightSegments);
    adi.mInstance.groundMaterial = new THREE.MeshBasicMaterial({
        color: 'rgb(200,200,200)',
        wireframe: true
    });
    adi.mInstance.floor = new THREE.Mesh(adi.mInstance.groundGeometry, adi.mInstance.groundMaterial );
    adi.mInstance.floor.rotation.x = (Math.PI/2);
    adi.mInstance.floor.scale.set(100,100,100);

    adi.mInstance.floor.position.y = 0.0;
    adi.mInstance.scene.add(adi.mInstance.floor);

       //Scene Objects
       let bwidth = 10;
       let bheight = 10; 
       let bdepth = 10; 
       let bwidthSegments = 5;
       let bheightSegments= 5;
       let bdepthSegments = 5;
       adi.mInstance.sphere = new THREE.Mesh(new THREE.BoxGeometry( bwidth, bheight, bdepth, bwidthSegments, bheightSegments, bdepthSegments),
       new THREE.MeshBasicMaterial({
           color: 'rgb(0,0,0)',
           wireframe: true
       }));
       adi.mInstance.scene.add(adi.mInstance.sphere);
}
//--------------------------------------
function animate() //Update loop
{
    requestAnimationFrame(animate);
    adi.mInstance.frametime = clock.getDelta();
    let time = clock.getElapsedTime();
    let elapsed = clock.getElapsedTime();

    adi.mInstance.render.render(adi.mInstance.scene, adi.mInstance.camera);
}