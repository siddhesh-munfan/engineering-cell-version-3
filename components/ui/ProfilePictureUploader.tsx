import Image from "next/image";
import { useState, useEffect } from "react";

interface ProfilePictureUploaderProps {
  profilePicture: string | File | null; // Allow File type
  setProfilePicture: (picture: string | File | null) => void; // Allow File type
}

export default function ProfilePictureUploader({ profilePicture, setProfilePicture }: ProfilePictureUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profilePicture) {
      // Check if it's a base64 string or a URL
      if (typeof profilePicture === "string" && profilePicture.startsWith("data:image")) {
        setPreviewUrl(profilePicture);
      } else if (profilePicture instanceof File) {
        // Convert File object to a usable URL
        const objectUrl = URL.createObjectURL(profilePicture);
        setPreviewUrl(objectUrl);

        // Clean up the URL object after component unmounts
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setPreviewUrl(profilePicture); // Assuming it's a valid URL
      }
    } else {
      setPreviewUrl(null); // Reset the preview when no picture is set
    }
  }, [profilePicture]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file); // Pass the File object to the parent
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden mb-4">
        {previewUrl ? (
          <Image src={previewUrl} alt="Profile" width={128} height={128} className="object-cover" />
        ) : (
          <span className="text-4xl">👤</span>
        )}
      </div>
      <label className="w-full">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <div className="cursor-pointer bg-black text-white py-2 px-8 rounded text-center border border-black hover:bg-gray-800 flex items-center justify-center space-x-2">
          <span>Upload Image</span> {/* Button text */}
        </div>
      </label>
    </div>
  );
}