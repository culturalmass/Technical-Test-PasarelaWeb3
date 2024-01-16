import Image from "next/image";

export function Footer() {
  return (
    <div className="flex items-center gap-2 text-[0.75rem] opacity-30">
      <Image
        src={"/bitnovo-logo.jpg"}
        alt="bitnovo-logo"
        width={120}
        height={120}
        className="w-auto h-auto"
      />
      <div className="text-[1.6rem]">|</div>
      <div className="pt-2">
        © {new Date().getFullYear()} Bitnovo. All rights reserved.
      </div>
    </div>
  );
}
