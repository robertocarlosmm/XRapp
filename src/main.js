import { Engine, Scene } from "babylonjs";
import { startScene } from "./scenes/start";
import "babylonjs-loaders"; // Import loaders if needed

const engine = new Engine(document.querySelector("canvas"), true);

async function main(){
    const scene = await startScene(engine);
    engine.runRenderLoop( ()=>scene.render() )
    //para evitar el resize
    window.addEventListener("resize", ()=> engine.resize())
}

main();