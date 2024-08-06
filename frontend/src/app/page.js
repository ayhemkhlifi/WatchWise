import Navbar from "@frontend/src/components/Navbar";
import Image from "next/image";
import "./globals.css";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  deepspace">
      <Navbar />
    </main>
  );
}
