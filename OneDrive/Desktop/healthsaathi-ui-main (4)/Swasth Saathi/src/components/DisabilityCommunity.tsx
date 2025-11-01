import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Heart, TrendingUp } from "lucide-react";

export default function DisabilityCommunity() {
  const communityGroups = [
    {
      name: "Mobility Support Group",
      members: 234,
      category: "Mobility",
      description: "Connect with others navigating mobility challenges",
      active: true,
    },
    {
      name: "Visual Impairment Community",
      members: 156,
      category: "Vision",
      description: "Share experiences and accessibility tips",
      active: true,
    },
    {
      name: "Hearing Support Network",
      members: 189,
      category: "Hearing",
      description: "Resources and support for hearing challenges",
      active: false,
    },
    {
      name: "Mental Health Warriors",
      members: 312,
      category: "Mental Health",
      description: "Safe space for mental health discussions",
      active: true,
    },
  ];

  const recentStories = [
    {
      author: "Priya S.",
      disability: "Wheelchair User",
      title: "Found an amazing accessible restaurant!",
      likes: 45,
      time: "2 hours ago",
    },
    {
      author: "Rahul M.",
      disability: "Visual Impairment",
      title: "New voice assistant app changed my life",
      likes: 67,
      time: "5 hours ago",
    },
    {
      author: "Anita K.",
      disability: "Mobility",
      title: "Tips for accessible travel in India",
      likes: 92,
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-elevated space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">👥 Community Connection</h2>
          <p className="text-muted-foreground">
            Connect with others who understand your journey. You're not alone.
          </p>
        </div>

        <div className="grid gap-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Support Groups
          </h3>
          {communityGroups.map((group, index) => (
            <Card
              key={index}
              className="p-4 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{group.name}</h4>
                    {group.active && (
                      <Badge variant="secondary" className="text-xs">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
                <Badge>{group.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {group.members} members
                </div>
                <Button size="sm">Join Group</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-elevated space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Community Stories
        </h3>
        <div className="grid gap-3">
          {recentStories.map((story, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 bg-gradient-primary" />
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="font-semibold">{story.author}</div>
                    <div className="text-xs text-muted-foreground">{story.disability}</div>
                  </div>
                  <p className="text-sm">{story.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      {story.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Reply
                    </button>
                    <span>{story.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-primary text-white shadow-glow">
        <h3 className="text-xl font-bold mb-2">💪 Share Your Story</h3>
        <p className="mb-4 text-white/90">
          Your experience can inspire and help others. Share your journey with the community.
        </p>
        <Button variant="secondary">Create Post</Button>
      </Card>
    </div>
  );
}
