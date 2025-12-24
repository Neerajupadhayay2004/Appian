import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight,
  Sparkles,
  ExternalLink,
  Hash
} from "lucide-react";

interface PolicyClause {
  title: string;
  documentName: string;
  pageNumber: number;
  paragraph: string;
  relevance: "high" | "medium" | "low";
  excerpt: string;
}

interface PolicyRecommendationsProps {
  caseType?: string;
}

const getRecommendationsForCase = (caseType: string): PolicyClause[] => {
  const recommendations: Record<string, PolicyClause[]> = {
    Flood: [
      {
        title: "Flood Damage Clause",
        documentName: "Standard Property Insurance Policy v2024",
        pageNumber: 12,
        paragraph: "Section 4.2.1",
        relevance: "high",
        excerpt: "Coverage for direct physical loss caused by flood waters, including structural damage, foundation issues, and water intrusion to finished areas..."
      },
      {
        title: "Emergency Exception Rule",
        documentName: "Standard Property Insurance Policy v2024",
        pageNumber: 18,
        paragraph: "Section 6.1.3",
        relevance: "high",
        excerpt: "In cases of declared natural disasters, emergency living expenses up to 20% of dwelling coverage are automatically approved..."
      },
      {
        title: "Contents Coverage Limit",
        documentName: "Personal Property Addendum",
        pageNumber: 5,
        paragraph: "Clause 2.4",
        relevance: "medium",
        excerpt: "Personal belongings damaged by covered perils are compensated at replacement cost value, subject to policy limits..."
      },
      {
        title: "Basement Water Damage",
        documentName: "Water Damage Rider",
        pageNumber: 3,
        paragraph: "Section 1.2",
        relevance: "high",
        excerpt: "Ground floor and basement flooding from rising water tables or storm surge requires specific endorsement verification..."
      },
    ],
    Fire: [
      {
        title: "Fire & Smoke Damage Coverage",
        documentName: "Standard Property Insurance Policy v2024",
        pageNumber: 8,
        paragraph: "Section 3.1.1",
        relevance: "high",
        excerpt: "Full replacement cost coverage for structures damaged by fire, including smoke damage restoration..."
      },
      {
        title: "Arson Investigation Clause",
        documentName: "Claims Investigation Protocol",
        pageNumber: 22,
        paragraph: "Protocol 5.3",
        relevance: "medium",
        excerpt: "All fire claims exceeding $50,000 require mandatory investigation report before settlement..."
      },
    ],
    Auto: [
      {
        title: "Collision Coverage",
        documentName: "Auto Insurance Policy Standards",
        pageNumber: 15,
        paragraph: "Section 2.1",
        relevance: "high",
        excerpt: "Damage to insured vehicle from collision with another vehicle or object, minus applicable deductible..."
      },
      {
        title: "Total Loss Valuation",
        documentName: "Vehicle Valuation Guidelines",
        pageNumber: 7,
        paragraph: "Clause 3.2.1",
        relevance: "medium",
        excerpt: "When repair costs exceed 70% of actual cash value, vehicle is declared total loss..."
      },
    ],
  };

  return recommendations[caseType] || recommendations.Flood;
};

export function PolicyRecommendations({ caseType = "Flood" }: PolicyRecommendationsProps) {
  const recommendations = getRecommendationsForCase(caseType);

  return (
    <Card variant="elevated" className="animate-slide-up border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="p-2 rounded-lg bg-primary/20 animate-pulse">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          Recommended Policy Clauses
          <Badge variant="glass" className="ml-auto">
            {recommendations.length} Found
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          AI-suggested policy sections relevant to this {caseType.toLowerCase()} damage case
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((clause, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-all cursor-pointer group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    variant={
                      clause.relevance === "high" ? "destructive" : 
                      clause.relevance === "medium" ? "warning" : "outline"
                    }
                    className="text-xs"
                  >
                    {clause.relevance === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {clause.relevance === "medium" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {clause.relevance.toUpperCase()}
                  </Badge>
                  <span className="font-medium text-sm truncate">{clause.title}</span>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {clause.excerpt}
                </p>

                {/* Document Reference - Enhanced Display */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-primary">
                    <FileText className="h-3 w-3" />
                    <span className="font-medium">{clause.documentName}</span>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Hash className="h-3 w-3" />
                    Page {clause.pageNumber}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <BookOpen className="h-3 w-3" />
                    {clause.paragraph}
                  </Badge>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-2 gap-2">
          <BookOpen className="h-4 w-4" />
          View All Policy References
          <ChevronRight className="h-4 w-4 ml-auto" />
        </Button>
      </CardContent>
    </Card>
  );
}
