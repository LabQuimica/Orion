"use client";

import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import ThemeSwitch from "../ThemeSwitch";
import { useUIStore } from "../sidebar/ui-store";
import Link from 'next/link'
import {signIn, useSession} from 'next-auth/react'

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const {data: session} = useSession()

  return (
    <nav className='bg-slate-900 flex justify-between px-25 text-white items-center py-3'>


      <Link href="/">
          <h1>
              Orion
          </h1>
      </Link>

      {session?.user ?(
        <>
          <div className="p-4 flex ">
            <IconLayoutSidebarLeftExpand
              className="cursor-pointer"
              onClick={openSideMenu}
            />
          </div>

          <div className='flex gap-x-2 items-center'>
              <Link href="/dashboard">
                  Holas pagina xd
              </Link>
              <p>{session.user.name} {session.user.email}</p>
              <img src={session.user.image} alt="Foto de perfil" className='w-10 h-10 rounded-full cursor-pointer' />
          </div>

          <div className="p-4 flex ">
            <ThemeSwitch />
          </div>
        </>

      ):(
        <>
          <div className='flex gap-x-2 items-center'>
            <button onClick={() => signIn()} className='bg-sky-400 px-3 py-2 rounded'>
                Ingresar
            </button>
          </div>
        </>

      )}
    </nav>
  );
};

export default TopMenu;
