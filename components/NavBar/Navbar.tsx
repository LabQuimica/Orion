"use client"

import Link from 'next/link'
import {signIn, useSession} from 'next-auth/react'

function Navbar(){

    const {data: session} = useSession()

    return(
        <nav className='bg-slate-900 flex justify-between px-25 text-white items-center py-3'>

            <Link href="/">
                <h1>
                    Orion
                </h1>
            </Link>
            

            {/* Si existe el cliente, se muestra lo siguiente */}
            {session?.user ?(
                <div className='flex gap-x-2 items-center'>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                    <p>{session.user.name} {session.user.email}</p>
                    <img src={session.user.image} alt="Foto de perfil" className='w-10 h-10 rounded-full cursor-pointer' />
                </div>
            ): 

        
            (
                <button onClick={() => signIn} className='bg-sky-400 px-3 py-2 rounded'>
                    Ingresar
                </button>
            )} {/* Si NO existe el cliente, se muestra lo de arriba*/}
            
        </nav>
    )
}

export default Navbar