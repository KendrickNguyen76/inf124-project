// userSettingsCrud.js

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

// getUserProfile()
// Queries the backend for the currently logged-in user's profile info
export async function getUserProfile() {
    const user_token = localStorage.getItem('supabase_token');

    try {
        const res = await fetch(`${API_URL}/settings/profiledetails`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: user_token}),
        });

        const profile_data = await res.json(); 

        if (!res.ok) throw new Error(profile_data.error || "Failed to get Profile Info");

        return profile_data;
    } catch (error) {
        console.error(error.message);
    }
}
