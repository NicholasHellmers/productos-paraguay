import { createClient } from "@supabase/supabase-js";
import { createEffect, createResource, createSignal, For } from "solid-js";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function searchProducts(searchTerm) {
    if (searchTerm === "") {
        return [];
    }
    const { data } = await supabase.from("products").select("*").ilike("name", `%${searchTerm}%`).limit(5);
    // console.log(data);
    return data;
}

export default function Search() {
    const [searchResults, setSearchResults] = createSignal("");

    createEffect((searchTerm) => {
        const timeout = setTimeout(() => {
            searchProducts(searchTerm);
        }
            , 1000);
        return () => clearTimeout(timeout);
    }, [""]);

    return (
        <div className='flex flex-col items-center'>
            <input
                type="text"
                placeholder="Search"
                className='border-2 border-black rounded-lg'
                onChange={(e) => {
                    setSearchResults(searchProducts(e.target.value));
                }}
            />
            <ul className='absolute'>
                {/* {console.log(searchResults())} */}
                <For each={searchResults()}>{(entry) => <ul className='border rounded' id={entry.id}>
                    <a href={entry.product_url}>
                        {/* <img className='max-w-[100%] max-h-48' src={entry.image_url} alt={entry.name} /> */}
                        <li className="capitalize">{entry.name}</li>
                        <li>{entry.price}</li>
                        <li>{entry.supermarket}</li>
                    </a>
                </ul>
                }
                </For>
            </ul>
        </div>
    );
}
