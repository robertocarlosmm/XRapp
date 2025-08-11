import {
    Scene, HemisphericLight, FreeCamera, Vector3} from "babylonjs"
import { enableExEperience } from "../features/xrExperience.js";
/*import { LoadAssetContainerAsync } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF"; // necesario para .glb/.gltf*/


export async function startScene(engine) {
    const scene = new Scene(engine);
    const light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);

    const cam = new FreeCamera("cam", new Vector3(0, 0, -2), scene);
    cam.attachControl()

    //const box = new MeshBuilder.CreateBox("box", {size:.5}, scene);
    //const dot = MeshBuilder.CreateSphere("dot", { diameter: 0.05 }, scene);

    //importar modelo
    /*
    const container = await LoadAssetContainerAsync("./models/PruebaModel.glb", scene);
    container.addAllToScene();
    container.meshes[0].position.x = 2;
    // Reproducir todas las animaciones en loop
    container.animationGroups.forEach(ag => ag.start(true)); // (loop = true)
    // Opcional: velocidad
    container.animationGroups.forEach(ag => ag.speedRatio = 1.0);
    */

    await enableExEperience(scene);

    await scene.whenReadyAsync();
    return scene;
}