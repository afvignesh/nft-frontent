import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
      <>
        <header className="border border-l-0 border-r-0 bg-[#1B2129] border-white/10 h-[9vh] flex items-center justify-left fixed top-0 left-0 right-0 opacity-100 z-[2000]">
        <nav className="flex items-center justify-between w-10/12  lg:w-11/12 m-auto">
            <Link href={'/'} passHref>
              <Image alt='ethlas/logo' src={'https://i0.wp.com/ethlas.com/wp-content/uploads/2023/04/White_Horizontal@2x.png?fit=2195%2C592&ssl=1'} width={150} height={130} objectFit="contain" /></Link>
            </nav>
        </header>
      </>
    )
  }