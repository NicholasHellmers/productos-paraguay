import { createClient } from "@supabase/supabase-js";
import { createResource, createSignal } from "solid-js";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchData(searchTerm) {
    // Fetch the data and return a value.
    //`source` tells you the current value of the source signal;
    //`value` tells you the last returned value of the fetcher;
    //`refetching` is true when the fetcher is triggered by calling `refetch()`,
    // or equal to the optional data passed: `refetch(info)`
    if (searchTerm === "") return [];
    const { data } = await supabase.from("products").select("*").ilike("name", `%${searchTerm}%`).limit(5);
    console.log(data);
    return data;
}

export default function Search() {
    const [searchTerm, setSearchTerm] = createSignal("");
    const [data] = createResource(searchTerm, fetchData);

    return (
        <>
            <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="text"
                value={searchTerm()}
                onInput={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                <For each={data()}>{(entry) => <li>{entry.name}</li>}</For>
            </ul>
        </>
    );
}
