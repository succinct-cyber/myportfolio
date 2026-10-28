import { getProfile } from "@/lib/api";
import { ContactBlock } from "@/components/sections";

export const metadata = { title: "Contact", description: "Get in touch with Yomi Fabiyi about software development opportunities and projects." };

export default async function ContactPage() {
  const profile = await getProfile();
  return <section className="container-x pt-16 md:pt-24"><ContactBlock profile={profile} level="h1" /></section>;
}
