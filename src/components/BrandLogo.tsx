import Image from "next/image";
import { images } from "@/data/images";
import { site } from "@/data/site";

type Props = {
  priority?: boolean;
  className?: string;
};

export function BrandLogo({
  priority = false,
  className = "",
}: Props) {
  return (
    <Image
      src={images.brand.logo}
      alt={`${site.name} ${site.nameEn}`}
      width={48}
      height={48}
      priority={priority}
      className={`brand-logo ${className}`.trim()}
    />
  );
}
