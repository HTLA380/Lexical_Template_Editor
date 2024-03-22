"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FillData = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [meetingDate, setMeetingDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [htmlTemplate, setHtmlTemplate] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const savedTemplate = localStorage.getItem("editorContent");
    if (savedTemplate) {
      setHtmlTemplate(savedTemplate);
    }
  }, []);

  const handleEditTemplate = () => {
    let editedTemplate = htmlTemplate.replace(/{{first-name}}/g, firstName);
    editedTemplate = editedTemplate.replace(/{{meeting-date}}/g, meetingDate);
    editedTemplate = editedTemplate.replace(/{{phone-number}}/g, phoneNumber);
    setHtmlTemplate(editedTemplate);
    localStorage.setItem("editorContent", editedTemplate);
  };

  const handleClick = () => {
    handleEditTemplate();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex h-fit w-96 flex-col gap-3 rounded-md bg-gray-200 p-2">
        <input
          className="w-full px-3 py-1.5 text-sm"
          placeholder="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="w-full px-3 py-1.5 text-sm"
          placeholder="meeting-date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
        />
        <input
          className="w-full px-3 py-1.5 text-sm"
          placeholder="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="mx-auto mt-3 block rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white"
        >
          Fill Data
        </button>
      </div>
    </div>
  );
};

export default FillData;
