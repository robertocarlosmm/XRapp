import { enableHitTest } from "./hitTest.js";
import { enableAnchorSystem } from "./anchorSystem.js";
import { enableLightEstimation } from "./lightEstimation.js";

export async function enableExEperience(scene) {
    try {
        //PARA EL AR - solo funciona en https (cap 5 - vite.config.js)
        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: { sessionMode: "immersive-ar" }
        })

        const fm = xr.baseExperience.featuresManager;
        
        enableHitTest(fm, scene);
        enableAnchorSystem(fm, scene);
        enableLightEstimation(fm);

    } catch (error) {
        console.error("Error enabling XR Experience:", error);
        return null;
    }
}