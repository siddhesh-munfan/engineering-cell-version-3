"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import test_image from "@/components/assets/user.png"

export default function Footer() {
  return (
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
                src={test_image}
                alt="QR Code"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
