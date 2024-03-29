"use client";

import React from "react";
import Link from "next/link";
import { useLocalStorageContext } from "@/context/LocalStorageContext";
import { TemplateType } from "@/types/templateTypes";
import Button from "@/components/button/Button";
import { Eye } from "lucide-react";
import Header from "@/components/header/Header";

// ============================================================================

const Template = () => {
  const { templates, deleteTemplate } = useLocalStorageContext();

  const RenderTemplate = ({ template }: { template: TemplateType }) => {
    return (
      <div className="flex w-full items-center justify-center rounded-md border border-gray-800 px-3 py-3">
        <div className="mr-3 border-r border-r-gray-800 p-1">
          <Link
            href={`template/${template.id}`}
            className="block rounded-md p-2 hover:bg-gray-200">
            <Eye size={20} />
          </Link>
        </div>
        <div className="flex-1 text-sm">
          <p>{template.title}</p>
          <p className="text-gray-600">Created At {template.createAt}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/template/edit/${template.id}`}
            className="rounded-md border border-gray-800 bg-gray-800 px-4 py-1.5 text-sm text-white transition-colors hover:bg-transparent hover:text-black">
            Edit
          </Link>
          <Link
            href={`/template/fill/${template.id}`}
            className="rounded-md border border-gray-800 bg-yellow-50 px-4 py-1.5 text-sm text-black transition-colors hover:bg-yellow-100">
            Fill Template
          </Link>
          <Button variant="danger" onClick={() => deleteTemplate(template.id)}>
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <main className="relative px-5 pb-5 pt-24">
      <Header />

      <div className="mx-auto mt-5 flex min-h-screen w-full max-w-5xl flex-col items-center gap-5">
        {templates.length > 0 ? (
          templates.map((template) => (
            <RenderTemplate template={template} key={template.id} />
          ))
        ) : (
          <p className="text-sm">No Template Found</p>
        )}
      </div>
    </main>
  );
};

export default Template;
