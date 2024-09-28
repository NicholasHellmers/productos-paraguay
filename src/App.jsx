import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";
import Search from "./components/Search";
import Header from "./components/Header";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getData(page) {
  if (window.location.search === "") {
    const { data } = await supabase.from("products").select("*").limit(100);
    return data
  } else {
    const search = new URLSearchParams(window.location.search).get('search')
    const { data } = await supabase.from("products").select("*").ilike("name", `%${search}%`).limit(50);
    return data
  }
}

function App() {
  const [test_data] = createResource(getData)
  return (
    // <Router>
      <div className='py-24'>
        <Header />
        {/* Generate search bar that shows drop down of search results*/}
        <Search />
        <div className='flex justify-center'>
          <ul className='grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:w-[60%]'>
            <For each={test_data()}>{(entry) => <ul className='bg-[] border rounded p-2 w-[90vw] sm:w-[40vw] md:w-[20vw]' id={entry.id}>
              <a href={entry.product_url} target="_blank">
                <div className="w-[100%] flex justify-center items-start">
                  <img className='h-48' src={entry.image_url} alt={entry.name} />
                </div>
                <li className="capitalize">{entry.name}</li>
                <li>{entry.price}</li>
                <li>{entry.supermarket}</li>
              </a>
            </ul>
            }
            </For>
          </ul>
        </div>
      </div>
    // </Router>
  );
}

export default App;