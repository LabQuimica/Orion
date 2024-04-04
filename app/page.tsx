import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: ubicacion } = await supabase
    .from("ubicacion")
    .select("Mueble")
    .eq("Mueble", "Estante");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hola Orion
      <pre>{JSON.stringify(ubicacion, null, 2)}</pre>
    </main>
  );
}
