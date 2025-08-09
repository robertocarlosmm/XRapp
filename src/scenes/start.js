import {
    Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder, WebXRHitTest,
    PointerEventTypes, WebXRAnchorSystem, SceneLoader
} from "babylonjs"



export async function startScene(engine) {
    const scene = new Scene(engine);
    const light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);

    const cam = new FreeCamera("cam", new Vector3(0, 0, -2), scene);
    cam.attachControl()

    //const box = new MeshBuilder.CreateBox("box", {size:.5}, scene);
    const dot = MeshBuilder.CreateSphere("dot", { diameter: 0.5 }, scene);

    //importar modelo
    const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/", "PruebaModel.glb", scene);
    meshes[0].position.x = 2;


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
            results[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
        }
    });

    //para ver el ancla
    anchorSystem.onAnchorAddedObservable.add(anchor => {
        anchor.attachedNode = dot.clone();
    })

    scene.onPointerObservable.add(event => {
        if (lastHit && anchorSystem) {
            anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);
        }
    }, PointerEventTypes.POINTERDOWN)

    await scene.whenReadyAsync();
    return scene;
}