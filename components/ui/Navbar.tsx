// components/Navbar.tsx
import React from "react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import translations from "@/components/translation.json"; // Adjust the path as needed

const Navbar: React.FC<{ language: string; setLanguage: (lang: string) => void }> = ({ language, setLanguage }) => {
  const { theme, setTheme } = useTheme();

  const t = (key: string) => translations[language][key] || key;

  return (
    <nav className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">EC</span>
          </div>
          <h1 className="text-xl font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>{t("Engineers Cell")}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("Select Language")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="मराठी">मराठी</SelectItem>
              <SelectItem value="हिंदी">हिंदी</SelectItem>
            </SelectContent>
          </Select>
          {/* <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="bg-gray-200 p-2 rounded"
          >
            {theme === "dark" ? "🌞" : "🌙"}
            <span className="sr-only">Toggle theme</span>
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
