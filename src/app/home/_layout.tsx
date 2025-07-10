import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../context/authProvider";

export default function HomeLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [user]);

  return(
      <Stack screenOptions={{ headerBackVisible: false, headerShown: false }} />


  )
}
