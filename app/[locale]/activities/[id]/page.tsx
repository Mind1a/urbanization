import { notFound } from "next/navigation";
import ActivityDetails from "@/features/activities/components/ActivityDetails";
import { getActivityById } from "@/features/activities/api/activity.api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActivityPage({ params }: Props) {
  const { id } = await params;

  try {
    await getActivityById(id);
  } catch {
    notFound();
  }

  return <ActivityDetails id={id} />;
}
