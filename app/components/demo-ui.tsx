"use client";
import {motion,useMotionValueEvent,useReducedMotion,useScroll} from "motion/react";
import {useState} from "react";

export function DemoScrollIsland({label,links}:{label:string;links:{name:string;href:string}[]}){
 const {scrollYProgress}=useScroll();
 const [progress,setProgress]=useState(0),[visible,setVisible]=useState(false);
 const reduce=useReducedMotion();
 useMotionValueEvent(scrollYProgress,"change",v=>{setProgress(v);setVisible(v>.035&&v<.97)});
 return <motion.aside className="demo-scroll-island" aria-label={`${label} page navigation`} initial={false} animate={{opacity:visible?1:0,y:visible?0:-12,scale:visible?1:.96}} transition={{duration:reduce?0:.22}}><a href="#top" className="demo-island-brand">{label}</a><div className="demo-island-links">{links.map(x=><a href={x.href} key={x.href}>{x.name}</a>)}</div><div className="demo-island-progress" aria-label={`${Math.round(progress*100)}% through page`}><i style={{transform:`scaleX(${progress})`}}/><span>{String(Math.round(progress*100)).padStart(2,"0")}</span></div></motion.aside>
}
