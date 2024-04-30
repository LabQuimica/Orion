"use server";
import supabase from "@/supabaseClient";

export const insertRL = async (formData: any) => {
     const { data, error } = await supabase
     .from('reactivos_solidos')
     .insert([
     formData
     ])
     .select()

     if (error) {
          console.error("Error insertando datos:", error);
          return null;
     }
     return data;
}