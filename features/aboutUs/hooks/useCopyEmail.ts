"use client";
import { useState } from "react";

export const useCopyEmail = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (email: string) => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, handleCopy };
};
