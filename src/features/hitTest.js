import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { WebXRHitTest } from "@babylonjs/core/XR/features/WebXRHitTest.js";
let lastHit = undefined;
let enabled = false;

export function getLastHit(hit) {
    return lastHit;
}

export function enableHitTest(fm, scene) {
    try {
        //para colectar data del mundo real

        const hitTest = fm.enableFeature(WebXRHitTest, "latest");
        //const dot = scene.getMeshByName("dot");
        const ground = scene.getMeshByName("ground");
        if(!ground) throw new Error("No ground");

        const dot = MeshBuilder.CreateSphere("dot", { diameter: 0.05 }, scene);
        hitTest.onHitTestResultObservable.add((results) => {
            if (results.length) {
                lastHit = results[0];
                results[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
                ground.position.y = dot.position.y - 0.03; // Ajustar ligeramente por debajo del plano de la cámara
                //results[0].transformationMatrix.decompose(container.meshes[0].scaling, container.meshes[0].rotationQuaternion, container.meshes[0].position);
            } else{
                lastHit = undefined;
            }
        });
        enabled = true;
        return hitTest;
    }
    catch (error) {
        console.error("Error enabling hit test:", e);
        enabled = false;
        return error;
    }
}