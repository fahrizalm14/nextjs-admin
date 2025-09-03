// components/FileCard.tsx
import {
  RiFileExcelLine,
  RiFilePdfLine,
  RiFileTextLine,
  RiFileWordLine,
  RiFileZipLine,
  RiImageLine,
  RiMusicLine,
  RiVideoLine,
} from "@remixicon/react";

interface FileCardProps {
  name: string;
  type: string;
  size: string;
  lastModified: string;
}

export default function FileCard({
  name,
  type,
  size,
  lastModified,
}: FileCardProps) {
  const getIcon = (fileType: string) => {
    const lowerType = fileType.toLowerCase();

    if (lowerType.includes("image"))
      return <RiImageLine size={24} className="text-primary" />;
    if (lowerType.includes("video"))
      return <RiVideoLine size={24} className="text-primary" />;
    if (lowerType.includes("audio") || lowerType.includes("music"))
      return <RiMusicLine size={24} className="text-accent" />;
    if (lowerType.includes("pdf"))
      return <RiFilePdfLine size={24} className="text-destructive" />;
    if (lowerType.includes("excel") || lowerType.includes("spreadsheet"))
      return (
        <RiFileExcelLine
          size={24}
          className="text-green-500 dark:text-green-400"
        />
      );
    if (lowerType.includes("word") || lowerType.includes("document"))
      return (
        <RiFileWordLine
          size={24}
          className="text-blue-600 dark:text-blue-400"
        />
      );
    if (lowerType.includes("zip") || lowerType.includes("archive"))
      return (
        <RiFileZipLine
          size={24}
          className="text-yellow-500 dark:text-yellow-400"
        />
      );

    return <RiFileTextLine size={24} className="text-muted-foreground" />;
  };

  return (
    <div className="rounded-lg p-4 bg-card text-card-foreground hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-muted rounded-lg">{getIcon(type)}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{name}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">{size}</span>
            <span className="text-xs text-muted-foreground">
              {lastModified}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
