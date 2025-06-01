
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download, FileText, Table } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChoreChart } from "@/contexts/types/choreTypes";
import { DbChoreCompletion } from "@/services/supabaseService";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportDataProps {
  charts: ChoreChart[];
  completions: DbChoreCompletion[];
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const ExportData = ({ charts, completions }: ExportDataProps) => {
  const { toast } = useToast();

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text('Chore Chart Report', 20, 20);
      
      // Summary
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      doc.text(`Total Charts: ${charts.length}`, 20, 45);
      doc.text(`Total Completions: ${completions.length}`, 20, 55);
      
      // Charts summary table
      const chartData = charts.map(chart => [
        chart.name,
        chart.children.length,
        chart.assignments.length,
        new Date(chart.createdAt).toLocaleDateString()
      ]);
      
      doc.autoTable({
        head: [['Chart Name', 'Children', 'Chores', 'Created']],
        body: chartData,
        startY: 70,
        theme: 'grid',
        headStyles: { fillColor: [139, 69, 19] }
      });
      
      // Completions table
      if (completions.length > 0) {
        const completionData = completions.slice(0, 20).map(completion => [
          completion.child_id.substring(0, 8) + '...',
          completion.chore_id.substring(0, 8) + '...',
          new Date(completion.completed_at).toLocaleDateString(),
          completion.verified_by_parent ? 'Yes' : 'No'
        ]);
        
        doc.autoTable({
          head: [['Child ID', 'Chore ID', 'Completed', 'Verified']],
          body: completionData,
          startY: doc.lastAutoTable.finalY + 20,
          theme: 'grid',
          headStyles: { fillColor: [139, 69, 19] }
        });
      }
      
      doc.save('chore-chart-report.pdf');
      
      toast({
        title: "PDF Export Successful",
        description: "Your chore chart report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF report.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    try {
      // Prepare completions data
      const csvData = completions.map(completion => ({
        child_id: completion.child_id,
        chore_id: completion.chore_id,
        completed_at: completion.completed_at,
        verified_by_parent: completion.verified_by_parent,
        notes: completion.notes || '',
        created_at: completion.created_at
      }));
      
      if (csvData.length === 0) {
        toast({
          title: "No Data",
          description: "No completion data to export.",
          variant: "destructive",
        });
        return;
      }
      
      // Convert to CSV
      const headers = Object.keys(csvData[0]);
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => 
          headers.map(header => 
            JSON.stringify(row[header as keyof typeof row] || '')
          ).join(',')
        )
      ].join('\n');
      
      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `chore-completions-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "CSV Export Successful",
        description: "Your completion data has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the CSV file.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="mr-2 h-5 w-5 text-green-600" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={exportToPDF}
            variant="outline"
            className="w-full border-red-300 text-red-700 hover:bg-red-50"
          >
            <FileText className="mr-2 h-4 w-4" />
            Export PDF Report
          </Button>
          
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50"
          >
            <Table className="mr-2 h-4 w-4" />
            Export CSV Data
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>• PDF includes chart summaries and completion overview</p>
          <p>• CSV contains detailed completion data for analysis</p>
        </div>
      </CardContent>
    </Card>
  );
};
