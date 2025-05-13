
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const StatCard = ({ title, value, icon, trend, description }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              {trend && (
                <span
                  className={`text-xs font-medium ${
                    trend.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {trend.isPositive ? "+" : "-"}
                  {trend.value}%
                </span>
              )}
            </div>
          </div>

          <div className="bg-muted p-2 rounded-lg">{icon}</div>
        </div>

        {description && (
          <p className="text-xs text-muted-foreground mt-3">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
