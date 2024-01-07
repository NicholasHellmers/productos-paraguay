import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function searchProducts(searchTerm) {
    const { data } = await supabase.from("products").select("*").ilike("name", `%${searchTerm}%`).limit(5);
    console.log(data);
    if (searchTerm === "") {
        return [];
    }
    return data;
}

export default function Search() {
    return (
        <div className='flex justify-center'>
            <input
                type="text"
                placeholder="Search"
                className='border-2 border-black rounded-lg'
                onChange={(e) => {
                    searchProducts(e.target.value);
                }}
            />
        </div>
    );
}
