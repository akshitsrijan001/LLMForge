const API_URL = "http://127.0.0.1:8000";

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("knowledge_base", "default");

    const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Upload failed");
    }

    return await res.json();
}