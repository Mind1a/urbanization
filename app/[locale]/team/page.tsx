"use client"
import IliaState from "@/features/team/IliaState";
import Skeleton from "@/features/team/Skeleton";
import TeamMembers from "@/features/team/TeamMembers";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <Skeleton />
  }
  return (
    <>
      <TeamMembers />
      <IliaState />
    </>
  );
};

export default Page;
