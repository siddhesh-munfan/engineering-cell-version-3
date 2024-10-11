"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import translations from "@/components/translation"; 

// Define the valid language keys
type LanguageKeys = 'en' | 'hi' | 'mr';

interface NavbarProps {
  language: LanguageKeys; // Use the defined type here
  setLanguage: (lang: LanguageKeys) => void; // Use the defined type here
}

export default function Navbar({ language, setLanguage }: NavbarProps) {
  return (
    <nav className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">EC</span>
          </div>
          <h1 className="text-xl font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {translations[language].navbarTitle}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select onValueChange={(value) => setLanguage(value as LanguageKeys)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={translations[language].selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="mr">मराठी</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
}