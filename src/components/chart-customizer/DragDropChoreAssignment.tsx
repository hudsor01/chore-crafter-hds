
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chore, Child, ChoreAssignment } from "@/contexts/types/choreTypes";

type DragDropChoreAssignmentProps = {
  children: Child[];
  allChores: Chore[];
  assignments: ChoreAssignment[];
  setAssignments: (assignments: ChoreAssignment[]) => void;
};

export const DragDropChoreAssignment = ({
  children,
  allChores,
  assignments,
  setAssignments
}: DragDropChoreAssignmentProps) => {
  const getUnassignedChores = () => {
    const assignedChoreIds = assignments.map(a => a.choreId);
    return allChores.filter(chore => !assignedChoreIds.includes(chore.id));
  };

  const getChoresForChild = (childId: string) => {
    return assignments
      .filter(a => a.childId === childId)
      .map(a => allChores.find(chore => chore.id === a.choreId))
      .filter(Boolean) as Chore[];
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Moving from unassigned to a child
    if (source.droppableId === 'unassigned' && destination.droppableId.startsWith('child-')) {
      const childId = destination.droppableId.replace('child-', '');
      const newAssignment: ChoreAssignment = {
        choreId: draggableId,
        childId: childId
      };
      setAssignments([...assignments, newAssignment]);
    }
    // Moving from a child back to unassigned
    else if (source.droppableId.startsWith('child-') && destination.droppableId === 'unassigned') {
      setAssignments(assignments.filter(a => a.choreId !== draggableId));
    }
    // Moving between children
    else if (source.droppableId.startsWith('child-') && destination.droppableId.startsWith('child-')) {
      const newChildId = destination.droppableId.replace('child-', '');
      setAssignments(assignments.map(a => 
        a.choreId === draggableId ? { ...a, childId: newChildId } : a
      ));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg">Available Chores</CardTitle>
          </CardHeader>
          <CardContent>
            <Droppable droppableId="unassigned">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[100px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                    snapshot.isDraggingOver ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
                  }`}
                >
                  {getUnassignedChores().length === 0 ? (
                    <p className="text-gray-500 text-center">All chores assigned!</p>
                  ) : (
                    getUnassignedChores().map((chore, index) => (
                      <Draggable key={chore.id} draggableId={chore.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 mb-2 bg-white border rounded-lg shadow-sm cursor-move transition-transform ${
                              snapshot.isDragging ? 'transform rotate-3 shadow-lg' : 'hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="mr-2 text-lg">{chore.icon}</span>
                              <span className="font-medium">{chore.name}</span>
                              <Badge variant="outline" className="ml-auto">
                                {chore.schedule.frequency}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {children.map((child) => (
            <Card key={child.id} className="border-indigo-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  {child.name}
                  <Badge variant="secondary">
                    {getChoresForChild(child.id).length} chores
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={`child-${child.id}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[150px] p-3 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'
                      }`}
                    >
                      {getChoresForChild(child.id).map((chore, index) => (
                        <Draggable key={chore.id} draggableId={chore.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-2 mb-2 bg-white border rounded-md shadow-sm cursor-move transition-transform ${
                                snapshot.isDragging ? 'transform rotate-2 shadow-lg' : 'hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="mr-2">{chore.icon}</span>
                                <span className="text-sm font-medium">{chore.name}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
