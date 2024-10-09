"use client"
import { useState, useEffect, ChangeEvent } from "react"
import { Moon, Sun, MapPin, Phone, Mail, Upload } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import districtsData from "./districtsData.json"

const engineeringBranches = [
  "Computer Science", "Information Technology", "Electronics", "Electrical", "Mechanical", "Civil", "Chemical", "Aerospace"
]

const translations = {
  "English": {
    "Engineers Cell": "Engineers Cell",
    "User Information Form": "User Information Form",
    "Name": "Name",
    "Email": "Email",
    "Phone": "Phone",
    "Address": "Address",
    "Select District": "Select District",
    "Select Taluka": "Select Taluka",
    "Select Engineering Branch": "Select Engineering Branch",
    "Enter your message": "Enter your message",
    "Submit": "Submit",
    "Select Language": "Select Language",
    "Upload Profile Picture": "Upload Profile Picture"
  },
  "मराठी": {
    "Engineers Cell": "इंजीनियर्स कक्ष",
    "User Information Form": "वापरकर्ता माहिती फॉर्म",
    "Name": "नाव",
    "Email": "ईमेल",
    "Phone": "फोन",
    "Address": "पत्ता",
    "Select District": "जिल्हा निवडा",
    "Select Taluka": "तालुका निवडा",
    "Select Engineering Branch": "अभियांत्रिकी शाखा निवडा",
    "Enter your message": "आपला संदेश प्रविष्ट करा",
    "Submit": "सबमिट करा",
    "Select Language": "भाषा निवडा",
    "Upload Profile Picture": "प्रोफाइल चित्र अपलोड करा"
  },
  "हिंदी": {
    "Engineers Cell": "इंजीनियर्स सेल",
    "User Information Form": "उपयोगकर्ता जानकारी फॉर्म",
    "Name": "नाम",
    "Email": "ईमेल",
    "Phone": "फोन",
    "Address": "पता",
    "Select District": "जिला चुनें",
    "Select Taluka": "तालुका चुनें",
    "Select Engineering Branch": "इंजीनियरिंग शाखा चुनें",
    "Enter your message": "अपना संदेश दर्ज करें",
    "Submit": "जमा करें",
    "Select Language": "भाषा चुनें",
    "Upload Profile Picture": "प्रोफ़ाइल चित्र अपलोड करें"
  }
}

export function UserInfoForm() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState("English")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedTaluka, setSelectedTaluka] = useState("")
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = (key: string) => translations[language][key] || key

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    console.log(theme)
  }

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button> */}
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{t("User Information Form")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {profilePicture ? (
                    <Image src={profilePicture} alt="Profile" width={128} height={128} className="object-cover" />
                  ) : (
                    <span className="text-4xl">👤</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                    id="profile-picture-upload"
                  />
                  <Button asChild>
                    <label htmlFor="profile-picture-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      {t("Upload Profile Picture")}
                    </label>
                  </Button>
                </div>
              </div>
              <Input placeholder={t("Name")} />
              <Input type="email" placeholder={t("Email")} />
              <Input type="tel" placeholder={t("Phone")} />
              <Textarea placeholder={t("Address")} />
              <Select onValueChange={(value) => setSelectedDistrict(value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select District")} />
                </SelectTrigger>
                <SelectContent>
                  {districtsData.map((district) => (
                    <SelectItem key={district.name} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSelectedTaluka(value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select Taluka")} />
                </SelectTrigger>
                <SelectContent>
                  {selectedDistrict && districtsData.find(d => d.name === selectedDistrict)?.tahasil.map((taluka) => (
                    <SelectItem key={taluka} value={taluka}>
                      {taluka}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select Engineering Branch")} />
                </SelectTrigger>
                <SelectContent>
                  {engineeringBranches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder={t("Enter your message")} />
              <Button className="w-full">{t("Submit")}</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="w-full bg-secondary mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>A 108 Adam Street</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 7758026057</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@example.com</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15163.83819972304!2d74.60138659177247!3d18.16577723166194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc39ff91bbd5a8d%3A0xd7dc3e270d8c18ab!2sHotel%20Amardeep!5e0!3m2!1sen!2sin!4v1728384433322!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
              <div className="bg-white p-2 rounded-lg inline-block">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="QR Code"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © NPSP All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}