import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askQuestion, CaseContext } from "@/lib/gemini";
import { 
  MessageSquare, 
  Send, 
  Loader2,
  Lightbulb,
  X
} from "lucide-react";

interface AskQuestionProps {
  caseContext: CaseContext;
}

const suggestedQuestions = [
  "What are the coverage limits for this type of claim?",
  "What documentation is required for approval?",
  "Are there any state-specific regulations to consider?",
  "What is the standard processing timeline?",
];

export function AskQuestion({ caseContext }: AskQuestionProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (q?: string) => {
    const queryQuestion = q || question;
    if (!queryQuestion.trim()) return;

    setIsLoading(true);
    setAnswer("");

    try {
      const response = await askQuestion(queryQuestion, caseContext);
      setAnswer(response);
    } catch (error) {
      setAnswer("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedClick = (q: string) => {
    setQuestion(q);
    handleSubmit(q);
  };

  return (
    <Card variant="elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Ask a Question
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Ask about regulations, policies, or procedures related to this case..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[80px] pr-12 resize-none bg-secondary/50 border-border focus:border-primary"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            size="icon"
            variant="gradient"
            className="absolute bottom-3 right-3"
            onClick={() => handleSubmit()}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!answer && !isLoading && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1.5 px-3"
                  onClick={() => handleSuggestedClick(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}

        {answer && (
          <div className="relative bg-secondary/50 rounded-lg p-4 border border-border animate-fade-in">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => setAnswer("")}
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="pr-8">
              <p className="text-xs text-primary font-medium mb-2">AI Response</p>
              <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {answer}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
