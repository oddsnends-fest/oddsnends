import { Progress } from "../ui/progress";

function ProgressBar({ progressLevel }: { progressLevel: number }) {
  const progress = progressLevel ?? 0;

  if (!(progress >= 0 && progress <= 1)) {
    console.warn("progressLevel must be between 0 and 1");
  }

  const acceptedProgress = Math.max(0, Math.min(1, progress));
  return <Progress value={acceptedProgress * 100} />;
}

export default ProgressBar;
