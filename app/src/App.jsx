import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";
import Search from "./components/Search";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getData() {
  const { data } = await supabase.from("products").select("*").limit(100);
  return data;
}

function App() {
  const [test_data] = createResource(getData);

  return (
    <div className='py-24'>
      <Header />
      {/* Generate search bar that shows drop down of search results*/}
      <Search />
      <div className='flex justify-center'>
        <ul className='grid sm:grid-cols-2 md:grid-cols-4 gap-5 md:w-[80%]'>
          <For each={test_data()}>{(entry) => <ul className='border rounded p-2 w-[90vw] sm:w-[40vw] md:w-[20vw]' id={entry.id}>
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
    </div>
  );
}

export default App;