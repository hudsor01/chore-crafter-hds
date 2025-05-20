
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { age } = await req.json();

    // Define age-appropriate chores by age groups
    const suggestions = getAgeAppropriateChores(age);

    return new Response(
      JSON.stringify({ chores: suggestions }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function getAgeAppropriateChores(age: number) {
  // Chores for ages 2-3
  const toddlerChores = [
    {
      name: "Put Toys Away",
      description: "Place toys in the toy box when done playing",
      icon: "🧸",
      category: "bedroom",
      schedule: { frequency: "daily" }
    },
    {
      name: "Help Make Bed",
      description: "Help pull up covers and arrange pillows",
      icon: "🛏️",
      category: "bedroom",
      schedule: { frequency: "daily" }
    },
    {
      name: "Throw Away Trash",
      description: "Put small trash items in the bin",
      icon: "🗑️",
      category: "household",
      schedule: { frequency: "daily" }
    }
  ];
  
  // Chores for ages 4-5
  const preschoolerChores = [
    ...toddlerChores,
    {
      name: "Set Table",
      description: "Put napkins and silverware on the table",
      icon: "🍽️",
      category: "kitchen",
      schedule: { frequency: "daily" }
    },
    {
      name: "Feed Pets",
      description: "Fill pet food bowls with supervision",
      icon: "🐾",
      category: "pets",
      schedule: { frequency: "daily" }
    },
    {
      name: "Water Plants",
      description: "Help water houseplants with supervision",
      icon: "🪴",
      category: "garden",
      schedule: { frequency: "weekly", daysOfWeek: ["saturday"] }
    }
  ];
  
  // Chores for ages 6-8
  const earlyElementaryChores = [
    ...preschoolerChores,
    {
      name: "Make Bed",
      description: "Make bed neatly without help",
      icon: "🛏️",
      category: "bedroom",
      schedule: { frequency: "daily" }
    },
    {
      name: "Empty Wastebaskets",
      description: "Empty small trash cans into the main bin",
      icon: "🗑️",
      category: "household",
      schedule: { frequency: "weekly", daysOfWeek: ["sunday"] }
    },
    {
      name: "Sort Laundry",
      description: "Sort clothes by color for washing",
      icon: "👕",
      category: "laundry",
      schedule: { frequency: "weekly", daysOfWeek: ["saturday"] }
    },
    {
      name: "Dust Furniture",
      description: "Dust accessible furniture surfaces",
      icon: "🪑",
      category: "cleaning",
      schedule: { frequency: "weekly", daysOfWeek: ["saturday"] }
    }
  ];
  
  // Chores for ages 9-12
  const olderElementaryChores = [
    ...earlyElementaryChores,
    {
      name: "Vacuum Rooms",
      description: "Vacuum bedroom and help with other rooms",
      icon: "🧹",
      category: "cleaning",
      schedule: { frequency: "weekly", daysOfWeek: ["saturday"] }
    },
    {
      name: "Load Dishwasher",
      description: "Properly place dishes in the dishwasher",
      icon: "🍽️",
      category: "kitchen",
      schedule: { frequency: "daily" }
    },
    {
      name: "Make Simple Meals",
      description: "Prepare simple breakfast or lunch",
      icon: "🥪",
      category: "kitchen",
      schedule: { frequency: "weekly", daysOfWeek: ["saturday", "sunday"] }
    },
    {
      name: "Take Out Trash",
      description: "Take trash and recycling bins to the curb",
      icon: "🗑️",
      category: "household",
      schedule: { frequency: "weekly", daysOfWeek: ["thursday"] }
    }
  ];
  
  // Chores for teenagers (13+)
  const teenChores = [
    ...olderElementaryChores,
    {
      name: "Do Laundry",
      description: "Wash, dry, fold and put away own laundry",
      icon: "👕",
      category: "laundry",
      schedule: { frequency: "weekly", daysOfWeek: ["sunday"] }
    },
    {
      name: "Meal Preparation",
      description: "Plan and cook dinner for family",
      icon: "🍲",
      category: "kitchen",
      schedule: { frequency: "weekly", daysOfWeek: ["wednesday"] }
    },
    {
      name: "Mow Lawn",
      description: "Mow the lawn when needed",
      icon: "🌱",
      category: "garden",
      schedule: { frequency: "weekly", daysOfWeek: ["saturday"] }
    },
    {
      name: "Clean Bathroom",
      description: "Clean toilet, sink, tub and floor",
      icon: "🚿",
      category: "bathroom",
      schedule: { frequency: "weekly", daysOfWeek: ["saturday"] }
    },
    {
      name: "Budget Management",
      description: "Track personal spending and savings",
      icon: "💰",
      category: "life skills",
      schedule: { frequency: "weekly", daysOfWeek: ["sunday"] }
    }
  ];
  
  // Return appropriate chores based on age
  if (age <= 3) return toddlerChores;
  if (age <= 5) return preschoolerChores;
  if (age <= 8) return earlyElementaryChores;
  if (age <= 12) return olderElementaryChores;
  return teenChores;
}
