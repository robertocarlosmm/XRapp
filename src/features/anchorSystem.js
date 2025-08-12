import { WebXRAnchorSystem } from "@babylonjs/core/XR/features/WebXRAnchorSystem.js";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents.js";
import { getLastHit } from "./hitTest.js";
import { createSphere, playAnim } from "../tools.js";
import { applyShadow } from "./shadows.js";
import { getAnimations, getCharacterMeshes, isCharacterMade } from "../character.js";
import { Vector3 } from "babylonjs";

let enabled = false;

export function enableAnchorSystem(fm, scene) {
    try {
        //para anclar objetos al mundo real
        const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest");
        //para ver el ancla
        anchorSystem.onAnchorAddedObservable.add(anchor => {
            /*const clone = container.meshes[0].clone("animation_clone");
            //clone.position.x = Scalar.RandomRange(1.5,2)
            anchor.attachedNode = clone;*/
            const sphere = createSphere(scene, { diameter: 0.06 });
            applyShadow(sphere);
            anchor.attachedNode = sphere;
        })
        enabled = true;

        let renderer;
        scene.onPointerObservable.add(event => {
            const lastHit = getLastHit();
            /*if (lastHit && anchorSystem) {
                anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);
            }*/
            if(!lastHit || !isCharacterMade()) {
                return console.log("Las hit o character is not ready");
            }
            const meshes = getCharacterMeshes();
            if(!meshes) return console.log("Character meshes not found");

            scene.onBeforeRenderObservable.remove(renderer);
            renderer = scene.onBeforeRenderObservable.add(() => {
                const distance = Vector3.Distance(meshes[0].position, lastHit.position);
                console.log("Distance to last hit:", distance);
                if(distance < 0.01) {
                    return;
                }

                meshes[0].lookAt(lastHit.position);
                Vector3.SlerpToRef(meshes[0].position, 
                    lastHit.position, 0.1, meshes[0].position);
                playAnim(getAnimations(), "walkingAnimation");
                
            })
        }, PointerEventTypes.POINTERDOWN)

        return anchorSystem;
    } catch (error) {
        console.error("Error enabling anchor system:", error);
        return error;
    }
}