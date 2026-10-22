import Image, { type StaticImageData } from "next/image";

type PhotoProps = {
  src: StaticImageData;
  alt: string;
  /** Above-the-fold (LCP) image: load eagerly with high fetch priority. */
  eager?: boolean;
};

/**
 * Responsive photo. The custom loader (src/lib/image-loader.ts) serves the
 * 800 px variant or the full-size file; layout comes from the parent's CSS.
 */
export function Photo({ src, alt, eager = false }: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes="(max-width: 700px) 100vw, 55vw"
      {...(eager ? { loading: "eager", fetchPriority: "high" } : {})}
    />
  );
}
