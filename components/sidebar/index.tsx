"use client";
import {
  IconAtom,
  IconUsers,
  IconFridge,
  IconBook,
  IconFlask,
  IconVolcano,
} from "@tabler/icons-react";
import SidebarItem from "./item";

interface ISidebarItem {
  name: string;
  path: string;
  icon: typeof IconAtom;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Home",
    icon: IconAtom,
    path: "/dashboard",
  },
  {
    name: "Kits",
    icon: IconFridge,
    path: "/dashboard/kits",
  },
  {
    name: "Manuales",
    icon: IconBook,
    path: "/dashboard/manuales",
  },
  {
    name: "Materiales",
    icon: IconFlask,
    path: "/dashboard/materiales",
  },
  {
    name: "Reactivos",
    icon: IconVolcano,
    path: "/dashboard/reactivos",
    items: [
      {
        name: "Liquidos",
        path: "/dashboard/reactivos/liquidos",
      },
      {
        name: "Solidos",
        path: "/dashboard/reactivos/solidos",
      },
    ],
  },
  {
    name: "Usuarios",
    icon: IconUsers,
    path: "/dashboard/usuarios",
  },
];

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex justify-between items-center h-10">
        <IconAtom size={60} stroke={1.5} />
        <p className="text-3xl pr-10 ">Orion</p>
      </div>
      <div className="flex flex-col mt-5 space-y-10 w-full">
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
