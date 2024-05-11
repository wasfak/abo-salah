"use client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

import { useState } from "react";

export default function UploadBtn({
  onUploadComplete,
  onUploadStart,
  onUploadEnd,
}) {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const handleUploadSuccess = (result: any) => {
    const newUrl = result.info.url;
    setUploadedImageUrls((prevUrls) => [...prevUrls, newUrl]);
    onUploadComplete(newUrl);
    onUploadEnd(); // Call to reopen the dialog after upload
  };

  const handleClick = () => {
    onUploadStart(); // Call to close the dialog before upload
  };

  return (
    <div className="relative top-0 left-0 z-50">
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={handleUploadSuccess}
        onClick={handleClick}
        className="relative top-0 left-0 z-50"
      >
        <span>Upload</span>
      </CldUploadButton>
      {uploadedImageUrls.length > 0 && (
        <ul>
          {uploadedImageUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Uploaded image ${index}`}
              width={100}
              height={100}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
