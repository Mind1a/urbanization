import IliaState from "@/features/team/IliaState";
import TeamMembers from "@/features/team/TeamMembers";
import ServerHydration from "@/features/query/ServerHydration";
import { loadMembers, requireLocale } from "@/lib/server-data";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps) {
  return staticPageMetadata(requireLocale((await params).locale), "team");
}

export default async function TeamPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const members = await loadMembers(locale);
  return (
    <ServerHydration queries={[{ queryKey: ["members", locale], data: members }]}>
      <TeamMembers />
      <IliaState />
    </ServerHydration>
  );
}
