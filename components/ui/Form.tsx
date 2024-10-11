"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Textarea  from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfilePictureUploader from "@/components/ui/ProfilePictureUploader";
import { Button } from "@/components/ui/button";
import districtsData from "@/components/districtsData.json";
import translations from '@/components/translation';

// Define the valid language keys
type LanguageKeys = 'en' | 'hi' | 'mr';

const engineeringBranches = [
  "Computer Science", "Information Technology", "Electronics", "Electrical", "Mechanical", "Civil", "Chemical", "Aerospace"
];

// Define the props interface
interface FormProps {
  profilePicture: string | File | null; // Allow File type
  setProfilePicture: (picture: string | File | null) => void; // Allow File type
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedTaluka: string;
  setSelectedTaluka: (taluka: string) => void;
  language: LanguageKeys; // Use the defined type here
}

export default function Form({
  profilePicture,
  setProfilePicture,
  selectedDistrict,
  setSelectedDistrict,
  selectedTaluka,
  setSelectedTaluka,
  language,
}: FormProps) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  // State for error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate name
    if (!name) newErrors.name = translations[language].name + " is required.";

    // Validate email
    if (!email) {
      newErrors.email = translations[language].email + " is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = translations[language].email + " is not valid.";
    }

    // Validate phone
    if (!phone) {
      newErrors.phone = translations[language].phoneNumber + " is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = translations[language].phoneNumber + " must be 10 digits.";
    }

    // Validate address
    if (!address) newErrors.address = translations[language].address + " is required.";

    // Validate district
    if (!selectedDistrict) newErrors.district = translations[language].selectDistrict + " is required.";

    // Validate taluka
    if (!selectedTaluka) newErrors.taluka = translations[language].selectTaluka + " is required.";

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any validation fails
    } else {
      setErrors({}); // Clear errors if the form is valid

      // Prepare data to send to MongoDB
      const formData = {
        name,
        email,
        phone,
        address,
        selectedDistrict,
        selectedTaluka,
        message,
      };

      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        
        if (result.success) {
          alert(translations[language].submit + ' successful');
          // Optionally reset form fields here
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setMessage("");
          setSelectedDistrict("");
          setSelectedTaluka("");
        } else {
          alert(translations[language].submit + ' failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      
      // console.log(formData); // For debugging purposes
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{translations[language].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <ProfilePictureUploader profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
            </div>
            <Input 
              placeholder={translations[language].name} 
              value={name} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <Input 
              type="email" 
              placeholder={translations[language].email} 
              value={email} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <Input 
              type="number" 
              placeholder={translations[language].phoneNumber} 
              value={phone} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} 
              required
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            <Textarea 
              placeholder={translations[language].address} 
              value={address} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)} 
              required
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <Select onValueChange={(value) => {
              setSelectedDistrict(value);
              setSelectedTaluka(""); // Reset taluka when district changes
            }}>
              <SelectTrigger>
                <SelectValue placeholder={translations[language].selectDistrict} />
              </SelectTrigger>
              <SelectContent>
                {districtsData.map((district) => (
                  <SelectItem key={district.name} value={district.name}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.district && <p className="text-red-500">{errors.district}</p>}
            <Select onValueChange={(value) => setSelectedTaluka(value)}>
              <SelectTrigger>
                <SelectValue placeholder={translations[language].selectTaluka} />
              </SelectTrigger>
              <SelectContent>
                {selectedDistrict &&
                  districtsData
                    .find((d) => d.name === selectedDistrict)
                    ?.tahasil.map((taluka) => (
                      <SelectItem key={taluka} value={taluka}>
                        {taluka}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
            {errors.taluka && <p className="text-red-500">{errors.taluka}</p>}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={translations[language].selectBranch} />
              </SelectTrigger>
              <SelectContent>
                {engineeringBranches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea 
              placeholder={translations[language].message} 
              value={message} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} 
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
            <Button className="w-full" type="submit">{translations[language].submit}</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}