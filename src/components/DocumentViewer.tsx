import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KnowledgeResult } from "@/lib/gemini";
import { 
  FileText, 
  BookmarkPlus, 
  Copy, 
  Download,
  X,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DocumentViewerProps {
  article: KnowledgeResult | null;
  onClose: () => void;
}

export function DocumentViewer({ article, onClose }: DocumentViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (article) {
      navigator.clipboard.writeText(article.content);
      setCopied(true);
      toast.success("Content copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!article) {
    return (
      <Card variant="glass" className="h-full flex items-center justify-center">
        <div className="text-center p-8">
          <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Select an article to view its full content with citations
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 border-b border-border pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="info" className="text-xs uppercase">
                {article.category}
              </Badge>
              <Badge variant="success" className="text-xs">
                {article.relevanceScore}% Relevant
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight line-clamp-2">
              {article.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {article.source} • Page {article.pageNumber}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <CheckCircle2 className="h-3 w-3 mr-1 text-success" />
            ) : (
              <Copy className="h-3 w-3 mr-1" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm">
            <BookmarkPlus className="h-3 w-3 mr-1" />
            Bookmark
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <div className="prose prose-sm prose-invert max-w-none">
          <div className="bg-secondary/30 rounded-lg p-4 mb-6 border border-border">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              Source Reference
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              This content is sourced from <strong>{article.source}</strong>, page {article.pageNumber}.
              Always verify against the original document for legal compliance.
            </p>
            <div className="flex flex-wrap gap-2">
              {article.citations.map((citation, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="font-mono text-xs cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-colors"
                >
                  § {citation}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>

          <div className="mt-8 p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <p className="text-sm text-warning flex items-start gap-2">
              <span className="flex-shrink-0">⚠️</span>
              <span>
                This AI-generated summary is for reference only. Always consult the 
                original source document and verify all citations before making 
                compliance decisions.
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
