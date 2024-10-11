"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Form from "@/components/ui/Form"; // Import the new component
import Footer from "@/components/ui/Footer";

// Define the valid language keys
type LanguageKeys = 'en' | 'hi' | 'mr';

export function UserInfoForm() {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<LanguageKeys>("en"); // Set type to LanguageKeys
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | File | null>(null); // Allow File type

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Form
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedTaluka={selectedTaluka}
          setSelectedTaluka={setSelectedTaluka}
          language={language} // Pass language prop
        />  
      </main>
      <Footer />
    </div>
  );
}