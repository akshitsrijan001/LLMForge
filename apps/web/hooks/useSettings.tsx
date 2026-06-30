"use client";

import { createContext, useContext, useState } from "react";

type Settings = {
    temperature: number;
    topP: number;
    context: number;

    setTemperature: (v:number)=>void;
    setTopP: (v:number)=>void;
    setContext: (v:number)=>void;
};

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({
    children,
}:{
    children:React.ReactNode;
}){

    const [temperature,setTemperature]=useState(0.4);
    const [topP,setTopP]=useState(0.95);
    const [context,setContext]=useState(4096);

    return(
        <SettingsContext.Provider
            value={{
                temperature,
                topP,
                context,
                setTemperature,
                setTopP,
                setContext,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings(){
    const ctx=useContext(SettingsContext);

    if(!ctx){
        throw new Error("SettingsProvider missing");
    }

    return ctx;
}