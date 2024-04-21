"use client";

import {
  IconLayoutSidebarRightExpand,
  IconNavigationHeart,
  IconFridge,
  IconBook,
  IconFlask,
  IconVolcano,
  IconUsers,
  IconCalendarMonth,
} from "@tabler/icons-react";
import Link from "next/link";
import { useUIStore } from "./ui-store";
import clsx from "clsx";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-30  " />
      )}

      {isSideMenuOpen && (
        <div
          onClick={() => closeSideMenu()}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-md "
        />
      )}

      <nav
        className={clsx(
          "fixed p-5 left-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 dark:bg-black dark:text-white",
          { "-translate-x-full": !isSideMenuOpen }
        )}
      >
        <IconLayoutSidebarRightExpand
          size={25}
          className="absolute top-5 cursor-pointer "
          onClick={() => closeSideMenu()}
        />

        <Link
          href={"/dashboard"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all dark:hover:bg-gray-800"
          onClick={() => closeSideMenu()}
        >
          <IconNavigationHeart size={30} />
          <p className="ml-5">Dashboard</p>
        </Link>

        <Link
          href={"/dashboard/kits"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all  dark:hover:bg-gray-800 "
          onClick={() => closeSideMenu()}
        >
          <IconFridge size={30} />
          <p className="ml-5">Kits</p>
        </Link>

        <Link
          href={"/dashboard/manuales"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all  dark:hover:bg-gray-800 "
          onClick={() => closeSideMenu()}
        >
          <IconBook size={30} />
          <p className="ml-5">Manuales</p>
        </Link>

        <Link
          href={"/dashboard/materiales"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all  dark:hover:bg-gray-800"
          onClick={() => closeSideMenu()}
        >
          <IconFlask size={30} />
          <p className="ml-5">Materiales</p>
        </Link>

        <Link
          href={"/dashboard/reactivos/liquidos"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all  dark:hover:bg-gray-800"
          onClick={() => closeSideMenu()}
        >
          <IconVolcano size={30} />
          <p className="ml-5">Reactivos Liquidos</p>
        </Link>

        <Link
          href={"/dashboard/reactivos/solidos"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all  dark:hover:bg-gray-800"
          onClick={() => closeSideMenu()}
        >
          <IconVolcano size={30} />
          <p className="ml-5">Reactivos Solidos</p>
        </Link>

        <Link
          href={"/dashboard/usuarios"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all  dark:hover:bg-gray-800"
          onClick={() => closeSideMenu()}
        >
          <IconUsers size={30} />
          <p className="ml-5">Usuarios</p>
        </Link>

        <Link
          href={"/dashboard/calendario"}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all  dark:hover:bg-gray-800"
          onClick={() => closeSideMenu()}
        >
          <IconCalendarMonth size={30} />
          <p className="ml-5">Calendario</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
