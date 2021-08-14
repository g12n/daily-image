export const generateHtml = (svgs, date) => {
let code = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Daily Image ${date} by G12Nss</title>
<style>
body{margin: 0; 
  padding: 10vmin;
  --min: 40ch;
  --gap: 1rem;
  display: grid;
  grid-gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  font-family: sans-serif
}
img{width: 100%; height: auto; margin: 0 auto;
  vertical-align: bottom;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 8px 8px rgba(0,0,0,0.11), 
              0 16px 16px rgba(0,0,0,0.11), 
              0 32px 32px rgba(0,0,0,0.11);
}
figcaption{padding: 0.5em; text-align: center }
</style>

</head>
<body>
`

svgs.map(svg =>{
   code += `<figure><img width=1000 height=1000 src="${svg.name}.svg"/><figcaption>${svg.name}</figcaption></figure>`
})
code += `</body></html>`

return code;

}