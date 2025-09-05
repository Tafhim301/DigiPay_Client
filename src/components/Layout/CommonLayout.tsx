import type { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";




interface Iprops {
    children: ReactNode
}


export default function CommonLayout({ children }: Iprops) {


    return (
        <div className="min-h-screen grid grow-1">
            <Navbar></Navbar>
            <div className="">
               
                {children}
            </div>
            <Footer></Footer>
        </div>
    )
}
