"use client";

import Link from "next/link";
import Image from "next/image";

export const Header = () => {
    return (
        <header className="fixed top-6 left-6 z-50">
            <Link href="/" className="block group">
                <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="Box Machi Box Logo"
                        fill
                        className="object-contain drop-shadow-lg"
                        priority
                    />
                </div>
            </Link>
        </header>
    );
};
