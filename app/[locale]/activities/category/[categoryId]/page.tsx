import { notFound } from "next/navigation";
import Activities from "@/features/activities/Activities";
import { getActivityCategories } from "@/features/activities/api/activity.api";

type Props = {
  params: Promise<{ locale: string; categoryId: string }>;
};

export default async function ActivityCategoryPage({ params }: Props) {
  const { locale, categoryId } = await params;
  const id = Number(categoryId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const categories = await getActivityCategories(locale);
  const category = categories.find((item) => item.id === id);

  if (!category) {
    notFound();
  }

  return <Activities categoryId={category.id} categoryName={category.category_name} />;
}
