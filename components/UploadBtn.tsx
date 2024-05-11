"use client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

import { useState } from "react";

export default function UploadBtn() {
  // This state now holds an array of URLs
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const handleUploadSuccess = (result: any) => {
    setUploadedImageUrls((prevUrls) => [...prevUrls, result.info.url]);
  };

  return (
    <div>
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={handleUploadSuccess}
      >
        <span>Upload</span>
      </CldUploadButton>
      {uploadedImageUrls.length > 0 && (
        <ul>
          {uploadedImageUrls.map((url, index) => (
            <Image key={index} src={url} alt={url} width={100} height={100} />
          ))}
        </ul>
      )}
    </div>
  );
}
