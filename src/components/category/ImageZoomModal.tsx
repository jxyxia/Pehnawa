
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  productName: string;
}

const ImageZoomModal = ({
  isOpen,
  onClose,
  imageUrl,
  productName,
}: ImageZoomModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    if (zoomLevel < 2.5) {
      setZoomLevel((prev) => prev + 0.5);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel((prev) => prev - 0.5);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-black/90">
        <div className="relative w-full h-full">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
            <X className="h-4 w-4" />
          </DialogClose>
          
          <div className="p-6 flex flex-col items-center overflow-auto">
            <div 
              className="overflow-auto max-h-[70vh] flex items-center justify-center"
              style={{ 
                cursor: zoomLevel > 1 ? "move" : "default"
              }}
            >
              <img
                src={imageUrl}
                alt={productName}
                className="transition-transform duration-200 max-h-[70vh]"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
              />
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
              </Button>
              <span className="text-white text-sm px-2">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoomModal;
