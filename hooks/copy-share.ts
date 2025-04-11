import { toast } from "sonner";

export const copyColor = (text: string) => {
  navigator.clipboard.writeText(text);
  toast("Copied", {
    description: `${text} has been copied to clipboard`,
    duration: 2000,
  });
};

export const shareColor = (color: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this color",
        text: `I found this amazing color: ${color}`,
        url: `${window.location.origin}?color=${encodeURIComponent(color.substring(1))}`,
      })
      .catch(console.error);
  } else {
    const url = `${window.location.origin}?color=${encodeURIComponent(color.substring(1))}`;
    copyColor(url);
    toast("Share link copied!", {
      description: "Share link has been copied to clipboard",
      duration: 2000,
    });
  }
};
