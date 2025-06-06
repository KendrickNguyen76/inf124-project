// userSettingsCrud.js

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

export async function getUserProfile() {
    const user_token = localStorage.getItem('supabase_token');

    const res = await fetch(`${API_URL}/settings/profiledetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user_token}),
    });

    const profile_data = await res.json();

    if (!res.ok) throw new Error(profile_data.error || "Failed to get Profile Info");
    
    console.log(profile_data);
}
