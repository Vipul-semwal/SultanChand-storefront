import { Container, clx } from "@medusajs/ui";
import Image from "next/image";
import React from "react";
import PlaceholderImage from "@modules/common/icons/placeholder-image";

type ThumbnailProps = {
  thumbnail?: string | null;
  images?: any[] | null;
  size?: "small" | "medium" | "large" | "full" | "square";
  isFeatured?: boolean;
  className?: string;
  "data-testid"?: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url;

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden p-2 bg-ui-bg-subtle shadow-elevation-card-rest outline-none group transition-shadow ease-in-out duration-150 hover:shadow-lg",
        className,
        {
          "aspect-[2/3]": !isFeatured && size !== "square", // Set the 2:3 ratio here
          "aspect-[11/14]": isFeatured,
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  );
};

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <div className="absolute inset-0 p-2 sm:p-4 overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt="Thumbnail"
          className="object-contain object-center transition-transform duration-300 ease-in-out group-hover:scale-105 bg-orange-50 group-hover:opacity-90"
          draggable={false}
          quality={50}
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          fill
        />
      </div>
    </div>
  ) : (
    <div className="w-full h-full absolute inset-0 outline-none flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  );
};
export default Thumbnail;
