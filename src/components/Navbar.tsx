import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccoutNav from './UserAccoutNav';
import SetTheme from './SetTheme';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

const Navbar = async () => {
  const session = await getServerSession(authOptions); // Works only on server side

  return (
    // <div className='py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
    //   <div className='container flex items-center justify-between'>
    //     <Link href='/'>
    //       <HandMetal />
    //     </Link>


    //     <div className='container flex items-center' style={{justifyContent: "end"}}>

    //     <Menubar>
    //       <MenubarMenu>
    //         <MenubarTrigger>Navbar</MenubarTrigger>
    //         <MenubarContent>
    //           <MenubarItem>Home</MenubarItem>
    //           <MenubarSeparator />
    //           <MenubarItem>New Project</MenubarItem>
    //           <MenubarItem>Dashboard</MenubarItem>
    //           <MenubarItem>Profile</MenubarItem>
    //         </MenubarContent>
    //       </MenubarMenu>
    //     </Menubar>

    //       <SetTheme />
    //       {
    //         session?.user ? (
    //           <UserAccoutNav />
    //         ) : (
    //           <Link className={buttonVariants()} href='/sign-in'>
    //             Sign in
    //           </Link>
    //         )
    //       }
    //     </div>
    //   </div>
    // </div>
    <div className="container" style={{
      boxShadow: "0 2px 3px rgba(0,0,0,.2)"
    }}>
      <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul style={{background:'whitesmoke', color:'black'}}
          tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            <li><a href="/">Home</a></li>
            <li><a href='/create'>New Project</a></li>

            <li>
              <a>User</a>
              <ul className="p-2">
                <li><a>Profile</a></li>
                <li><a>Dashboard</a></li>
              </ul>
            </li>
            <li><a>About</a></li>
          </ul>
        </div>
        <a href='/' className="btn btn-ghost text-xl" 
        style={{color:'blue'}}>
          ResearchX
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href='/'>Home</a></li>
          <li><a href='/create'>New Project</a></li>

          <li>
            <details>
              <summary>User</summary>
              <ul className="p-2 bg-white" style={{background:'whitesmoke', color:'black'}}>
                <li><a>Profile</a></li>
                <li><a>Dashboard</a></li>
              </ul>
            </details>
          </li>
          <li><a>About</a></li>

        </ul>
      </div>
      <div className="navbar-end">
      <SetTheme />
        {/* <input type="checkbox" value="synthwave" className="mr-4 toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2"/> */}
        {
          session?.user ? (
              <UserAccoutNav />
          ) : (
              <a href='/sign-in' className="btn btn-error">Sign In</a>
          )
        }
      </div>
    </div>
    </div>
  );
};

export default Navbar;
