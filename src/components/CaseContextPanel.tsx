import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CaseContext } from "@/lib/gemini";
import { 
  FileText, 
  MapPin, 
  DollarSign, 
  Hash, 
  User, 
  Calendar,
  AlertCircle 
} from "lucide-react";

interface CaseContextPanelProps {
  caseData: CaseContext;
}

export function CaseContextPanel({ caseData }: CaseContextPanelProps) {
  const getClaimTypeBadge = (type: string) => {
    const typeMap: Record<string, "destructive" | "warning" | "info" | "success"> = {
      "Flood": "info",
      "Fire": "destructive",
      "Theft": "warning",
      "Auto": "secondary" as any,
      "Medical": "success",
    };
    return typeMap[type] || "default";
  };

  return (
    <Card variant="elevated" className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Active Case
          </CardTitle>
          <Badge variant={getClaimTypeBadge(caseData.claimType)}>
            {caseData.claimType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
              <Hash className="h-3 w-3" />
              Policy Number
            </div>
            <p className="font-mono text-sm">{caseData.policyNumber}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
              <MapPin className="h-3 w-3" />
              State
            </div>
            <p className="text-sm font-medium">{caseData.state}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
              <DollarSign className="h-3 w-3" />
              Claim Amount
            </div>
            <p className="text-sm font-medium text-accent">{caseData.claimAmount}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
              <Calendar className="h-3 w-3" />
              Incident Date
            </div>
            <p className="text-sm">{caseData.dateOfIncident}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide mb-2">
            <User className="h-3 w-3" />
            Customer
          </div>
          <p className="text-sm font-medium">{caseData.customerName}</p>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide mb-2">
            <AlertCircle className="h-3 w-3" />
            Description
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {caseData.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
