
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PlaneIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M2 12h20"/><path d="M13 2l9 10-9 10"/><path d="M2 12l5-5m-5 5l5 5"/>
</svg>
);

const CheckCircleIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
</svg>
);

const Button = ({children, primary, onClick, className=""}) => (
<button
onClick={onClick}
className={`px-8 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2
${primary
? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
: "bg-slate-800 text-slate-200 border border-slate-600 hover:bg-slate-700"}
${className}`}
>
{children}
</button>
);

const Card = ({children,className=""}) => (
<div className={`bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 ${className}`}>
{children}
</div>
);

const FadeIn = ({children, delay=0}) => {
const [visible,setVisible] = useState(false);
const ref = useRef();

useEffect(()=>{
const obs = new IntersectionObserver(([e])=>{
if(e.isIntersecting){
setTimeout(()=>setVisible(true), delay*1000);
}
});
if(ref.current) obs.observe(ref.current);
return ()=>obs.disconnect();
},[delay]);

return (
<div
ref={ref}
style={{
opacity: visible ? 1 : 0,
transform: visible ? "translateY(0)" : "translateY(30px)",
transition: "opacity .6s ease-out, transform .6s ease-out"
}}
>
{children}
</div>
);
};

export default function App(){

const heroImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80";
const [menu,setMenu]=useState(false);

const scrollTo = (id)=>{
const el=document.getElementById(id);
if(el) el.scrollIntoView({behavior:"smooth"});
setMenu(false);
};

const program=[
{title:"Аэропорт без стресса",desc:"Регистрация, паспортный контроль и диалоги в аэропорту."},
{title:"В отеле",desc:"Как заселиться, попросить помощь и задать вопросы."},
{title:"Кафе и рестораны",desc:"Заказ еды и разговоры с официантами."},
{title:"Экстренные случаи",desc:"Фразы для помощи в сложных ситуациях."}
];

return(
<div className="min-h-screen text-slate-200">

<nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur border-b border-slate-800 z-50">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="text-2xl font-bold text-teal-400">TRAVELENG</div>

<div className="hidden md:flex gap-6">
<button onClick={()=>scrollTo("about")}>О курсе</button>
<button onClick={()=>scrollTo("program")}>Программа</button>
<Button primary onClick={()=>scrollTo("contact")}>Записаться</Button>
</div>

<button className="md:hidden" onClick={()=>setMenu(!menu)}>Menu</button>
</div>

<AnimatePresence>
{menu && (
<motion.div
initial={{height:0}}
animate={{height:"auto"}}
exit={{height:0}}
className="md:hidden bg-slate-900"
>
<div className="flex flex-col p-4 gap-3">
<button onClick={()=>scrollTo("about")}>О курсе</button>
<button onClick={()=>scrollTo("program")}>Программа</button>
</div>
</motion.div>
)}
</AnimatePresence>

</nav>

<header className="min-h-screen flex items-center pt-20 relative">

<img src={heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40"/>
<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"/>

<div className="relative max-w-7xl mx-auto px-6">
<FadeIn>
<h1 className="text-6xl font-bold text-white mb-6">
Английский для путешествий
</h1>

<p className="text-slate-400 text-xl mb-8 max-w-xl">
Практический разговорный английский для детей перед поездками за границу.
</p>

<Button primary onClick={()=>scrollTo("program")}>
Смотреть программу
</Button>
</FadeIn>
</div>

</header>

<section id="about" className="py-24 max-w-7xl mx-auto px-6">
<FadeIn>
<h2 className="text-4xl font-bold mb-8 text-white">Для кого курс</h2>

<div className="grid md:grid-cols-2 gap-6">
<Card>
<h3 className="text-xl font-bold text-white">4–5 класс</h3>
<p className="text-slate-400">Игровые диалоги и базовые фразы путешествий.</p>
</Card>

<Card>
<h3 className="text-xl font-bold text-white">6–8 класс</h3>
<p className="text-slate-400">Сложные ситуации, ориентирование и общение.</p>
</Card>
</div>
</FadeIn>
</section>

<section id="program" className="py-24 max-w-7xl mx-auto px-6">
<h2 className="text-4xl font-bold text-white mb-12">Программа курса</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
{program.map((p,i)=>(
<Card key={i}>
<div className="mb-3 text-teal-400">
<PlaneIcon/>
</div>
<h3 className="font-bold text-white mb-2">{p.title}</h3>
<p className="text-slate-400 text-sm">{p.desc}</p>
</Card>
))}
</div>

</section>

<footer id="contact" className="py-24 border-t border-slate-800 text-center">
<h2 className="text-4xl font-bold text-white mb-6">
Готовы к взлёту?
</h2>

<Button primary className="animate-pulse-slow">
Записаться на курс
</Button>

<p className="text-slate-500 mt-6">
© TravelEng Course
</p>

</footer>

</div>
);
}
