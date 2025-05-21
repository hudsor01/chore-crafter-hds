
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit, Printer } from "lucide-react";

type ChartActionBarProps = {
  onBack: () => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
  onCreateSimilar: () => void;
  templateId: string;
};

export const ChartActionBar = ({
  onBack,
  onPrint,
  onDownloadPdf,
  onCreateSimilar,
  templateId
}: ChartActionBarProps) => {
  return (
    <>
      <div className="print:hidden flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onPrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button onClick={onDownloadPdf}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>
      
      <div className="print:hidden flex justify-between mt-6">
        <Button variant="outline" onClick={onCreateSimilar}>
          <Edit className="mr-2 h-4 w-4" /> Create Similar Chart
        </Button>
      </div>
    </>
  );
};
