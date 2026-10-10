import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CustomCakeForm from "@/components/CustomCakeForm";

export const metadata: Metadata = { title: "Custom Cake – CakeShop" };

export default function CustomCakePage() {
  return (
    <PageShell
      title="Design Your Custom Cake"
      subtitle="Pick your flavor, size and message. We'll bake it fresh and deliver it on the day you choose."
    >
      <CustomCakeForm />
    </PageShell>
  );
}
