import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";

const supabaseUrl = 'https://litoocyffsmtnyjpuebv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getData() {
  const { data } = await supabase.from("test").select();
  return data;
}

function App() {
  const [test_data] = createResource(getData);

  return (
    <ul>
      <For each={test_data()}>{(entry) => <li>{entry.id} {entry.username}</li>}</For>
    </ul>
  );
}

export default App;