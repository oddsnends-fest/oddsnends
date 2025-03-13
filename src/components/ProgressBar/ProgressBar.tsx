import { Progress } from "../ui/progress";

function ProgressBar({ progressLevel }: { progressLevel: number }) {
  if (progressLevel < 0 || progressLevel > 1) {
    console.warn("progressLevel must be between 0 and 1");
  }
  const acceptedProgress = Math.max(0, Math.min(1, progressLevel));
  return <Progress value={acceptedProgress * 100} />;
}

export default ProgressBar;
