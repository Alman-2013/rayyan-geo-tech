import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardClient
      user={{
        email: user.email ?? "",
        full_name: user.user_metadata?.full_name ?? "RGT Customer",
      }}
    />
  );
}