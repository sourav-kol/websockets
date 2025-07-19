import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-gray-50 flex flex-col" style={{ height: "8vh" }}>
        <div className="flex-1 flex flex-col items-center justify-center font-black text-black">
          Chat Application
        </div>
      </div>
      <div className="w-full h-[85vh]">
        <Component {...pageProps} />
      </div>
    </>
  );
}
