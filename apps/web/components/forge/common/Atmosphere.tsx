"use client";

import { motion } from "framer-motion";

export function Atmosphere() {

const particles=Array.from({length:90});

return(

<div className="pointer-events-none fixed inset-0 overflow-hidden">

<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ff7a1a10,transparent_40%),radial-gradient(circle_at_bottom_right,#3e8ef710,transparent_40%),#0b0a09]" />

<div
className="absolute inset-0 opacity-[0.03]"
style={{
backgroundImage:
"radial-gradient(white 0.7px, transparent 0.7px)",
backgroundSize:"32px 32px"
}}
/>

{particles.map((_,i)=>(

<motion.div

key={i}

className="absolute rounded-full"

style={{
width:2+(i%3),
height:2+(i%3),
background:
i%3===0
?"#ff7a1a"
:i%3===1
?"#3e8ef7"
:"#a76cf2",
left:`${(i*17)%100}%`,
top:`${(i*31)%100}%`,
opacity:.18,
filter:"blur(.4px)"
}}

animate={{
y:[0,-40,0],
x:[0,(i%2?10:-10),0],
opacity:[.05,.25,.05]
}}

transition={{
duration:12+(i%6)*3,
repeat:Infinity,
delay:i*.15,
ease:"easeInOut"
}}

/>

))}

<motion.div

className="absolute -top-52 -left-40 h-[500px] w-[500px] rounded-full"

style={{
background:
"radial-gradient(circle,#ff7a1a22 0%,transparent 70%)",
filter:"blur(70px)"
}}

animate={{
x:[0,40,0],
y:[0,30,0]
}}

transition={{
duration:35,
repeat:Infinity,
ease:"easeInOut"
}}

/>

<motion.div

className="absolute right-[-160px] top-40 h-[450px] w-[450px] rounded-full"

style={{
background:
"radial-gradient(circle,#3e8ef722 0%,transparent 70%)",
filter:"blur(70px)"
}}

animate={{
x:[0,-35,0],
y:[0,-30,0]
}}

transition={{
duration:42,
repeat:Infinity,
ease:"easeInOut"
}}

/>

</div>

);

}

export default Atmosphere;