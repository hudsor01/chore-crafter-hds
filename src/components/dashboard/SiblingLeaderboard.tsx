
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award } from "lucide-react";
import { Child } from "@/contexts/types/choreTypes";
import { DbChoreCompletion } from "@/services/supabaseService";

interface LeaderboardProps {
  children: Child[];
  completions: DbChoreCompletion[];
}

interface ChildStats {
  child: Child;
  completedChores: number;
  verifiedChores: number;
  completionRate: number;
  streak: number;
}

export const SiblingLeaderboard = ({ children, completions }: LeaderboardProps) => {
  const calculateChildStats = (): ChildStats[] => {
    return children.map(child => {
      const childCompletions = completions.filter(c => c.child_id === child.id);
      const verifiedCompletions = childCompletions.filter(c => c.verified_by_parent);
      
      // Calculate streak (consecutive days with completions)
      const sortedCompletions = childCompletions
        .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
      
      let streak = 0;
      const today = new Date();
      let currentDate = new Date(today);
      
      for (let i = 0; i < 7; i++) {
        const dayCompletions = sortedCompletions.filter(c => {
          const completionDate = new Date(c.completed_at);
          return completionDate.toDateString() === currentDate.toDateString();
        });
        
        if (dayCompletions.length > 0) {
          streak++;
        } else {
          break;
        }
        
        currentDate.setDate(currentDate.getDate() - 1);
      }

      return {
        child,
        completedChores: childCompletions.length,
        verifiedChores: verifiedCompletions.length,
        completionRate: childCompletions.length > 0 ? (verifiedCompletions.length / childCompletions.length) * 100 : 0,
        streak
      };
    }).sort((a, b) => b.verifiedChores - a.verifiedChores);
  };

  const childStats = calculateChildStats();
  const maxVerified = Math.max(...childStats.map(s => s.verifiedChores), 1);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="h-6 w-6 flex items-center justify-center text-gray-500 font-bold">{index + 1}</div>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "border-yellow-200 bg-yellow-50";
      case 1:
        return "border-gray-200 bg-gray-50";
      case 2:
        return "border-amber-200 bg-amber-50";
      default:
        return "border-gray-200";
    }
  };

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          Sibling Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {childStats.map((stats, index) => (
          <div
            key={stats.child.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-md ${getRankColor(index)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getRankIcon(index)}
                <div>
                  <h3 className="font-semibold text-lg">{stats.child.name}</h3>
                  <p className="text-sm text-gray-600">
                    {stats.verifiedChores} verified chores
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {stats.streak > 0 && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    🔥 {stats.streak} day streak
                  </Badge>
                )}
                <Badge variant="outline">
                  {Math.round(stats.completionRate)}% verified
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{stats.verifiedChores}/{maxVerified}</span>
              </div>
              <Progress 
                value={(stats.verifiedChores / maxVerified) * 100}
                className="h-2"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-3 text-center text-sm">
              <div>
                <div className="font-semibold text-blue-600">{stats.completedChores}</div>
                <div className="text-gray-500">Total</div>
              </div>
              <div>
                <div className="font-semibold text-green-600">{stats.verifiedChores}</div>
                <div className="text-gray-500">Verified</div>
              </div>
              <div>
                <div className="font-semibold text-purple-600">{stats.streak}</div>
                <div className="text-gray-500">Streak</div>
              </div>
            </div>
          </div>
        ))}
        
        {childStats.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="mx-auto h-12 w-12 mb-2 text-gray-300" />
            <p>No children added yet. Add children to see the leaderboard!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
