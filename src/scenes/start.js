import {Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder} from "babylonjs"

export async function startScene(engine){
    const scene = new Scene(engine);
    const light = new HemisphericLight("light", new Vector3(0,2,0),scene);
    
    const cam = new FreeCamera("cam", new Vector3(0,0,-2), scene);
    cam.attachControl()

    const box = new MeshBuilder.CreateBox("box", {size:.5}, scene);

    //PARA EL AR - solo funciona en https (cap 5 - vite.config.js)
    await scene.createDefaultXRExperienceAsync({
        uiOptions: {sessionMode: "immersive-ar"}
    })


    await scene.whenReadyAsync();
    return scene;
}