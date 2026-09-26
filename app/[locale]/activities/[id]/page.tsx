import { notFound } from "next/navigation";
import ActivityDetails from "@/features/activities/components/ActivityDetails";
import { getActivityById } from "@/features/activities/api/activity.api";

type Props = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function ActivityPage({ params }: Props) {
  const { id, locale } = await params;

  try {
    await getActivityById(locale, id);
  } catch {
    notFound();
  }

  return <ActivityDetails id={id} />;
}
