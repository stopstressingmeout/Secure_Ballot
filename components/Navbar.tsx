import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex p-3 gap-3">
      <Link href={"/"}>Home</Link>
      <Link href={"/vote"}>Vote</Link>
      <Link href={"/about"}>About</Link>
    </nav>
  );
};

export default Navbar;
