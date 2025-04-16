"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.api.apiEndPoint}/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authenticated request failed: ${error.message}`);
  }
};

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: FileUploadProps) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };
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

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.success("Success!", {
          description: "Please upload a file that is less than 20MB in size",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.success("Success!", {
          description: "Please upload a file that is less than 20MB in size",
        });
        return false;
      }
    }

    return true;
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
          onUploadStart={() => setProgress(0)}
          onUploadProgress={({ loaded, total }) => {
            const percent = Math.round((loaded / total) * 100);

            setProgress(percent);
          }}
          folder={folder}
          accept={accept}
          useUniqueFileName={true}
          validateFile={onValidate}
        />
        <div className="flex items-center">
          <button
            className={cn("upload-btn", styles.button)}
            onClick={(e) => {
              e.preventDefault();
              if (ikUploadRef.current) {
                //@ts-ignore
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
            <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
            {file && <p className="upload-filename">{file.filePath}</p>}
          </button>
          {progress > 0 && progress !== 100 && (
            <div className="w-full rounded-full bg-green-200">
              <div className="progress" style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
          )}
          {file &&
            (type === "image" ? (
              <IKImage
                alt={file.filePath}
                path={file.filePath}
                width={100}
                height={80}
              />
            ) : type === "video" ? (
              <IKVideo
                path={file.filePath}
                controls={true}
                width={100}
                height={100}
              />
            ) : null)}
        </div>
      </ImageKitProvider>
    </>
  );
};

export default FileUpload;
