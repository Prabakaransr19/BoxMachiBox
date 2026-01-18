"use client";

import Link from "next/link";
import Image from "next/image";

export const Header = () => {
    return (
        <header className="fixed top-2 left-0 z-50">
            <Link href="/" className="block group">
                {/* Even larger and shifted up more */}
                <div className="relative w-[400px] h-[140px] md:w-[900px] md:h-[340px] -mt-6 -ml-4 md:-mt-24 md:-ml-12 transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="Box Machi Box Logo"
                        fill
                        className="object-contain object-left drop-shadow-lg"
                        priority
                    />
                </div>
            </Link>
        </header>
    );
};
