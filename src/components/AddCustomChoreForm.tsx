
import React, { useState, useCallback, memo } from "react";
import { Chore, ChoreFrequency, ChoreSchedule, DayOfWeek } from "@/contexts/ChoreContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { BasicFields, FrequencyField } from "./chore-form/FormFields";

type AddCustomChoreFormProps = {
  onAddChore: (chore: Omit<Chore, "id">) => void;
  onCancel: () => void;
};

const DAYS_OF_WEEK: { value: DayOfWeek; label: string }[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const COMMON_EMOJI_CHOICES = [
  { emoji: "🧹", name: "Broom" },
  { emoji: "🧽", name: "Sponge" },
  { emoji: "🧺", name: "Laundry" },
  { emoji: "🍽️", name: "Dishes" },
  { emoji: "🛏️", name: "Bed" },
  { emoji: "🪥", name: "Toothbrush" },
  { emoji: "🧸", name: "Toy" },
  { emoji: "🗑️", name: "Trash" },
  { emoji: "🪴", name: "Plant" },
  { emoji: "🚿", name: "Shower" },
  { emoji: "📚", name: "Books" },
  { emoji: "🧷", name: "Pin" },
  { emoji: "🧴", name: "Lotion" },
  { emoji: "🧦", name: "Sock" },
  { emoji: "🧩", name: "Puzzle" },
];

const DaySelector = memo(({ selectedDays, onDayToggle }: { 
  selectedDays: DayOfWeek[]; 
  onDayToggle: (day: DayOfWeek) => void; 
}) => (
  <div className="space-y-2">
    <Label>Days of Week</Label>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {DAYS_OF_WEEK.map((day) => (
        <div
          key={day.value}
          className="flex items-center space-x-2 rounded-md border border-purple-100 p-2"
        >
          <Checkbox
            id={`day-${day.value}`}
            checked={selectedDays.includes(day.value)}
            onCheckedChange={() => onDayToggle(day.value)}
            className="border-purple-300 text-purple-600 data-[state=checked]:bg-purple-600"
          />
          <Label
            htmlFor={`day-${day.value}`}
            className="cursor-pointer"
          >
            {day.label}
          </Label>
        </div>
      ))}
    </div>
  </div>
));

DaySelector.displayName = 'DaySelector';

const EmojiSelector = memo(({ selectedEmoji, onEmojiSelect }: { 
  selectedEmoji: string; 
  onEmojiSelect: (emoji: string) => void; 
}) => (
  <div className="space-y-2">
    <Label>Choose an Icon</Label>
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-10">
      {COMMON_EMOJI_CHOICES.map((emojiChoice) => (
        <button
          key={emojiChoice.emoji}
          type="button"
          className={`rounded-md p-3 text-2xl hover:bg-purple-100 transition-colors ${
            selectedEmoji === emojiChoice.emoji
              ? "bg-purple-200"
              : "bg-white"
          }`}
          onClick={() => onEmojiSelect(emojiChoice.emoji)}
          title={emojiChoice.name}
        >
          {emojiChoice.emoji}
        </button>
      ))}
    </div>
  </div>
));

EmojiSelector.displayName = 'EmojiSelector';

export const AddCustomChoreForm = memo(({ onAddChore, onCancel }: AddCustomChoreFormProps) => {
  const [choreName, setChoreName] = useState("");
  const [choreDescription, setChoreDescription] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState<ChoreFrequency>("daily");
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState("🧹");

  const handleDayToggle = useCallback((day: DayOfWeek) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day]
    );
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!choreName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for the chore",
        variant: "destructive",
      });
      return;
    }

    if (frequency === "weekly" && selectedDays.length === 0) {
      toast({
        title: "Days required",
        description: "Please select at least one day of the week",
        variant: "destructive", 
      });
      return;
    }

    const schedule: ChoreSchedule = {
      frequency,
      ...(frequency === "weekly" && { daysOfWeek: selectedDays }),
    };

    onAddChore({
      name: choreName.trim(),
      description: choreDescription.trim() || undefined,
      schedule,
      category: category.trim() || undefined,
      icon: selectedEmoji,
    });

    // Reset form
    setChoreName("");
    setChoreDescription("");
    setCategory("");
    setFrequency("daily");
    setSelectedDays([]);
    setSelectedEmoji("🧹");
  }, [choreName, choreDescription, category, frequency, selectedDays, selectedEmoji, onAddChore]);

  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle className="text-purple-800">Add New Chore</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-4">
          <BasicFields
            choreName={choreName}
            choreDescription={choreDescription}
            category={category}
            onChoreNameChange={setChoreName}
            onChoreDescriptionChange={setChoreDescription}
            onCategoryChange={setCategory}
          />

          <FrequencyField
            frequency={frequency}
            onFrequencyChange={setFrequency}
          />

          {frequency === "weekly" && (
            <DaySelector
              selectedDays={selectedDays}
              onDayToggle={handleDayToggle}
            />
          )}

          <EmojiSelector
            selectedEmoji={selectedEmoji}
            onEmojiSelect={setSelectedEmoji}
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Add Chore
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
});

AddCustomChoreForm.displayName = 'AddCustomChoreForm';
