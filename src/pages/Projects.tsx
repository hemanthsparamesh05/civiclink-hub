import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { Search, Download, FileSpreadsheet, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  category: string;
  progress_percent: number;
  cost: number;
  ward: number;
  contractor: string | null;
  start_date: string;
  completion_date: string | null;
  short_description: string;
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const categories = [
    "All",
    "Flyovers",
    "Roads",
    "Drainage",
    "Sanitation",
    "Metro",
    "Parks",
    "Footpath",
    "Others",
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading projects",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    const crores = amount / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" ||
      project.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const downloadFiles = [
    {
      name: "BBMP Budget 2023-24 Tables",
      description: "Complete budget breakdown in Excel format",
      url: "/data/BBMP-Budget-2023-24-Tables.xlsx",
      icon: FileSpreadsheet,
      type: "XLSX"
    },
    {
      name: "BBMP Budget 2023-24 Full Book",
      description: "Official budget document (PDF)",
      url: "/data/BBMP-Budget-2023-24-Full-Book.pdf",
      icon: FileText,
      type: "PDF"
    },
    {
      name: "Budget Highlights 2023-24",
      description: "Summary of key budget allocations",
      url: "/data/BBMP-Budget-2023-24-Highlights.pdf",
      icon: FileText,
      type: "PDF"
    },
    {
      name: "Work Orders Data (2015-18)",
      description: "CE Projects work orders in CSV format",
      url: "/data/bbmp-work-order-data-303-ce-projects-2015-18.csv",
      icon: FileSpreadsheet,
      type: "CSV"
    },
    {
      name: "Ward Work Orders Sample",
      description: "Kempegowda Ward work orders",
      url: "/data/bbmp-ward-001-work-orders.csv",
      icon: FileSpreadsheet,
      type: "CSV"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Ongoing Projects</h1>
          <p className="text-muted-foreground">
            Track all civic infrastructure projects in Bengaluru
          </p>
        </div>

        {/* Download Data Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Download Official Data</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Access official BBMP budget documents and project data from OpenCity Urban Data Portal
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {downloadFiles.map((file, index) => (
              <a
                key={index}
                href={file.url}
                download
                className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors group"
              >
                <file.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                      {file.name}
                    </p>
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {file.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {file.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category.toLowerCase()
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.toLowerCase())}
              >
                {category}
              </Button>
            ))}
          </div>
        </Card>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <Badge className="bg-primary">{project.category}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {project.progress_percent}%
                    </p>
                  </div>
                </div>

                <Progress value={project.progress_percent} className="mb-4 h-3" />

                <p className="text-sm text-muted-foreground mb-4">{project.short_description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Cost</p>
                    <p className="font-semibold">{formatCurrency(project.cost)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ward</p>
                    <p className="font-semibold">Ward {project.ward}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-semibold">{formatDate(project.start_date)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completion</p>
                    <p className="font-semibold">
                      {project.completion_date ? formatDate(project.completion_date) : "TBD"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Contractor</p>
                    <p className="font-semibold">{project.contractor || "N/A"}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
