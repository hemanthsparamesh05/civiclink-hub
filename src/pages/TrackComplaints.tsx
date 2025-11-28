import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Search, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Complaint {
  id: string;
  category: string;
  description: string;
  location: string;
  status: "open" | "review" | "resolved";
  date: string;
  updatedAt: string;
}

const TrackComplaints = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const complaints: Complaint[] = [
    {
      id: "#1234",
      category: "Potholes",
      description: "Please fix the potholes on 5th Cross, Indiranagar",
      location: "5th Cross, Indiranagar",
      status: "review",
      date: "2024-01-15",
      updatedAt: "30m ago",
    },
    {
      id: "#1235",
      category: "Streetlight",
      description: "Streetlight not working on 1st Phase, Koramangala",
      location: "1st Phase, Koramangala",
      status: "open",
      date: "2024-01-15",
      updatedAt: "13m ago",
    },
    {
      id: "#1236",
      category: "Garbage",
      description: "Garbage collection not happening on 12th Main, JP Nagar",
      location: "12th Main, JP Nagar",
      status: "resolved",
      date: "2024-01-14",
      updatedAt: "43m ago",
    },
    {
      id: "#1237",
      category: "Water",
      description: "Water supply disrupted for 3 days",
      location: "BTM Layout",
      status: "review",
      date: "2024-01-14",
      updatedAt: "42m ago",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-5 h-5" />;
      case "review":
        return <Clock className="w-5 h-5" />;
      case "resolved":
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-destructive";
      case "review":
        return "bg-yellow-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open";
      case "review":
        return "Under Review";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Track Complaints</h1>
          <p className="text-muted-foreground">
            Monitor the status of your submitted complaints
          </p>
        </div>

        {/* Search */}
        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by ID or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-primary">{complaint.category}</Badge>
                    <span className="text-sm font-mono text-muted-foreground">
                      {complaint.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {complaint.description}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    📍 {complaint.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Submitted: {complaint.date} • Updated: {complaint.updatedAt}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    className={`${getStatusColor(complaint.status)} text-white flex items-center gap-2`}
                  >
                    {getStatusIcon(complaint.status)}
                    {getStatusText(complaint.status)}
                  </Badge>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      complaint.status === "open" ||
                      complaint.status === "review" ||
                      complaint.status === "resolved"
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  ></div>
                  <span className="text-xs">Open</span>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      complaint.status === "review" || complaint.status === "resolved"
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  ></div>
                  <span className="text-xs">Review</span>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      complaint.status === "resolved" ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                  <span className="text-xs">Resolved</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackComplaints;
