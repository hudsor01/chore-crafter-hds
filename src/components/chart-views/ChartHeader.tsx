
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

type ChartHeaderProps = {
  chartName: string;
  createdAt: string;
  templateType: string;
};

export const ChartHeader = ({ chartName, createdAt, templateType }: ChartHeaderProps) => {
  return (
    <header className="print:text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{chartName}</h1>
      <div className="flex items-center justify-center space-x-2 text-gray-600">
        <Calendar className="h-5 w-5" />
        <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
        <Badge variant="outline">{templateType}</Badge>
      </div>
    </header>
  );
};
