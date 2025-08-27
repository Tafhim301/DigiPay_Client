import { publicTourSteps } from "@/constant/publicTourSteps";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { useEffect, useState } from "react";
import Joyride, {type CallBackProps, type Step } from "react-joyride";

export default function TourProvider() {
  const { isLoading } = useUserInfoQuery(undefined);

  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    if (!isLoading && !localStorage.getItem("tourSeen")) {
    
      const availableSteps = publicTourSteps.filter(
        step => !!document.querySelector(step.target)
      );

      if (availableSteps.length > 0) {
        setSteps(availableSteps);
        setRun(true);
      }
    }
  }, [isLoading]);

  const handleTour = (data: CallBackProps) => {
    const { status } = data;

    if (!isLoading && ["finished", "skipped"].includes(status)) {
      localStorage.setItem("tourSeen", "true");
      setRun(false);
    }
  };

  if (isLoading) return null; 

  return (
    <Joyride
      steps={steps}
      run={run && steps.length > 0}
      continuous
      showSkipButton
      scrollToFirstStep
      callback={handleTour}
      styles={{ options: { primaryColor: "#4f46e5", zIndex: 10000 } }}
      locale={{ last: "Next" }}
    />
  );
}
