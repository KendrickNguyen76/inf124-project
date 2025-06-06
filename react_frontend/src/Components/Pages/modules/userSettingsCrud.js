// userSettingsCrud.js

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

// getUserProfile()
// Queries the backend for the currently logged-in user's profile info
export async function getUserProfile() {
    const user_token = localStorage.getItem('supabase_token');

    const res = await fetch(`${API_URL}/settings/profiledetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user_token}),
    });

    const profile_data = await res.json(); 

    if (!res.ok) throw new Error(profile_data.error || "Failed to get Profile Info");
    
    // Due to the weird way Promises work, profile_data is an array of
    // objects that are key value pairs. In order ot access this information,
    // I'm converting it to a Map and returning that instead.
    // const map = new Map(Object.entries(profile_data[0]));

    return profile_data;
}
