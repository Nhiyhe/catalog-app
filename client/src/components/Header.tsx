import Link from "next/link";

const Header = () => {
  return (
    <ul style={{ display: "flex", justifyContent: "space-around" }}>
      <Link href="/">Home</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/signup">Register</Link>
    </ul>
  );
};

export default Header;
