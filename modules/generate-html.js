import { format } from 'date-fns'


export const generateHtml = (svgs, date) => {

let imageName =`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

imageName = format(date, "yyyy-M-d")
let formated =format(date, "MM/dd/yyyy")
let formated2 = format(date, "EEEE, do MMMM yyy")

let code = `<!DOCTYPE html>`
code += `<html lang="en">`
code += `<head>`
code += `<meta charset="UTF-8">`
code += `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
code += `<title>Daily Images by G12N</title>`
code += `<meta name="description" content="Generative Art by Michael Germann, updated on ${formated}" />`
code += `<meta name="twitter:card" content="summary_large_image">`
code += `<meta name="twitter:site" content="@mge_de">`
code += `<meta name="twitter:creator" content="@mge_de">`
code += `<meta name="twitter:title" content="Daily Image by G12N">`
code += `<meta name="twitter:description" content="Daily generative art by Michael Germann. Updated on ${formated2}">`
code += `<meta name="twitter:image" content="https://g12n.github.io/daily-image/${imageName}.jpeg">`
code += `<meta property="og:title" content="Daily Image by G12N" />`
code += `<meta property="og:image" content="https://g12n.github.io/daily-image/${imageName}.jpeg" />`
code += `<meta property="og:description" content="Daily generative art by Michael Germann. Updated on ${formated2}" />`
code += `<style>body{`
code += `margin: 0;`
code += `padding: 2rem;`
code += `display: grid;`
code += `grid-gap: 2rem;`
code += `grid-template-columns: repeat(auto-fit, minmax(min(100%, 32ch), 1fr));`
code += `font-family: sans-serif`
code += `}`
code += `img{`
code += `width: 100%; `
code += `height: auto; `
code += `vertical-align: bottom;`
code += `}`
code += `figure {margin: 0}`
code += `figcaption {padding: 0.5em 0;text-align: center;}`
code += `</style>`
code += `</head>`
code += `<body>`

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