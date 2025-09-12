"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(en|bn)/, "");

  return (
    <div className="flex gap-2">
      <Link href={`/en${pathWithoutLocale}`}>English</Link>
      <Link href={`/bn${pathWithoutLocale}`}>বাংলা</Link>
    </div>
  );
}
