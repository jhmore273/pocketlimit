type Palette={id:string;bg:string;surface:string;surfaceAlt:string;balance:string;border:string;accent:string;accentSoft:string;gold:string;button:string;text:string;muted:string;glow:string;line:string};
const palettes:Palette[]=[
 {id:'obsidiana',bg:'#080d0a',surface:'#19231b',surfaceAlt:'#101812',balance:'#203c2a',border:'#65d67c',accent:'#7dff91',accentSoft:'#245337',gold:'#d2ff9a',button:'#203a29',text:'#effff1',muted:'#a2c3a5',glow:'#12672e77',line:'#73d184'},
 {id:'vino',bg:'#150b0d',surface:'#2d1b1e',surfaceAlt:'#201316',balance:'#482126',border:'#bc686d',accent:'#f27678',accentSoft:'#632b33',gold:'#f4bdc0',button:'#3d2025',text:'#fff0ef',muted:'#cba3a5',glow:'#79222a66',line:'#c16c70'},
 {id:'petroleo',bg:'#09141a',surface:'#192b35',surfaceAlt:'#11212a',balance:'#1e3a4a',border:'#679bb3',accent:'#72c9e8',accentSoft:'#2c5266',gold:'#c5efff',button:'#243b48',text:'#eef9ff',muted:'#9fbcc9',glow:'#245f7a66',line:'#71a9bd'},
];
const rotatingPalettes=palettes.map(item=>item.id);
const rotationKey='pocketlimit-palette-rotation-v1';
export function applyNextPalette(){
 const root=document.documentElement;
 let next:string;
 try{
  const previous=localStorage.getItem(rotationKey);
  const previousIndex=rotatingPalettes.indexOf(previous??'');
  next=rotatingPalettes[(previousIndex+1)%rotatingPalettes.length];
  localStorage.setItem(rotationKey,next);
 }catch{next=rotatingPalettes[Math.floor(Math.random()*rotatingPalettes.length)];}
 const selected=palettes.find(item=>item.id===next)!;
 root.dataset.previewPalette=selected.id;
 for(const [key,value] of Object.entries(selected))if(key!=='id')root.style.setProperty(`--preview-${key.replace(/[A-Z]/g,letter=>`-${letter.toLowerCase()}`)}`,value);
}
