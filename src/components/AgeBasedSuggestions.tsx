
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus } from 'lucide-react';
import { getAgeAppropriateChores } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import { Child } from '@/contexts/types/choreTypes';

interface AgeBasedSuggestionsProps {
  child: Child;
  onAddChore?: (chore: any) => void;
}

const AgeBasedSuggestions = ({ child, onAddChore }: AgeBasedSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const fetchSuggestions = async () => {
    if (!child.birthdate) {
      toast({
        title: "Birthdate required",
        description: "Please add a birthdate to get age-appropriate suggestions.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const age = calculateAge(child.birthdate);
      const { chores } = await getAgeAppropriateChores(age);
      setSuggestions(chores);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch age-appropriate chores.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!child.birthdate) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-gray-500">
            Add a birthdate for {child.name} to get age-appropriate chore suggestions.
          </p>
        </CardContent>
      </Card>
    );
  }

  const age = calculateAge(child.birthdate);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
          Age-Appropriate Chores for {child.name}
        </CardTitle>
        <CardDescription>
          Suggested chores for {age} year old children
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length === 0 && (
          <Button 
            onClick={fetchSuggestions} 
            disabled={isLoading}
            className="w-full"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Getting suggestions...' : 'Get AI Suggestions'}
          </Button>
        )}
        
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {suggestions.length} suggestions found
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchSuggestions}
                disabled={isLoading}
              >
                Refresh
              </Button>
            </div>
            
            <div className="grid gap-3 max-h-64 overflow-y-auto">
              {suggestions.map((chore, index) => (
                <div 
                  key={index} 
                  className="p-3 border rounded-lg flex justify-between items-start space-x-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {chore.icon && <span>{chore.icon}</span>}
                      <h4 className="font-medium text-sm">{chore.name}</h4>
                    </div>
                    {chore.description && (
                      <p className="text-xs text-gray-500 mb-2">{chore.description}</p>
                    )}
                    {chore.category && (
                      <Badge variant="secondary" className="text-xs">
                        {chore.category}
                      </Badge>
                    )}
                  </div>
                  {onAddChore && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onAddChore(chore)}
                      className="shrink-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgeBasedSuggestions;
