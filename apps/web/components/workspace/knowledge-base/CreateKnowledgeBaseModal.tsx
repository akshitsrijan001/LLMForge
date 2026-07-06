"use client";

import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
};

export default function CreateKnowledgeBaseModal({
    open,
    onClose,
    onCreate,
}: Props) {

    const [name, setName] = useState("");

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#142338] rounded-2xl p-8 w-[450px] border border-slate-700">

                <h2 className="text-2xl font-bold mb-6">
                    Create Knowledge Base
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Knowledge Base Name"
                    className="w-full h-12 rounded-xl bg-[#0B1628] border border-slate-700 px-4"
                />

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {

                            onCreate(name);

                            setName("");

                        }}
                        className="px-5 py-2 rounded-lg bg-orange-500 text-black font-bold"
                    >
                        Create
                    </button>

                </div>

            </div>

        </div>

    );

}