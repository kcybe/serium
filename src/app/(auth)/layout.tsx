import { Navbar } from "@/components/landing-page/nav/navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="items-center mt-24 justify-center w-full h-full">
        {children}
      </div>
    </>
  );
}
