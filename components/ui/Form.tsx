"use client";

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

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("User Information Form")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <ProfilePictureUploader profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
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
  );
};

export default Form;
