
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface QuickLinkItem {
  icon: LucideIcon;
  label: string;
  path: string;
  color: string;
}

interface QuickLinksProps {
  links: QuickLinkItem[];
}

export const QuickLinks = ({ links }: QuickLinksProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {links.map((link, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate(link.path)}
        >
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className={`p-3 rounded-full mb-4 ${link.color}`}>
              <link.icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium">{link.label}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
