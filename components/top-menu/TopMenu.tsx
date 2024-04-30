"use client";

import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import ThemeSwitch from "../ThemeSwitch";
import { useUIStore } from "../sidebar/ui-store";
import { signIn, useSession, signOut } from "next-auth/react";
import { useState } from "react";

const NavLinks = () => {
  const { data: session } = useSession();

  return (
    <div className="absolute right-5 mt-2 w-48 origin-top-right rounded-md bg-slate-950 py-2 space-y-3 top-12">
      <p className="px-3 text-sm text-gray-400">{session.user.name}</p>
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
    // Logo
    <nav className="bg-slate-900 flex justify-between px-25 text-white items-center py-3">
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

      {/* En caso de que si exista el usuario, mostrar lo siguiente */}
      {session?.user ? (
        <>
          <div className="p-4 flex ">
            <IconLayoutSidebarLeftExpand
              className="cursor-pointer"
              onClick={openSideMenu}
            />
          </div>

          <div className="flex gap-x-2 items-center">
            <a href={"/dashboard"} className="mr-10">
              Dashboard
            </a>

            {/* <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</Link>
            </div> */}

            {/* Boton en forma de imagen para cerrar sesion */}
            <>
              <nav className="w-1/3 justify-end flex">
                {/* <div className="hidden w-full md:flex justify-between">
                  <NavLinks />
                </div> */}

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
      ) : (
        <>
          <div className="flex gap-x-2 items-center pe-4">
            <div className="p-4 flex ">
              <ThemeSwitch />
            </div>

            <button
              className="bg-sky-400 px-3 py-2 rounded"
              onClick={() => signIn()}
            >
              {" "}
              Ingresar{" "}
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default TopMenu;
