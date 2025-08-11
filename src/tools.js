import { Color3, PBRMaterial } from "@babylonjs/core";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { ShadowOnlyMaterial } from "babylonjs-materials";
/*
import {MeshBuilder, Color3, PBRMaterial} from "babylonjs"
import {ShadowOnlyMaterial} from "babylonjs-materials"*/



export function createSphere(scene, options){
    const sphere = MeshBuilder.CreateSphere("sphere", options, scene);
    const mat = new PBRMaterial("sphereMat", scene);
    mat.albedoColor = Color3.Random();
    mat.roughness = 0.6;
    mat.metallic = 0.1;
    sphere.material = mat;
    return sphere;
}

export function createArGround(scene){
    const ground = MeshBuilder.CreateGround("ground", {width:10, height: 10}, scene);
    ground.receiveShadows = true;
    const mat = new ShadowOnlyMaterial("shadowMat", scene);
    ground.material = mat;

    return ground;
}