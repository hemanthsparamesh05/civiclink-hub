import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Search, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Complaint {
  id: string;
  category: string;
  description: string;
  location: any;
  status: string;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

const TrackComplaints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .or(`citizen_id.eq.${user?.id},is_anonymous.eq.true`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setComplaints(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading complaints",
        description: error.message,
        variant: "destructive",
      });
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="w-5 h-5" />;
      case "Under Review":
        return <Clock className="w-5 h-5" />;
      case "Resolved":
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-destructive";
      case "Under Review":
        return "bg-yellow-500";
      case "Resolved":
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Open":
        return "Open";
      case "Under Review":
        return "Under Review";
      case "Resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Please log in to track your complaints.</p>
        </div>
      </div>
    );
  }

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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading complaints...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No complaints found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-primary">{complaint.category}</Badge>
                      <span className="text-sm font-mono text-muted-foreground">
                        {complaint.is_anonymous ? "Anonymous" : ""}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {complaint.description}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      📍 {complaint.location?.address || "Location not specified"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {formatDate(complaint.created_at)} • Updated: {getTimeAgo(complaint.updated_at)}
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
                        complaint.status === "Open" ||
                        complaint.status === "Under Review" ||
                        complaint.status === "Resolved"
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    ></div>
                    <span className="text-xs">Open</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        complaint.status === "Under Review" || complaint.status === "Resolved"
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    ></div>
                    <span className="text-xs">Review</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        complaint.status === "Resolved" ? "bg-primary" : "bg-muted"
                      }`}
                    ></div>
                    <span className="text-xs">Resolved</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackComplaints;
