"use client";

import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import ThemeSwitch from "../ThemeSwitch";
import { useUIStore } from "../sidebar/ui-store";
import { signIn, useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const NavLinks = () => {
  const { data: session } = useSession();

  return (
    <div className="absolute right-5 z-10 mt-2 max-w-max origin-top-right rounded-md bg-gray-900 py-3 shadow-lg items-center space-y-2 overflow-hidden top-12">
      <p className="px-3 text-sm text-gray-400">{session?.user?.name}</p>
      <p className="px-3 text-sm text-gray-400">{session?.user?.email}</p>

      {/* Boton para cerrar sesion */}
      <div className="flex">
        {/* Boton para cerrar sesion */}
        <button
          className="px-3 py-2 rounded basis-full bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
          onClick={async () => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export const TopMenu = () => {
  // Verifica el estado del menu (navbar en img)
  const [isOpen, setIsOpen] = useState(false);

  // Navbar en imagen
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Barra desplegable lateral
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  // Verifica la sesion iniciada
  const { data: session } = useSession();

  return (
    
    // Barra de navegacion chida
    <nav className="bg-slate-900 flex justify-between px-25 text-white items-center py-3">

      {/* En caso de que si exista el usuario, mostrar lo siguiente */}
      {session?.user ? (
        <>
          <div className="p-4 flex ">
            <IconLayoutSidebarLeftExpand
              className="cursor-pointer"
              onClick={openSideMenu}
            />
          </div>

          {/* Logo  */}
          <Link
            href={"/dashboard"}
            className="flex items-center space-x-3 rtl:space-x-reverse ps-4"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Orion
            </span>
          </Link>

          <div className="flex gap-x-2 items-center">

            {/* Boton en forma de imagen para cerrar sesion */}
            <>
              <nav className="w-1/3 justify-end flex">
                <div>
                  <button onClick={toggleNavbar}>
                    {/* {isOpen ? <X /> : <Menu />} */}
                    <img
                      src={session.user.image ?? ""}
                      alt=""
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  </button>
                </div>
              </nav>

              {isOpen && (
                <div>
                  <NavLinks />
                </div>
              )}
            </>

            {/* Cambio de tema claro a oscuro */}
            <div className="p-4 flex ">
              <ThemeSwitch />
            </div>
          </div>
        </>
      ) : 
      

      // En caso de que no exista el usuario...
      (
        <>

          {/* Logo  */}
          <a
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse ps-4"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Orion
            </span>
          </a>


          <div className="flex gap-x-2 items-center pe-4">
            <div className="p-4 flex ">
              <ThemeSwitch />
            </div>

            <a
            href={"/dashboard"}
            >
              <button
                className="bg-sky-400 px-3 py-2 rounded"
                onClick={() => signIn()}
              >
                Ingresar
              </button>
            </a>
            
          </div>
        </>
      )}
    </nav>
  );
};

export default TopMenu;
