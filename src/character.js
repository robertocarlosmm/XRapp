import { LoadAssetContainerAsync } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF"; // necesario para .glb/.gltf
import { Vector3 } from "babylonjs";

let characterMeshes = undefined;
let characterIsMade = false;
let animations = undefined;

export function getCharacterMeshes(){
    if(!characterIsMade) return false;
    return characterMeshes;
}

export function getAnimations(){
    if(!animations) return false;
    return animations;
}

export async function createCharacter(directory, scene, position){
    //aqui iria el personaje
    const model = await LoadAssetContainerAsync(directory, scene);
    characterMeshes = model.meshes;
    animations = model.animationGroups;

    model.addAllToScene();
    characterMeshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
    model.meshes[0].position = new Vector3(position.x, position.y, position.z);

    characterIsMade = true;

    return model;
}

export function isCharacterMade() {
    return characterIsMade;
}