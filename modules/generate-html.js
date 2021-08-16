import { format } from 'date-fns'


export const generateHtml = (svgs, date) => {

let imageName =`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

imageName = format(date, "yyyy-M-d")
let formated =format(date, "MM/dd/yyyy")
let formated2 = format(date, "EEEE, do MMMM yyy")

let code = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Daily Images by G12N</title>
<meta name="description" content="Generative Art by Michael Germann, updated on ${formated}" />

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@mge_de">
<meta name="twitter:creator" content="@mge_de">
<meta name="twitter:title" content="Daily Image by G12N">
<meta name="twitter:description" content="Daily generative art by Michael Germann. Updated on ${formated2}">
<meta name="twitter:image" content="https://g12n.github.io/daily-image/${imageName}.jpeg">

<meta property="og:title" content="Daily Image by G12N" />
<meta property="og:image" content="https://g12n.github.io/daily-image/${imageName}.jpeg" />
<meta property="og:description" content="Daily generative art by Michael Germann. Updated on ${formated2}" />

<style>
body{
    margin: 0; 
    padding: 2rem;
    --min: 32ch;
    --gap: 2rem;
    display: grid;
    grid-gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
    font-family: sans-serif
}
img{
    width: 100%; 
    height: auto; 
    margin: 0 auto;
    vertical-align: bottom;
    box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
                0 2px 2px rgba(0,0,0,0.11), 
                0 4px 4px rgba(0,0,0,0.11), 
                0 8px 8px rgba(0,0,0,0.11), 
                0 16px 16px rgba(0,0,0,0.11), 
                0 32px 32px rgba(0,0,0,0.11);
}
figure {
    margin: 0;
    position: relative;
}

figcaption {
    padding: 0.5em; 
    text-align: center; 
    position: absolute; 
    left: 50%; 
    transform: translate(-50%,0)
}
</style>

</head>
<body>
`


let makeTitle =(name) =>{

    let [title, iteration] = name.split("-")
    return `${title}, generative Art by Michael Gehrmann, iteration ${iteration}, ${formated2}`

}


svgs.map(svg =>{
   code += `<figure><img width=1000 height=1000 src="${svg.name}.svg" title="${makeTitle(svg.name)}"/><figcaption>${svg.name}</figcaption></figure>`
})
code += `</body></html>`

return code;

}