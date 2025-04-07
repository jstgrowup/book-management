"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "sonner";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.api.apiEndPoint}/auth/imagekit`);
    console.log("response:", response);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    console.log("error:", error);
    throw new Error(`Authenticated request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filepath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Success!", {
      description: "Image uplaoded successfully",
    });
  };
  const onError = (error: any) => {
    toast.error("Failed!", {
      description: "Sorry something went wrong while uploading hte image",
    });
  };
  return (
    <>
      <ImageKitProvider
        publicKey={config.env.imageKit.publicKey}
        authenticator={authenticator}
        urlEndpoint={config.env.imageKit.urlEndpoint}
      >
        <IKUpload
          className="hidden"
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          fileName="test-upload.png"
        />
        <div className="flex items-center">
          <button
            className="upload-btn"
            onClick={(e) => {
              e.preventDefault();
              if (ikUploadRef.current) {
                // @ts-ignore
                ikUploadRef.current?.click();
              }
            }}
          >
            <Image
              src={"/icons/upload.svg"}
              alt="upload-icon"
              width={20}
              height={20}
              className="obje"
            />
            <p className="text-base text-light-100">Upload a File</p>
            {file && <p className="upload-filename">{file.filePath}</p>}
          </button>
          {file && (
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              width={100}
              height={80}
            />
          )}
        </div>
      </ImageKitProvider>
    </>
  );
};

export default ImageUpload;
