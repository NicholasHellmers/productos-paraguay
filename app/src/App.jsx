import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getData() {
  const { data } = await supabase.from("products").select().limit(20);
  return data;
}

function App() {
  // const [test_data] = createResource(getData);

  // limit to 3 items to 20 items
  const [test_data] = createResource(getData);

  return (
    <div className='m-auto py-24'>
      <ul className='grid grid-cols-5 gap-5 md:w-[70%]'>
        <For each={test_data()}>{(entry) => <ul id={entry.id}>
        <img src={entry.image_url} alt={entry.name} />
        <li>{entry.name}</li>
        <li>{entry.price}</li>
        <li>{entry.supermarket}</li>
        <li><a href={entry.product_url}>Get</a></li>
        </ul>
        }
        </For>
      </ul>
    </div>
  );
}

export default App;