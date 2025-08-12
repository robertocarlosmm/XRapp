import { WebXRLightEstimation } from "babylonjs";
import { createShadowGenerator } from "./shadows.js";


export function enableLightEstimation(fm) {
    try {
        //para ajustar la luz virtual a la luz del mundo real
        const lightEstimation = fm.enableFeature(WebXRLightEstimation, "latest", {
            setSceneEnvionmentTexture: true,
            createDirectionalLightSource: true,
        });

        createShadowGenerator(sceneFragmentDeclaration, lightEstimation.directionalLight);


        return lightEstimation;
    } catch (error) {
        console.error("Error enabling light estimation:", error);
        return error;
    }
}