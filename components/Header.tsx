import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5">
      <div className="flex items-center space-x-5">
        {/* Goes to Home Page via "/" route  */}
        <Link href="/">
            {/* Can also define width and height in Image tag */}
            <Image className="w-32 object-contain cursor-pointer" src="/logo.png" alt="logo" width="32" height="32" />
        </Link>
        {/*  Hide These 3 on smaller screen --> Display using phone, mobile-first design*/}
        <div className="hidden md:inline-flex items-center space-x-5">
            <h3>About</h3>
            <h3>Contact </h3>
            <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="border border-green-600 px-4 py-1 rounded-full">Get Started</h3>
      </div>
    </header>
  );
}

export default Header;
