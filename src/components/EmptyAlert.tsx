import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface EmptyAlertProps {
  alertTitle?: string;
  alertDescription?: string;
}

export default function EmptyAlert({
  alertTitle,
  alertDescription,
}: EmptyAlertProps) {
  return (
    <Alert>
      <div className="flex  space-x-1 items-center ">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
      </div>
    </Alert>
  );
}
