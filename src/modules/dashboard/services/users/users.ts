import { supabase } from "../../../../core/supabase/client";



export async function getAllUsers(){
    const {data, error} = await supabase
    .from("profiles")
    .select('id,role');

    if (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
    return data;

}
