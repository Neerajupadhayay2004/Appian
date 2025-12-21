import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KnowledgeResult } from "@/lib/gemini";
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  Scale, 
  ClipboardList,
  ChevronRight,
  ExternalLink,
  Loader2
} from "lucide-react";

interface KnowledgeSuggestionsProps {
  suggestions: KnowledgeResult[];
  isLoading: boolean;
  onSelectArticle: (article: KnowledgeResult) => void;
}

export function KnowledgeSuggestions({ 
  suggestions, 
  isLoading, 
  onSelectArticle 
}: KnowledgeSuggestionsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, typeof BookOpen> = {
      regulation: Scale,
      policy: FileText,
      procedure: ClipboardList,
      legal: BookOpen,
    };
    return icons[category] || BookOpen;
  };

  const getCategoryColor = (category: string): "info" | "success" | "warning" | "secondary" => {
    const colors: Record<string, "info" | "success" | "warning" | "secondary"> = {
      regulation: "info",
      policy: "success",
      procedure: "warning",
      legal: "secondary",
    };
    return colors[category] || "secondary";
  };

  if (isLoading) {
    return (
      <Card variant="elevated" className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            AI Knowledge Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-muted-foreground text-sm">Analyzing case context...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="h-full overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Knowledge Suggestions
          </CardTitle>
          <Badge variant="glass" className="text-xs">
            {suggestions.length} Results
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 overflow-y-auto max-h-[calc(100vh-300px)] scrollbar-thin">
        {suggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-sm">
              No suggestions yet. Case context will trigger automatic knowledge retrieval.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((article, index) => {
              const Icon = getCategoryIcon(article.category);
              const isExpanded = expandedId === article.id;
              
              return (
                <div
                  key={article.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`group p-4 rounded-lg border transition-all duration-200 cursor-pointer
                      ${isExpanded 
                        ? 'bg-secondary/80 border-primary/30 shadow-glow' 
                        : 'bg-secondary/40 border-border hover:bg-secondary/60 hover:border-primary/20'
                      }`}
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg transition-colors
                          ${isExpanded ? 'bg-primary/20' : 'bg-muted group-hover:bg-primary/10'}`}>
                          <Icon className={`h-4 w-4 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getCategoryColor(article.category)} className="text-[10px] uppercase">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {article.relevanceScore}% match
                            </span>
                          </div>
                          <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {article.source} • Page {article.pageNumber}
                          </p>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0
                          ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} 
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {article.content}
                        </p>
                        
                        <div className="mb-4">
                          <p className="text-xs font-medium text-foreground mb-2">Citations:</p>
                          <div className="flex flex-wrap gap-2">
                            {article.citations.map((citation, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs font-mono">
                                {citation}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          size="sm" 
                          variant="gradient"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectArticle(article);
                          }}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Full Document
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
