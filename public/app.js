const $=id=>document.getElementById(id);
let previewUrl="";
function makeSvg(){
 const text=($("label").value||"A").slice(0,4).replace(/[<>&"']/g,"");
 const bg=$("bg").value,fg=$("fg").value,size=Number($("size").value),shape=$("shape").value;
 const shapeTag=shape==="circle"?'<circle cx="64" cy="64" r="60" fill="'+bg+'"/>':shape==="square"?'<rect width="128" height="128" fill="'+bg+'"/>':'<rect width="128" height="128" rx="28" fill="'+bg+'"/>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">'+shapeTag+'<text x="64" y="66" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="'+size+'" font-weight="700" fill="'+fg+'">'+text+'</text></svg>';
}
function render(){
 const svg=makeSvg(),blob=new Blob([svg],{type:"image/svg+xml"});
 if(previewUrl)URL.revokeObjectURL(previewUrl);
 previewUrl=URL.createObjectURL(blob);$("preview").src=previewUrl;
 $("size-value").textContent=$("size").value+" px";
 $("snippet").textContent='<link rel="icon" type="image/svg+xml" href="/favicon.svg">';
 return svg;
}
function download(name,blob){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
["label","bg","fg","shape","size"].forEach(id=>$(id).addEventListener("input",render));
$("svg").addEventListener("click",()=>download("favicon.svg",new Blob([render()],{type:"image/svg+xml"})));
$("png").addEventListener("click",()=>{const svg=render(),url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml"})),img=new Image();img.onload=()=>{const canvas=document.createElement("canvas");canvas.width=256;canvas.height=256;canvas.getContext("2d").drawImage(img,0,0,256,256);canvas.toBlob(blob=>{if(blob)download("favicon.png",blob);URL.revokeObjectURL(url)},"image/png")};img.onerror=()=>{URL.revokeObjectURL(url);$("status").textContent="PNG export failed in this browser."};img.src=url});
$("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("snippet").textContent);$("status").textContent="HTML snippet copied."}catch{$("status").textContent="Clipboard access is unavailable; copy the snippet manually."}});
render();
