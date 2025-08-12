import { WebXRState } from "babylonjs";
import { createCharacter } from "../character";

export function enableXRStateChangeCallback(xr, scene) {
    xr.baseExperience.onStateChangedObservable.add((state) => {
        if (state === WebXRState.IN_XR) { 
            //crear personaje
            createCharacter("./models/modelo2.glb", scene, { x: 0, y: 0, z: 1 })
        }
    });
}   