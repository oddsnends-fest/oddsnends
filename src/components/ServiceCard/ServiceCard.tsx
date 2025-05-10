import { Card, CardContent, CardTitle } from "../ui/card";

export default function ServiceCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full text-custom-purple">
      <CardTitle className="pt-4 text-center text-base text-shadow-none">
        {title}
      </CardTitle>
      <CardContent className="whitespace-pre-line p-4 text-center text-sm text-shadow-none">
        {children}
      </CardContent>
    </Card>
  );
}
