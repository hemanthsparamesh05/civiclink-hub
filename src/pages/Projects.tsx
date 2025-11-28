import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { Search } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  progress: number;
  cost: string;
  ward: string;
  contractor: string;
  startDate: string;
  completionDate: string;
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Flyovers",
    "Roads",
    "Drainage",
    "Sanitation",
    "Metro",
    "Parks",
    "Water Supply",
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Flyover at 90 Feet Road",
      category: "Flyover",
      progress: 47,
      cost: "₹85 Crore",
      ward: "Ward 145",
      contractor: "L&T Construction",
      startDate: "Jan 2023",
      completionDate: "Dec 2024",
    },
    {
      id: 2,
      title: "Sewage Line Repair - Koramangala",
      category: "Drainage",
      progress: 60,
      cost: "₹12 Crore",
      ward: "Ward 150",
      contractor: "BBMP Contractors Ltd",
      startDate: "Mar 2023",
      completionDate: "Aug 2024",
    },
    {
      id: 3,
      title: "Public Park Development - HSR Layout",
      category: "Parks",
      progress: 40,
      cost: "₹5 Crore",
      ward: "Ward 185",
      contractor: "Green City Projects",
      startDate: "Feb 2023",
      completionDate: "Oct 2024",
    },
    {
      id: 4,
      title: "Road Widening - Bannerghatta Road",
      category: "Roads",
      progress: 35,
      cost: "₹45 Crore",
      ward: "Ward 188",
      contractor: "Infra Builders Pvt Ltd",
      startDate: "Apr 2023",
      completionDate: "Mar 2025",
    },
    {
      id: 5,
      title: "Water Pipeline Extension - JP Nagar",
      category: "Water Supply",
      progress: 55,
      cost: "₹18 Crore",
      ward: "Ward 178",
      contractor: "Aqua Solutions",
      startDate: "Jan 2023",
      completionDate: "Sep 2024",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" ||
      project.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                    {project.progress}%
                  </p>
                </div>
              </div>

              <Progress value={project.progress} className="mb-4 h-3" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Cost</p>
                  <p className="font-semibold">{project.cost}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ward</p>
                  <p className="font-semibold">{project.ward}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-semibold">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Completion</p>
                  <p className="font-semibold">{project.completionDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Contractor</p>
                  <p className="font-semibold">{project.contractor}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
