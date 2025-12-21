import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  History, 
  BookOpen,
  Settings,
  HelpCircle,
  ChevronRight
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true, badge: null },
  { icon: FileText, label: "Active Cases", active: false, badge: "12" },
  { icon: FolderOpen, label: "Documents", active: false, badge: null },
  { icon: BookOpen, label: "Knowledge Base", active: false, badge: "New" },
  { icon: History, label: "History", active: false, badge: null },
];

const bottomItems = [
  { icon: HelpCircle, label: "Help & Support" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card/30 flex flex-col h-[calc(100vh-64px)]">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 h-11 ${
              item.active ? "bg-secondary/80 text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge 
                variant={item.badge === "New" ? "info" : "secondary"} 
                className="text-[10px] h-5"
              >
                {item.badge}
              </Badge>
            )}
            {item.active && <ChevronRight className="h-4 w-4" />}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        {bottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <div className="p-4 rounded-lg bg-gradient-glass border border-primary/20">
          <p className="text-xs font-medium text-foreground mb-1">AI Usage Today</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold gradient-text">47</span>
            <span className="text-xs text-muted-foreground mb-1">queries</span>
          </div>
          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-[47%] bg-gradient-primary rounded-full" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">53 remaining today</p>
        </div>
      </div>
    </aside>
  );
}
