
import { useState } from "react";
import { Chore, ChoreFrequency, ChoreSchedule, DayOfWeek } from "@/contexts/ChoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Emoji } from "./Emoji";

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

export function AddCustomChoreForm({ onAddChore, onCancel }: AddCustomChoreFormProps) {
  const [choreName, setChoreName] = useState("");
  const [choreDescription, setChoreDescription] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState<ChoreFrequency>("daily");
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState("🧹");

  const handleDayToggle = (day: DayOfWeek) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
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
  };

  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle className="text-purple-800">Add New Chore</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-4">
          <div>
            <Label htmlFor="chore-name">Chore Name</Label>
            <Input
              id="chore-name"
              value={choreName}
              onChange={(e) => setChoreName(e.target.value)}
              placeholder="Enter chore name"
              className="border-purple-200"
            />
          </div>

          <div>
            <Label htmlFor="chore-description">Description (optional)</Label>
            <Textarea
              id="chore-description"
              value={choreDescription}
              onChange={(e) => setChoreDescription(e.target.value)}
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
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Bedroom, Kitchen, etc."
              className="border-purple-200"
            />
          </div>

          <div>
            <Label htmlFor="chore-frequency">Frequency</Label>
            <Select
              value={frequency}
              onValueChange={(value) => setFrequency(value as ChoreFrequency)}
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

          {frequency === "weekly" && (
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
                      onCheckedChange={() => handleDayToggle(day.value)}
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
          )}

          <div className="space-y-2">
            <Label>Choose an Icon</Label>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-10">
              {COMMON_EMOJI_CHOICES.map((emojiChoice) => (
                <button
                  key={emojiChoice.emoji}
                  type="button"
                  className={`rounded-md p-3 text-2xl hover:bg-purple-100 ${
                    selectedEmoji === emojiChoice.emoji
                      ? "bg-purple-200"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedEmoji(emojiChoice.emoji)}
                  title={emojiChoice.name}
                >
                  {emojiChoice.emoji}
                </button>
              ))}
            </div>
          </div>
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
}
