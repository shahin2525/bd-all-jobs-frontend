import HeroSection from "@/components/modules/home/hero-section";
import { getCurrentUser } from "@/services/AuthServices";

const HomePage = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default HomePage;
