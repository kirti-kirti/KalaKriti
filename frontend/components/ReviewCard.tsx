import { Star } from "lucide-react";

interface ReviewCardProps {
  review: {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pastel-pink text-foreground rounded-full flex items-center justify-center font-bold">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm">{review.userName}</p>
            <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < review.rating ? "fill-foreground text-foreground" : "text-muted-foreground"}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed italic">
        "{review.comment}"
      </p>
    </div>
  );
}
