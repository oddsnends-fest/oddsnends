import Signature from "@/components/Signature";
import { useState } from "react";
export default function SignaturePage() {
  const [base64ImageUrl, setbase64ImageUrl] = useState<string|null>(null); 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Signature base64ImageUrl={base64ImageUrl} setBase64ImageUrl={setbase64ImageUrl} />
    </div>
  );
}