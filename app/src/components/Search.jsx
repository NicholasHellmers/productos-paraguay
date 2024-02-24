import { createClient } from "@supabase/supabase-js";
import { createResource, createSignal } from "solid-js";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchData(searchTerm) {
    if (searchTerm === "") return [];
    const { data } = await supabase.from("products").select("*").ilike("name", `%${searchTerm}%`).limit(5);
    return data;
}

export default function Search() {
    const [searchTerm, setSearchTerm] = createSignal("");
    const [data] = createResource(searchTerm, fetchData);

    return (
        <div className="w-fit mx-auto my-10 border border-gray-300  bg-white " >
            {/* Is submit for to send to url of whatever is in the input tag */}
            <input
                className="bg-white h-10 px-5 pr-16 text-sm focus:outline-none w-[300px]"
                type="text"
                value={searchTerm()}
                onInput={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm() !== "" && <ul class="border absolute bg-white w-[300px]">
                <For each={data()}>{(entry) => 
                    <ul className="border hover:bg-slate-100 w-[300px]">
                        <li>{entry.name}</li>
                        <li>{entry.price}</li>
                        <li>{entry.supermarket}</li>
                    </ul>
                }</For>
            </ul>}
            <button 
                className='bg-gray-200 p-3'
                onClick={() => {
                    window.location.href = searchTerm() ? `/?search=${searchTerm()}` : "/";}}
            >
                Search
            </button>
            
        </div>
    );
}
