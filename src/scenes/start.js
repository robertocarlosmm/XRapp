import {
    Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder, WebXRHitTest,
    PointerEventTypes, WebXRAnchorSystem, Scalar
} from "babylonjs"
import { LoadAssetContainerAsync } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF"; // necesario para .glb/.gltf


export async function startScene(engine) {
    const scene = new Scene(engine);
    const light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);

    const cam = new FreeCamera("cam", new Vector3(0, 0, -2), scene);
    cam.attachControl()

    //const box = new MeshBuilder.CreateBox("box", {size:.5}, scene);
    const dot = MeshBuilder.CreateSphere("dot", { diameter: 0.05 }, scene);

    //importar modelo
    /*
    const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync("", "./models/", "PruebaModel.glb", scene);
    meshes[0].position.x = 2;*/
    const container = await LoadAssetContainerAsync("./models/PruebaModel.glb", scene);
    container.addAllToScene();
    container.meshes[0].position.x = 2;
    // Reproducir todas las animaciones en loop
    container.animationGroups.forEach(ag => ag.start(true)); // (loop = true)
    // Opcional: velocidad
    container.animationGroups.forEach(ag => ag.speedRatio = 1.0);


    //PARA EL AR - solo funciona en https (cap 5 - vite.config.js)
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: { sessionMode: "immersive-ar" }
    })

    const fm = xr.baseExperience.featuresManager;

    const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest");


    //para colectar data del mundo real
    let lastHit;
    const hitTest = fm.enableFeature(WebXRHitTest, "latest");
    hitTest.onHitTestResultObservable.add((results) => {
        if (results.length) {
            lastHit = results[0];
            //results[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
            results[0].transformationMatrix.decompose(container.meshes[0].scaling, container.meshes[0].rotationQuaternion, container.meshes[0].position);
        }
    });

    //para ver el ancla
    anchorSystem.onAnchorAddedObservable.add(anchor => {
        const clone = container.meshes[0].clone("animation_clone");
        //clone.position.x = Scalar.RandomRange(1.5,2)
        anchor.attachedNode = clone;
    })

    scene.onPointerObservable.add(event => {
        if (lastHit && anchorSystem) {
            anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);
        }
    }, PointerEventTypes.POINTERDOWN)

    await scene.whenReadyAsync();
    return scene;
}