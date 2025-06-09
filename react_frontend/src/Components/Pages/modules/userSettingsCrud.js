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
            body: JSON.stringify({ token: user_token }),
        });

        const profile_data = await res.json(); 

        if (!res.ok) throw new Error(profile_data.error || "Failed to get Profile Info");

        return profile_data;
    } catch (error) {
        console.error(error.message);
    }
}

// updateUserProfile()
// Sends the users's new profile picture and bio to the backend
export async function updateUserProfile(newPfp, newBio) {
    const user_token = localStorage.getItem('supabase_token');

    try {
        console.log("Sending new bio and profile pic");

        const res = await fetch(`${API_URL}/settings/editprofile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: user_token, newPfp: newPfp, newBio: newBio }),
        });
        
        if (!res.ok) {
            throw new Error("Failed to Update Profile Info")
        } else {
            console.log("Successfully updated User Profile!")
        }

    } catch (error) {
        console.error(error.message);
    }
}


// updateUserTheme()
// Updates the user's appearance to light or dark mode
export async function updateUserAppearance(newLightOption) {
    const user_token = localStorage.getItem('supabase_token');

    try {
        console.log("Sending new light/dark mode preference.");

        const res = await fetch(`${API_URL}/settings/editappearance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: user_token, newIsLight: newLightOption }),
        });
        
        if (!res.ok) {
            throw new Error("Failed to Update Apperance")
        } else {
            console.log("Successfully Updated Appearance!")
        }

    } catch (error) {
        console.error(error.message);
    }
}
