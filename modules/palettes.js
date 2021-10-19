import {XORShift64} from 'random-seedable';

let palettes = [
    ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"],
    ["#e63946","#f1faee","#a8dadc","#457b9d","#1d3557"],
    ["#112233","#14213d","#fca311","#e5e5e5","#ffffff"],
    ["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"],
    ["#6E819E","#FFFFFF","#F6C8AC","#EFF7F5","#2C4D5D","#EF8F88"],
    [ "#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"], 
    ["#ef476f","#ffd166","#06d6a0","#118ab2","#073b4c"],
    ["#000814","#001d3d","#003566","#ffc300","#ffd60a"],
    ["#F3D5C0","#D4B499","#889EAF","#506D84","#CEE5D0","#FF7878","#FF7777"]
];

export let getRandomPalette = (seed=100) =>{
    let random =  new XORShift64( seed )
    return random.choice(palettes)
}