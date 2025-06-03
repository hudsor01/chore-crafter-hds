
import React, { memo } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChoreFrequency } from "@/contexts/ChoreContext";

interface BasicFieldsProps {
  choreName: string;
  choreDescription: string;
  category: string;
  onChoreNameChange: (value: string) => void;
  onChoreDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

interface FrequencyFieldProps {
  frequency: ChoreFrequency;
  onFrequencyChange: (value: ChoreFrequency) => void;
}

export const BasicFields = memo(({ 
  choreName, 
  choreDescription, 
  category, 
  onChoreNameChange, 
  onChoreDescriptionChange, 
  onCategoryChange 
}: BasicFieldsProps) => (
  <>
    <div>
      <Label htmlFor="chore-name">Chore Name</Label>
      <Input
        id="chore-name"
        value={choreName}
        onChange={(e) => onChoreNameChange(e.target.value)}
        placeholder="Enter chore name"
        className="border-purple-200"
      />
    </div>

    <div>
      <Label htmlFor="chore-description">Description (optional)</Label>
      <Textarea
        id="chore-description"
        value={choreDescription}
        onChange={(e) => onChoreDescriptionChange(e.target.value)}
        placeholder="Enter a description"
        className="border-purple-200 resize-none"
        rows={2}
      />
    </div>

    <div>
      <Label htmlFor="chore-category">Category (optional)</Label>
      <Input
        id="chore-category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        placeholder="e.g., Bedroom, Kitchen, etc."
        className="border-purple-200"
      />
    </div>
  </>
));

BasicFields.displayName = 'BasicFields';

export const FrequencyField = memo(({ frequency, onFrequencyChange }: FrequencyFieldProps) => (
  <div>
    <Label htmlFor="chore-frequency">Frequency</Label>
    <Select
      value={frequency}
      onValueChange={(value) => onFrequencyChange(value as ChoreFrequency)}
    >
      <SelectTrigger className="border-purple-200">
        <SelectValue placeholder="Select frequency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
        <SelectItem value="custom">Custom</SelectItem>
      </SelectContent>
    </Select>
  </div>
));

FrequencyField.displayName = 'FrequencyField';
