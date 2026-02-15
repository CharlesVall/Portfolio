type Color = "red" | "blue" | "green" | "purple";

export interface WorkData {
  color: Color;
  imageUrl: string;
  imageTitle: string;
  imageAlt: string;
  workTitle: string;
  workAlt: string;
  description: string;
  reverseOnMobile?: boolean;
}
