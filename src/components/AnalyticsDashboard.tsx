import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  FileCheck, 
  Clock, 
  Award,
  Target,
  Zap
} from "lucide-react";

// Case statistics data
const casesByType = [
  { name: "Flood", cases: 45, color: "hsl(var(--primary))" },
  { name: "Fire", cases: 32, color: "hsl(var(--destructive))" },
  { name: "Theft", cases: 28, color: "hsl(var(--warning))" },
  { name: "Auto", cases: 52, color: "hsl(var(--success))" },
  { name: "Health", cases: 38, color: "hsl(var(--accent))" },
];

const resolutionData = [
  { month: "Jan", resolved: 85, pending: 15, rate: 85 },
  { month: "Feb", resolved: 88, pending: 12, rate: 88 },
  { month: "Mar", resolved: 82, pending: 18, rate: 82 },
  { month: "Apr", resolved: 91, pending: 9, rate: 91 },
  { month: "May", resolved: 94, pending: 6, rate: 94 },
  { month: "Jun", resolved: 96, pending: 4, rate: 96 },
];

const teamPerformance = [
  { name: "Sarah J.", casesHandled: 48, avgTime: 3.2, satisfaction: 98 },
  { name: "Mike R.", casesHandled: 42, avgTime: 3.8, satisfaction: 95 },
  { name: "Emily C.", casesHandled: 45, avgTime: 3.5, satisfaction: 97 },
  { name: "John D.", casesHandled: 38, avgTime: 4.1, satisfaction: 92 },
  { name: "Lisa M.", casesHandled: 51, avgTime: 2.9, satisfaction: 99 },
];

const weeklyTrend = [
  { day: "Mon", cases: 12 },
  { day: "Tue", cases: 18 },
  { day: "Wed", cases: 15 },
  { day: "Thu", cases: 22 },
  { day: "Fri", cases: 28 },
  { day: "Sat", cases: 8 },
  { day: "Sun", cases: 5 },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--warning))",
  "hsl(var(--success))",
  "hsl(var(--accent))",
];

export function AnalyticsDashboard() {
  const totalCases = casesByType.reduce((sum, c) => sum + c.cases, 0);
  const avgResolutionRate = Math.round(
    resolutionData.reduce((sum, d) => sum + d.rate, 0) / resolutionData.length
  );
  const topPerformer = teamPerformance.reduce((prev, curr) => 
    curr.casesHandled > prev.casesHandled ? curr : prev
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "0ms" }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">{totalCases}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/20">
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-success mt-2">+12% from last month</p>
          </CardContent>
        </Card>

        <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold">{avgResolutionRate}%</p>
              </div>
              <div className="p-2 rounded-lg bg-success/20">
                <Target className="h-5 w-5 text-success" />
              </div>
            </div>
            <p className="text-xs text-success mt-2">+5.2% improvement</p>
          </CardContent>
        </Card>

        <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg. Handle Time</p>
                <p className="text-2xl font-bold">3.5h</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/20">
                <Clock className="h-5 w-5 text-warning" />
              </div>
            </div>
            <p className="text-xs text-success mt-2">-18% faster</p>
          </CardContent>
        </Card>

        <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold">{teamPerformance.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-accent/20">
                <Users className="h-5 w-5 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">All online</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cases by Type - Pie Chart */}
        <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Cases by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={casesByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="cases"
                  >
                    {casesByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {casesByType.map((item, index) => (
                <Badge 
                  key={item.name} 
                  variant="outline" 
                  className="text-xs"
                  style={{ borderColor: COLORS[index % COLORS.length] }}
                >
                  {item.name}: {item.cases}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resolution Rate Trend */}
        <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "250ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Resolution Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resolutionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success) / 0.2)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Case Volume */}
        <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary" />
              Weekly Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Table */}
      <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "350ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Award className="h-4 w-4 text-warning" />
            Team Performance
            <Badge variant="success" className="ml-2">
              Top: {topPerformer.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Agent</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Cases</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Avg Time</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((agent, index) => (
                  <tr 
                    key={agent.name} 
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-2 px-3 font-medium">
                      {agent.name}
                      {agent.name === topPerformer.name && (
                        <Badge variant="warning" className="ml-2 text-xs">MVP</Badge>
                      )}
                    </td>
                    <td className="text-center py-2 px-3">{agent.casesHandled}</td>
                    <td className="text-center py-2 px-3">{agent.avgTime}h</td>
                    <td className="text-center py-2 px-3">
                      <Badge variant={agent.satisfaction >= 95 ? "success" : "outline"}>
                        {agent.satisfaction}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
