"use client";

type Props = {
    onCreate?: () => void;
};

export default function KnowledgeBaseHeader({ onCreate }: Props) {
    return (
        <div className="flex items-center justify-between mb-8">

            <div>

                <h1 className="text-5xl font-bold">
                    Knowledge Bases
                </h1>

                <p className="text-gray-400 mt-3">
                    Manage Retrieval-Augmented Generation collections, organize indexed projects, and control the knowledge sources available to your AI workspace.
                </p>

            </div>

            <button
                onClick={onCreate}
                className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl font-semibold text-black"
            >
                + New Knowledge Base
            </button>

        </div>
    );
}