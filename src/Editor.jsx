import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Sparkles,
  Layers,
  Palette,
  Settings,
  Download,
  Upload,
  Trash2,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  ZoomIn,
  ZoomOut,
  Grid,
  Eye,
  EyeOff,
  Wand2,
  Star,
  ImagePlus,
} from "lucide-react";

function Editor() {
  const [image, setImage] = useState(null);
  const [overlayItems, setOverlayItems] = useState([]);
  const [selectedOverlay, setSelectedOverlay] = useState(null);
  const [imageFilter, setImageFilter] = useState("none");
  const [overlayOpacity, setOverlayOpacity] = useState(0.9);
  const [downloadQuality, setDownloadQuality] = useState("high");
  const [overlaySearchTerm, setOverlaySearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overlays");
  const [showGrid, setShowGrid] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(100);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);
  const customOverlayRef = useRef(null);

  const overlays = [
    "/overlays/Asta.png",
    "/overlays/luffy.png",
    "/overlays/saitama.png",
    "/overlays/Zenistu.png",
    "/overlays/Anya.png",
    "/overlays/itachi.png",
    "/overlays/Natsu.png",
    "/overlays/ren.png",
    "/overlays/Rengoku.png",
    "/overlays/Shinobu.png",
    "/overlays/zoro.png",
    "/overlays/zoro1.png",
    "/overlays/naruto.png",
    "/overlays/Sung.png",
    "/overlays/character.webp",
    "/overlays/nezuko.png",
    "/overlays/cute.png",
    "/overlays/girlpink.png",
    "/overlays/onepiece2.png",
    "/overlays/animegirl.png",
    "/overlays/animechar.png",
    "/overlays/onepiece.png",
    "/overlays/animeboy.png",
    "/overlays/chika.png",
    "/overlays/anime.webp",
    "/overlays/onepunchman3.webp",
    "/overlays/onepiece.webp",
    "/overlays/tanjiro.webp",
    "/overlays/onepunchman2.webp",
    "/overlays/naruto3.webp",
    "/overlays/ash.webp",
    "/overlays/naruto2.webp",
    "/overlays/goku3.webp",
    "/overlays/naruto1.webp",
    "/overlays/goku2.webp",
    "/overlays/animegirl4.png",
    "/overlays/naruto4.png",
    "/overlays/naruto5.png",
    "/overlays/animegirl2.png",
    "/overlays/eren.png",
    "/overlays/dazai.png",
    "/overlays/ayankoji.png",
  ];

  const filters = {
    none: { name: "None", icon: "✨" },
    grayscale: { name: "Grayscale", icon: "⚫" },
    sepia: { name: "Sepia", icon: "🟤" },
    blur: { name: "Blur", icon: "💫" },
    brightness: { name: "Bright", icon: "☀️" },
    contrast: { name: "Contrast", icon: "◐" },
    saturate: { name: "Vibrant", icon: "🎨" },
    hue: { name: "Rainbow", icon: "🌈" },
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCustomOverlayUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newOverlay = {
          id: Date.now(),
          src: reader.result,
          position: { x: 100, y: 100 },
          size: 100,
          rotation: 0,
          flipX: false,
          flipY: false,
          isCustom: true,
        };
        setOverlayItems([...overlayItems, newOverlay]);
        setSelectedOverlay(newOverlay.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setOverlayItems([]);
    setSelectedOverlay(null);
  };

  const addOverlay = (src) => {
    const newOverlay = {
      id: Date.now(),
      src,
      position: { x: 100, y: 100 },
      size: 100,
      rotation: 0,
      flipX: false,
      flipY: false,
    };
    setOverlayItems([...overlayItems, newOverlay]);
    setSelectedOverlay(newOverlay.id);
  };

  const updateOverlayPosition = (id, newPosition) => {
    setOverlayItems(
      overlayItems.map((item) =>
        item.id === id ? { ...item, position: newPosition } : item
      )
    );
  };

  const updateOverlaySize = (id, newSize) => {
    setOverlayItems(
      overlayItems.map((item) =>
        item.id === id ? { ...item, size: newSize } : item
      )
    );
  };

  const removeOverlay = (id) => {
    setOverlayItems(overlayItems.filter((item) => item.id !== id));
    if (selectedOverlay === id) setSelectedOverlay(null);
  };

  const handleMouseDown = (e, id) => {
    isDragging.current = true;
    setSelectedOverlay(id);
    const overlay = overlayItems.find((item) => item.id === id);
    dragOffset.current = {
      x: e.clientX - overlay.position.x,
      y: e.clientY - overlay.position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !selectedOverlay) return;
    if (!imageRef.current) return;

    const container = imageRef.current.getBoundingClientRect();
    const overlay = overlayItems.find((item) => item.id === selectedOverlay);
    if (!overlay) return;

    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;

    updateOverlayPosition(selectedOverlay, {
      x: Math.max(0, Math.min(newX, container.width - overlay.size)),
      y: Math.max(0, Math.min(newY, container.height - overlay.size)),
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleDownload = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const container = imageRef.current;

    const img = new Image();
    img.src = image;
    await new Promise((resolve) => (img.onload = resolve));

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const scale = downloadQuality === "high" ? 2 : 1;
    canvas.width = naturalWidth * scale;
    canvas.height = naturalHeight * scale;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (imageFilter !== "none") {
      ctx.filter = `${imageFilter}(${
        imageFilter === "blur"
          ? "4px"
          : imageFilter === "brightness"
          ? "130%"
          : imageFilter === "contrast"
          ? "150%"
          : imageFilter === "saturate"
          ? "200%"
          : imageFilter === "hue"
          ? "180deg"
          : "1"
      })`;
    } else {
      ctx.filter = "none";
    }

    ctx.drawImage(img, 0, 0, naturalWidth * scale, naturalHeight * scale);
    ctx.filter = "none";

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imageAspect = naturalWidth / naturalHeight;
    const containerAspect = containerWidth / containerHeight;

    let displayedWidth, displayedHeight, offsetX, offsetY;

    if (imageAspect > containerAspect) {
      displayedWidth = containerWidth;
      displayedHeight = containerWidth / imageAspect;
    } else {
      displayedHeight = containerHeight;
      displayedWidth = containerHeight * imageAspect;
    }

    offsetX = (containerWidth - displayedWidth) / 2;
    offsetY = (containerHeight - displayedHeight) / 2;
    const scaleFactor = displayedWidth / naturalWidth;

    for (const item of overlayItems) {
      const overlay = new Image();
      overlay.src = item.src;
      await new Promise((resolve) => (overlay.onload = resolve));

      ctx.save();
      ctx.globalAlpha = overlayOpacity;

      const containerX = item.position.x - offsetX;
      const containerY = item.position.y - offsetY;
      const originalX = (containerX / scaleFactor) * scale;
      const originalY = (containerY / scaleFactor) * scale;
      const originalSize = (item.size / scaleFactor) * scale;

      const centerX = originalX + originalSize / 2;
      const centerY = originalY + originalSize / 2;

      ctx.translate(centerX, centerY);
      ctx.rotate(((item.rotation || 0) * Math.PI) / 180);
      ctx.scale(item.flipX ? -1 : 1, item.flipY ? -1 : 1);

      ctx.drawImage(
        overlay,
        -originalSize / 2,
        -originalSize / 2,
        originalSize,
        originalSize
      );

      ctx.restore();
    }

    const link = document.createElement("a");
    link.download = "anime-masterpiece.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [overlayItems, selectedOverlay]);

  const selectedItem = overlayItems.find((item) => item.id === selectedOverlay);

  const filteredOverlays = overlays.filter((src) =>
    src.toLowerCase().includes(overlaySearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background - Yellow theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-yellow-300/15 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Stunning Navbar */}
      <nav className="relative backdrop-blur-xl bg-black/80 border-b border-yellow-400/20 shadow-2xl">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
                <div className="absolute inset-0 blur-xl bg-yellow-400/50"></div>
              </div>
              <a href="/">
                <div>
                  <h1 className="text-lg md:text-2xl font-black text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.4)]">
                    AniCraft Studio
                  </h1>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    Unleash Your Creativity
                  </p>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Desktop Controls */}
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`hidden md:flex p-2 rounded-lg transition-all ${
                  showGrid
                    ? "bg-yellow-400/20 text-yellow-300 shadow-lg shadow-yellow-400/20"
                    : "bg-white/5 hover:bg-white/10"
                }`}
                title="Toggle Grid"
              >
                <Grid className="w-5 h-5" />
              </button>

              <div className="hidden md:flex items-center gap-2 bg-zinc-900/80 border border-yellow-400/20 rounded-lg p-1">
                <button
                  onClick={() => setCanvasZoom(Math.max(50, canvasZoom - 10))}
                  className="p-2 hover:bg-yellow-400/10 rounded transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-medium px-2">{canvasZoom}%</span>
                <button
                  onClick={() => setCanvasZoom(Math.min(200, canvasZoom + 10))}
                  className="p-2 hover:bg-yellow-400/10 rounded transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-bold py-2 px-3 md:py-2.5 md:px-5 rounded-2xl transition-all shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105 text-xs md:text-sm"
              >
                <Upload className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Upload Image</span>
                <span className="sm:hidden">Upload</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              {image && (
                <>
                  <button
                    onClick={handleRemoveImage}
                    className="hidden md:flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 border border-yellow-400/30 text-yellow-200 font-medium py-2.5 px-4 rounded-2xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>

                  {overlayItems.length > 0 && (
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold py-2 px-3 md:py-2.5 md:px-5 rounded-2xl transition-all shadow-lg hover:shadow-yellow-400/60 transform hover:scale-105 text-xs md:text-sm"
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative flex flex-col h-[calc(100vh-73px)] md:flex-row md:h-[calc(100vh-89px)]">
        {/* Canvas Area */}
        <div className="flex-1 p-3 md:p-6 min-h-[50vh] md:min-h-0">
          <div
            ref={imageRef}
            className="h-full bg-gradient-to-br from-zinc-900/50 to-black/80 backdrop-blur-sm border-2 border-yellow-400/10 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-2xl"
            style={{
              backgroundImage: showGrid
                ? "radial-gradient(circle, rgba(255,255,0,0.1) 1px, transparent 1px)"
                : "none",
              backgroundSize: showGrid ? "20px 20px" : "auto",
            }}
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Uploaded"
                  className="absolute w-full h-full object-contain"
                  style={{
                    filter:
                      imageFilter !== "none"
                        ? `${imageFilter}(${
                            imageFilter === "blur"
                              ? "4px"
                              : imageFilter === "brightness"
                              ? "130%"
                              : imageFilter === "contrast"
                              ? "150%"
                              : imageFilter === "saturate"
                              ? "200%"
                              : imageFilter === "hue-rotate"
                              ? "180deg"
                              : "1"
                          })`
                        : "none",
                    transform: `scale(${canvasZoom / 100})`,
                    transition: "transform 0.3s ease",
                  }}
                />

                {overlayItems.map((item) => (
                  <img
                    key={item.id}
                    src={item.src}
                    alt="Overlay"
                    className={`
                      absolute object-contain cursor-grab active:cursor-grabbing
                      transition-all duration-200
                      ${
                        selectedOverlay === item.id
                          ? "ring-4 ring-yellow-400 ring-offset-2 ring-offset-black/50 shadow-2xl shadow-yellow-400/60"
                          : "hover:ring-2 hover:ring-yellow-400/30"
                      }
                    `}
                    style={{
                      width: `${item.size}px`,
                      height: `${item.size}px`,
                      left: `${item.position.x}px`,
                      top: `${item.position.y}px`,
                      opacity: overlayOpacity,
                      transform: `
                        rotate(${item.rotation || 0}deg)
                        scaleX(${item.flipX ? -1 : 1})
                        scaleY(${item.flipY ? -1 : 1})
                        scale(${canvasZoom / 100})
                      `,
                      transformOrigin: "center center",
                    }}
                    onMouseDown={(e) => handleMouseDown(e, item.id)}
                  />
                ))}
              </>
            ) : (
              <div className="text-center z-10 px-4">
                <div className="relative inline-block mb-6">
                  <Camera className="w-16 h-16 md:w-24 md:h-24 text-yellow-400 animate-bounce" />
                  <div className="absolute inset-0 blur-2xl bg-yellow-400/30"></div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.3)]">
                  Start Your Creation
                </h2>
                <p className="text-gray-400 mb-6 text-sm md:text-base">
                  Upload an image and add stunning anime overlays
                </p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all shadow-lg hover:shadow-yellow-400/60 transform hover:scale-105"
                >
                  <Upload className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                  Choose Image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Responsive */}
        <div
          className="
          w-full md:w-96 lg:w-[480px]
          bg-black/95 md:bg-black/60 backdrop-blur-xl 
          border-t md:border-t-0 md:border-l border-yellow-400/10 
          flex flex-col
        "
        >
          {/* Tabs */}
          <div className="flex border-b border-yellow-400/10 bg-zinc-900/50">
            {[
              { id: "overlays", icon: Layers, label: "Overlays" },
              { id: "edit", icon: Wand2, label: "Edit", show: selectedOverlay },
              { id: "filters", icon: Palette, label: "Filters" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map(
              (tab) =>
                tab.show !== false && (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 md:py-4 text-xs md:text-sm font-semibold transition-all relative group ${
                      activeTab === tab.id
                        ? "text-yellow-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <tab.icon className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg shadow-yellow-400/50"></div>
                    )}
                  </button>
                )
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 custom-scrollbar max-h-[50vh] md:max-h-none">
            {activeTab === "overlays" && (
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg md:text-xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.3)] flex items-center gap-2">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    Anime Gallery
                  </h2>
                  <button
                    onClick={() => customOverlayRef.current.click()}
                    className="bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 font-medium py-2 px-3 rounded-lg text-xs transition-all flex items-center gap-1"
                  >
                    <ImagePlus className="w-3 h-3" />
                    Custom
                  </button>
                  <input
                    ref={customOverlayRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomOverlayUpload}
                    className="hidden"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search anime characters..."
                    value={overlaySearchTerm}
                    onChange={(e) => setOverlaySearchTerm(e.target.value)}
                    className="w-full bg-zinc-900/80 backdrop-blur-sm text-white rounded-xl py-3 px-4 text-sm border border-yellow-400/20 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 pl-11 transition-all"
                  />
                  <Sparkles className="w-4 h-4 text-yellow-400 absolute left-4 top-3.5" />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                  {filteredOverlays.map((src, index) => (
                    <div
                      key={index}
                      className="group aspect-square bg-zinc-900/50 backdrop-blur-sm p-1.5 md:p-2 rounded-xl border border-yellow-400/10 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/30 cursor-pointer transition-all transform hover:scale-105 flex items-center justify-center overflow-hidden"
                      onClick={() => addOverlay(src)}
                    >
                      <img
                        src={src}
                        alt={`Overlay ${index + 1}`}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                  {filteredOverlays.length === 0 && (
                    <div className="col-span-3 sm:col-span-4 lg:col-span-5 py-12 text-center text-gray-400">
                      <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No matching overlays found</p>
                    </div>
                  )}
                </div>

                {overlayItems.length > 0 && (
                  <div className="mt-8 p-4 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-yellow-400/20">
                    <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-yellow-400" />
                      Active Layers ({overlayItems.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {overlayItems.map((item) => (
                        <div
                          key={item.id}
                          className={`relative p-1.5 border-2 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                            selectedOverlay === item.id
                              ? "border-yellow-400 shadow-lg shadow-yellow-400/40"
                              : "border-yellow-400/20 hover:border-yellow-400/50"
                          }`}
                          onClick={() => {
                            setSelectedOverlay(item.id);
                            setActiveTab("edit");
                          }}
                        >
                          <img
                            src={item.src}
                            alt="Active overlay"
                            className="w-12 h-12 object-contain"
                          />
                          <button
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg transition-all transform hover:scale-110"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeOverlay(item.id);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "edit" && selectedItem && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.3)] flex items-center gap-2">
                  <Wand2 className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  Transform Overlay
                </h2>

                <div className="space-y-4">
                  <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/20">
                    <label className="flex justify-between mb-3">
                      <span className="text-sm font-bold text-gray-300">
                        Size
                      </span>
                      <span className="text-sm font-mono text-yellow-400">
                        {selectedItem?.size}px
                      </span>
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="400"
                      value={selectedItem?.size || 100}
                      onChange={(e) =>
                        updateOverlaySize(
                          selectedOverlay,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-3 bg-gradient-to-r from-yellow-900/50 to-yellow-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                    />
                  </div>

                  <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/20">
                    <label className="flex justify-between mb-3">
                      <span className="text-sm font-bold text-gray-300">
                        Rotation
                      </span>
                      <span className="text-sm font-mono text-yellow-400">
                        {selectedItem?.rotation || 0}°
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={selectedItem?.rotation || 0}
                      onChange={(e) => {
                        setOverlayItems((items) =>
                          items.map((item) =>
                            item.id === selectedOverlay
                              ? { ...item, rotation: parseInt(e.target.value) }
                              : item
                          )
                        );
                      }}
                      className="w-full h-3 bg-gradient-to-r from-yellow-900/50 to-yellow-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                    />
                  </div>

                  <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/20">
                    <label className="flex justify-between mb-3">
                      <span className="text-sm font-bold text-gray-300">
                        Opacity
                      </span>
                      <span className="text-sm font-mono text-yellow-400">
                        {Math.round(overlayOpacity * 100)}%
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={overlayOpacity * 100}
                      onChange={(e) =>
                        setOverlayOpacity(parseInt(e.target.value) / 100)
                      }
                      className="w-full h-3 bg-gradient-to-r from-yellow-900/50 to-yellow-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      setOverlayItems((items) =>
                        items.map((item) =>
                          item.id === selectedOverlay
                            ? { ...item, flipX: !item.flipX }
                            : item
                        )
                      )
                    }
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      selectedItem?.flipX
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/40"
                        : "bg-zinc-900/70 hover:bg-zinc-800 border border-yellow-400/20 text-white"
                    }`}
                  >
                    <FlipHorizontal className="w-4 h-4" />
                    Flip X
                  </button>

                  <button
                    onClick={() =>
                      setOverlayItems((items) =>
                        items.map((item) =>
                          item.id === selectedOverlay
                            ? { ...item, flipY: !item.flipY }
                            : item
                        )
                      )
                    }
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      selectedItem?.flipY
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/40"
                        : "bg-zinc-900/70 hover:bg-zinc-800 border border-yellow-400/20 text-white"
                    }`}
                  >
                    <FlipVertical className="w-4 h-4" />
                    Flip Y
                  </button>

                  <button
                    onClick={() =>
                      setOverlayItems((items) =>
                        items.map((item) =>
                          item.id === selectedOverlay
                            ? {
                                ...item,
                                rotation: 0,
                                size: 100,
                                flipX: false,
                                flipY: false,
                              }
                            : item
                        )
                      )
                    }
                    className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black shadow-lg shadow-yellow-400/40 transition-all transform hover:scale-105"
                  >
                    <RotateCw className="w-4 h-4" />
                    Reset Transform
                  </button>
                </div>
              </div>
            )}

            {activeTab === "filters" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.3)] flex items-center gap-2">
                  <Palette className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  Apply Filter
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(filters).map(([key, { name, icon }]) => (
                    <button
                      key={key}
                      onClick={() => setImageFilter(key)}
                      className={`p-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border transition-all ${
                        imageFilter === key
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-400/40"
                          : "bg-zinc-900/70 hover:bg-zinc-800 border-yellow-400/20 text-white"
                      }`}
                    >
                      <span>{icon}</span> {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.3)] flex items-center gap-2">
                  <Settings className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  Export Settings
                </h2>

                <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/20 space-y-4">
                  <label className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300">
                      Download Quality
                    </span>
                    <select
                      value={downloadQuality}
                      onChange={(e) => setDownloadQuality(e.target.value)}
                      className="bg-zinc-800 text-yellow-300 border border-yellow-400/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </label>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-300">
                      Show Grid
                    </span>
                    <button
                      onClick={() => setShowGrid(!showGrid)}
                      className={`p-2 rounded-lg transition-all ${
                        showGrid
                          ? "bg-yellow-400/20 text-yellow-300 shadow-lg shadow-yellow-400/20"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {showGrid ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
