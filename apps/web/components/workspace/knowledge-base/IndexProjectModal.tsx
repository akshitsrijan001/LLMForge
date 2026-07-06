"use client";

import { useState } from "react";

type Props = {
    open: boolean;
    knowledgeBase: string;
    onClose: () => void;
    onIndex: (path: string) => void;
};

export default function IndexProjectModal({

    open,
    knowledgeBase,
    onClose,
    onIndex,

}: Props) {

    const [path, setPath] = useState("");

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="w-[600px] rounded-2xl bg-[#142338] border border-slate-700 p-8">

                <h2 className="text-3xl font-bold">
                    Index Project
                </h2>

                <p className="text-gray-400 mt-3">
                    Knowledge Base
                </p>

                <div className="mt-2 rounded-lg bg-[#0B1628] p-3">
                    {knowledgeBase}
                </div>

                <label className="block mt-8 mb-3 text-gray-400">
                    Project Folder
                </label>

                <input
                    value={path}
                    onChange={(e)=>setPath(e.target.value)}
                    placeholder="C:\Users\Srijan\Desktop\Project"
                    className="w-full h-14 rounded-xl bg-[#0B1628] border border-slate-700 px-5"
                />

                <div className="flex justify-end gap-4 mt-10">

                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl bg-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={()=>{

                            onIndex(path);

                            setPath("");

                        }}
                        className="px-6 py-3 rounded-xl bg-orange-500 text-black font-bold"
                    >
                        Index
                    </button>

                </div>

            </div>

        </div>

    );

}