"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Navbar from "@/components/ui/Navbar";
import Form from "@/components/ui/Form"; // Import the new component
import Footer from "@/components/ui/Footer";

export function UserInfoForm() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("English");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // Profile picture state in the parent

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };

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
