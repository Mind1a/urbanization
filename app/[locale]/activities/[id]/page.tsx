import { notFound } from "next/navigation";
import ActivityDetails from "@/features/activities/components/ActivityDetails";
import { activities } from "../../../../features/activities/components/data/activitiesData";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActivityPage({ params }: Props) {
  const { id } = await params;

  const activity = activities.find((item) => item.id === id);

  if (!activity) {
    notFound();
  }

  console.log(id);

  return <ActivityDetails activity={activity} />;
}
