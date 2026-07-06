const API = "http://127.0.0.1:8000";

export async function getKnowledgeBases() {
    const res = await fetch(`${API}/knowledge-bases`);

    const data = await res.json();

    console.log("Knowledge Bases API:", data);

    return data;
}

export async function createKnowledgeBase(name: string) {
    const res = await fetch(`${API}/knowledge-bases/${name}`, {
        method: "POST",
    });

    return await res.json();
}

export async function deleteKnowledgeBase(name: string) {
    const res = await fetch(`${API}/knowledge-bases/${name}`, {
        method: "DELETE",
    });

    return await res.json();
}