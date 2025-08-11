import { WebXRAnchorSystem } from "@babylonjs/core/XR/features/WebXRAnchorSystem.js";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents.js";
import { getLastHit } from "./hitTest.js";
import { createSphere } from "../tools.js";
import { applyShadow } from "./shadows.js";

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

        scene.onPointerObservable.add(event => {
            const lastHit = getLastHit();
            if (lastHit && anchorSystem) {
                anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);
            }
        }, PointerEventTypes.POINTERDOWN)

        return anchorSystem;
    } catch (error) {
        console.error("Error enabling anchor system:", error);
        return error;
    }
}