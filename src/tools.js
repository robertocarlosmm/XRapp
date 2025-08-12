import { Color3, PBRMaterial } from "babylonjs";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { ShadowOnlyMaterial } from "babylonjs-materials";
/*
import {MeshBuilder, Color3, PBRMaterial} from "babylonjs"
import {ShadowOnlyMaterial} from "babylonjs-materials"*/



export function createSphere(scene, options) {
    const sphere = MeshBuilder.CreateSphere("sphere", options, scene);
    const mat = new PBRMaterial("sphereMat", scene);
    mat.albedoColor = Color3.Random();
    mat.roughness = 0.6;
    mat.metallic = 0.1;
    sphere.material = mat;
    return sphere;
}

export function createArGround(scene) {
    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    ground.receiveShadows = true;
    const mat = new ShadowOnlyMaterial("shadowMat", scene);
    ground.material = mat;

    return ground;
}

//animation tools
export function playAnim(animationGroups, animName, opt = {}) {
    const animation = animationGroups.find(ag => ag.name === animName);
    if (!animation) {
        console.warn("Animación no encontrada:", animName,
            "Disponibles:", animationGroups.map(g => g.name));
        return null;
    }
    const { loop = true, speed = 1 } = opts;

    // Detener otras animaciones del mismo modelo
    animationGroups.forEach(g => { if (g !== animation && g.isPlaying) g.stop(); });

    animation.reset();              // vuelve al primer frame
    animation.start(loop, speed);   // loop por defecto
    return animation;
}

// Detiene una animación por nombre (opcional: resetear al frame inicial)
export function stopAnim(animationGroups, animName, { reset = true } = {}) {
    const ag = animationGroups.find(g => g.name === animName);
    if (!ag) return null;

    ag.stop();               // detiene en el frame actual
    if (reset) ag.reset();   // si quieres que vuelva al inicio
    return ag;
}

// (opcional) Detener todas
export function stopAllAnims(animationGroups, { reset = false } = {}) {
    animationGroups.forEach(g => {
        if (g.isPlaying) g.stop();
        if (reset) g.reset();
    });
}