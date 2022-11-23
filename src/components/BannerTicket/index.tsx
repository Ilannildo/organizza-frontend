import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export type Item = {
  Name: string;
  Caption: string;
  contentPosition: "left" | "right" | "middle";
  Items: { Name: string; Image: string }[];
};

interface BannerProps {
  item: Item;
  contentPosition: "left" | "right" | "middle";
  length?: number;
}

export const BannerTicket = (props: BannerProps) => {
  return (
    <Card>
      <CardContent>
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>

        <Button variant="outlined" className="ViewButton">
          View Now
        </Button>
      </CardContent>
    </Card>
  );
};
