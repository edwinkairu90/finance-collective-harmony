
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccountingSoftware } from "@/types/integrations";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface AccountingSoftwareCardProps {
  software: AccountingSoftware;
  onConnect: (softwareId: string) => void;
  onDisconnect: (softwareId: string) => void;
  onSync: (softwareId: string) => void;
}

export const AccountingSoftwareCard = ({
  software,
  onConnect,
  onDisconnect,
  onSync
}: AccountingSoftwareCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              {/* Use logo or fallback to first letter of name */}
              {software.logo ? (
                <img src={software.logo} alt={software.name} className="w-6 h-6 object-contain" />
              ) : (
                <span className="text-sm font-bold">{software.name.charAt(0)}</span>
              )}
            </div>
            <CardTitle className="text-lg">{software.name}</CardTitle>
          </div>
          <Badge variant={software.isConnected ? "success" : "outline"}>
            {software.isConnected ? "Connected" : "Not Connected"}
          </Badge>
        </div>
        <CardDescription>{software.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {software.isConnected && software.lastSync && (
          <p className="text-sm text-muted-foreground">
            Last synced: {formatDistanceToNow(new Date(software.lastSync))} ago
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end pt-2 space-x-2 border-t">
        {software.isConnected ? (
          <>
            <Button variant="outline" size="sm" onClick={() => onSync(software.id)}>
              Sync Data
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDisconnect(software.id)}>
              Disconnect
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={() => onConnect(software.id)}>
            Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
