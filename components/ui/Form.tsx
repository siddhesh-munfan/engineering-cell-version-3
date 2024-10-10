"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfilePictureUploader from "@/components/ui/ProfilePictureUploader";
import { Button } from "@/components/ui/button";
import districtsData from "@/components/districtsData.json";
import translations from "@/components/translation.json"; // Import translations


const engineeringBranches = [
  "Computer Science", "Information Technology", "Electronics", "Electrical", "Mechanical", "Civil", "Chemical", "Aerospace"
];

const Form = ({
  profilePicture,
  setProfilePicture,
  selectedDistrict,
  setSelectedDistrict,
  selectedTaluka,
  setSelectedTaluka,
  language, // Add language to props
}) => {
  const t = (key: string) => translations[language][key] || key; // Translation function

  // State for form inputs
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
    if (!name) newErrors.name = t("Name is required.");

    // Validate email
    if (!email) {
      newErrors.email = t("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("Email is not valid.");
    }

    // Validate phone
    if (!phone) {
      newErrors.phone = t("Phone number is required.");
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = t("Phone number must be 10 digits.");
    }

    // Validate address
    if (!address) newErrors.address = t("Address is required.");

    // Validate district
    if (!selectedDistrict) newErrors.district = t("District is required.");

    // Validate taluka
    if (!selectedTaluka) newErrors.taluka = t("Taluka is required.");

    // Validate message
    if (!message) newErrors.message = t("Message is required.");

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
          alert('Data submitted successfully');
          // Optionally reset form fields here
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setMessage("");
          setSelectedDistrict("");
          setSelectedTaluka("");
        } else {
          alert('Error submitting data');
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
          <CardTitle className="text-2xl font-bold text-center">{t("User Information Form")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <ProfilePictureUploader profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
            </div>
            <Input 
              placeholder={t("Name")} 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <Input 
              type="email" 
              placeholder={t("Email")} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <Input 
              type="tel" 
              placeholder={t("Phone")} 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            <Textarea 
              placeholder={t("Address")} 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <Select onValueChange={(value) => {
              setSelectedDistrict(value);
              setSelectedTaluka(""); // Reset taluka when district changes
            }}>
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
            {errors.district && <p className="text-red-500">{errors.district}</p>}
            <Select onValueChange={(value) => setSelectedTaluka(value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("Select Taluka")} />
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
            <Textarea 
              placeholder={t("Enter your message")} 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
            <Button className="w-full" type="submit">{t("Submit")}</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Form;