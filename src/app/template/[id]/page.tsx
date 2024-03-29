"use client";

import React, { useEffect, useRef, useState } from "react";

import { useLocalStorageContext } from "@/context/LocalStorageContext";
import { TemplateType } from "@/types/templateTypes";
import NotFound from "@/app/not-found";
import Header from "@/components/header/Header";

// =====================================================================

interface EditTemplateInterface {
  params: { id: string };
}
const ViewTemplate: React.FC<EditTemplateInterface> = ({ params }) => {
  const { findTemplate, templates } = useLocalStorageContext();
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>();
  const [loading, setLoading] = useState(true);
  const htmlDivElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const template = findTemplate(params.id);

    if (template) {
      setCurrentTemplate(template);
    }
    setLoading(false);
  }, [params.id, templates]);

  useEffect(() => {
    if (htmlDivElementRef.current && currentTemplate) {
      htmlDivElementRef.current.innerHTML = currentTemplate.editorContent;
    }
  }, [currentTemplate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentTemplate) return <NotFound />;

  return (
    <div>
      <Header />
      <main className="flex h-screen w-full items-center justify-center bg-yellow-100/80 px-5 pb-5 pt-28">
        <div
          className="h-full w-full max-w-5xl overflow-y-scroll rounded-md bg-white p-5 shadow-md"
          ref={htmlDivElementRef}></div>
      </main>
    </div>
  );
};

export default ViewTemplate;
