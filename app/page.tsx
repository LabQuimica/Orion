import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: ubicacion } = await supabase
    .from("ubicacion")
    .select("Mueble")
    .eq("Mueble", "Estante");

  return (
    <h1>
      <pre>{JSON.stringify(ubicacion, null, 2)}</pre>{" "}
    </h1>
  );
}
