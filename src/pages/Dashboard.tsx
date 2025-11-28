import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ComplaintCard from "@/components/ComplaintCard";
import ProjectCard from "@/components/ProjectCard";
import BudgetChart from "@/components/BudgetChart";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [recentComplaints, setRecentComplaints] = useState<any[]>([]);
  const [ongoingProjects, setOngoingProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent complaints
      const { data: complaintsData } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      // Fetch ongoing projects
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .order("progress_percent", { ascending: false })
        .limit(3);

      if (complaintsData) {
        setRecentComplaints(complaintsData.map(c => ({
          category: c.category,
          description: c.description,
          timeAgo: getTimeAgo(c.created_at)
        })));
      }

      if (projectsData) {
        setOngoingProjects(projectsData.map(p => ({
          title: p.title,
          category: p.category,
          progress: p.progress_percent,
          progressLabel: `${p.progress_percent}%`
        })));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left space-y-4">
              <h1 className="text-5xl font-bold text-foreground">CivicLink</h1>
              <p className="text-xl text-muted-foreground">A Transparent Bengaluru Interface</p>
              <Link to="/submit-complaint">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                  Submit Complaint
                </Button>
              </Link>
            </div>

            {/* Complaints Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Complaints</h2>
              <div className="space-y-1">
                {recentComplaints.map((complaint, index) => (
                  <ComplaintCard key={index} {...complaint} />
                ))}
              </div>
              <Link to="/track-complaints">
                <Button variant="link" className="mt-4 text-primary p-0">
                  Track Complaints
                </Button>
              </Link>
            </Card>

            {/* Budget Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Budget & Tax</h2>
              <div className="text-center mb-4">
                <p className="text-xl font-semibold">FY 2023-24</p>
              </div>
              <BudgetChart />
              <Link to="/budget">
                <Button variant="link" className="mt-4 text-primary p-0">
                  View budget usage
                </Button>
              </Link>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Project Dashboard */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Project Dashboard</h2>
              
              {/* Map Placeholder */}
              <div className="w-full h-[280px] bg-muted rounded-lg mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-8 w-full h-full p-8">
                    <MapPin className="text-primary w-8 h-8" style={{ gridColumn: 2, gridRow: 1 }} />
                    <MapPin className="text-primary w-8 h-8" style={{ gridColumn: 1, gridRow: 2 }} />
                    <MapPin className="text-primary w-8 h-8" style={{ gridColumn: 3, gridRow: 2 }} />
                    <MapPin className="text-primary w-8 h-8" style={{ gridColumn: 2, gridRow: 3 }} />
                    <MapPin className="text-primary w-8 h-8" style={{ gridColumn: 1, gridRow: 3 }} />
                    <MapPin className="text-primary w-8 h-8" style={{ gridColumn: 3, gridRow: 1 }} />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-blue-50/30"></div>
              </div>

              <div className="space-y-1">
                <ProjectCard
                  title="Flyover at 80 Feet Road"
                  category="Flyover"
                  progress={70}
                  progressLabel="10%"
                />
                <ProjectCard
                  title="Sewage Line Repair"
                  category="Drainage"
                  progress={60}
                  progressLabel="60%"
                />
              </div>
              
              <Link to="/projects">
                <Button variant="link" className="mt-4 text-primary p-0">
                  View all projects
                </Button>
              </Link>
            </Card>

            {/* Budget Summary */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Budget & Tax</h2>
              <div className="text-center mb-6">
                <p className="text-xl font-semibold">FY 2023-24</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-chart-roads"></div>
                    <span className="text-sm">Roads & Infrastructure</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-chart-sanitation"></div>
                    <span className="text-sm">Sanitation</span>
                  </div>
                  <span className="text-xs text-muted-foreground">50m ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-chart-safety"></div>
                    <span className="text-sm">Public Safety</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-chart-education"></div>
                    <span className="text-sm">Education</span>
                  </div>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
