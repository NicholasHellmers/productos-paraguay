import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getCountries() {
  const { data } = await supabase.from("countries").select();
  return data;
}

function App() {
  const [countries] = createResource(getCountries);

  return (
    <ul>
      <For each={countries()}>{(country) => <li>{country.name}</li>}</For>
    </ul>
  );
}

export default App;