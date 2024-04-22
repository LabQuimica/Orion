"use client";

import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import ThemeSwitch from "../ThemeSwitch";
import { useUIStore } from "../sidebar/ui-store";
import Link from "next/link";
import {signIn, useSession, signOut} from 'next-auth/react';

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const {data: session} = useSession()

  return (
    <nav className='bg-slate-900 flex justify-between px-25 text-white items-center py-3'>

      <a href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse ps-4">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Orion</span>
      </a>

      {/* En caso de que si exista el usuario, mostrar lo siguiente */}
      {session?.user ?(

        <>

          <div className="p-4 flex ">
            <IconLayoutSidebarLeftExpand
              className="cursor-pointer"
              onClick={openSideMenu}
            />
          </div>

          <div className='flex gap-x-2 items-center'>
              
            <a href={"/dashboard"} className="mr-10">
                Dashboard
            </a>

            <p className="font-serif" >Bienvenid@! {session.user.name}</p>

            <img src={session.user.image} alt="" className='w-10 h-10 rounded-full mr-4'/>

            <button className='bg-sky-400 px-3 py-2 rounded' onClick={async () => {signOut({callbackUrl: "/",})}}> Cerrar sesión </button>

            <div className="p-4 flex ">
              <ThemeSwitch />
            </div>

          </div>
        </>
      ):(

        <>
          <div className='flex gap-x-2 items-center pe-4'>

            <div className="p-4 flex ">
              <ThemeSwitch />
            </div>

            <button className='bg-sky-400 px-3 py-2 rounded' onClick={() => signIn()}> Ingresar </button>

          </div>
        </>

      )}
    </nav>
  );
};

export default TopMenu;
