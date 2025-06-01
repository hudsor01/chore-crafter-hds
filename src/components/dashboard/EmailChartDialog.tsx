
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface EmailChartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
}

export const EmailChartDialog = ({ 
  isOpen, 
  onClose, 
  onSend, 
  email, 
  onEmailChange 
}: EmailChartDialogProps) => {
  const handleSend = () => {
    if (email.trim()) {
      onSend(email);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email Chore Chart</DialogTitle>
          <DialogDescription>
            Send this chart to a parent or child.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter recipient email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handleSend} disabled={!email.trim()}>
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
