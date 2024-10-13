"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfilePictureUploader from "@/components/ui/ProfilePictureUploader";
import { Button } from "@/components/ui/button";
import districtsData from "@/components/districtsData.json";
import translations from '@/components/translation';

// Define the valid language keys
type LanguageKeys = 'en' | 'hi' | 'mr';

const engineeringBranches = [
  "Computer Science", "Information Technology", "Electronics", "Electrical", "Mechanical", "Civil", "Chemical", "Aerospace", "E and TC"
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
  const [eng_branch, setEngBranch] = useState(""); // Added state for engineering branch

  // State for error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for submit button

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
    if (!selectedDistrict) newErrors.dist = translations[language].selectDistrict + " is required.";

    // Validate taluka
    if (!selectedTaluka) newErrors.tal = translations[language].selectTaluka + " is required.";

    // Validate engineering branch
    if (!eng_branch) newErrors.eng_branch = translations[language].selectBranch + " is required.";

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any validation fails
    } else {
      setErrors({}); // Clear errors if the form is valid
      setIsSubmitting(true); // Set submitting state to true
  
      // Prepare data to send to MongoDB
      const formData = {
        name,
        email,
        address,
        message,
        dist: selectedDistrict,
        tal: selectedTaluka,
        phone,
        eng_branch,
        prof_img: profilePicture instanceof File ? await convertToBase64(profilePicture) : profilePicture,
      };
  
      try {
        const response = await fetch('https://wzigldvkde.execute-api.ap-south-1.amazonaws.com/default/engineers-cell-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        console.log('API Response:', result); // Log the response to check structure
  
        if (result.success) {
          // Check if platformId exists in the result
          if (result.platformId) {
            alert(`${translations[language].submit} successful: User added successfully: ${result.platformId}`);
          } else {
            alert(`${translations[language].submit} successful, but platformId not found.`);
          }
          
          // Reset form fields
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setMessage("");
          setSelectedDistrict("");
          setSelectedTaluka("");
          setEngBranch(""); // Reset engineering branch
          setProfilePicture(null); // Reset profile picture
        } else {
          alert(`${translations[language].submit} failed: ${result.message}`);
        }
      } catch (error: unknown) { // Specify a more precise type
        if (error instanceof Error) {
          console.error('Error submitting form:', error);
          alert(`${translations[language].submit} failed: ${error.message}`);
        } else {
          console.error('Unexpected error submitting form:', error);
          alert(`${translations[language].submit} failed: An unexpected error occurred.`);
        }
      } finally {
        setIsSubmitting(false); // Reset submitting state regardless of outcome
      }
    }
  };
  

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
            {errors.dist && <p className="text-red-500">{errors.dist}</p>}
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
            {errors.tal && <p className="text-red-500">{errors.tal}</p>}
            <Select onValueChange={setEngBranch}>
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
            {errors.eng_branch && <p className="text-red-500">{errors.eng_branch}</p>}
            <Textarea 
              placeholder={translations[language].message} 
              value={message} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} 
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? translations[language].submitting : translations[language].submit}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
