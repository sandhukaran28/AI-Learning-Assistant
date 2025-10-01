import React, { useRef, useState, useEffect } from "react";

/**
 * Mobile-first, auto-play two videos in sequence
 * ---------------------------------------------
 * - Fixed top banner: "AI Learning Assistant"
 * - First video plays, then second video auto-plays after it ends
 * - Video fills the remaining viewport height
 */

export default function AILearningVideo() {
  const [src, setSrc] = useState("/scene-1.mp4");
  const vidRef = useRef(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;

    const handleEnded = () => {
      if (src === "/scene-1.mp4") {
        setSrc("/scene-2.mp4");
      }
    };

    v.addEventListener("ended", handleEnded);
    return () => v.removeEventListener("ended", handleEnded);
  }, [src]);

  const HEADER_H = 56; // px

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={{ ...styles.header, height: HEADER_H }}>
        <div style={styles.headerInner}>AI Learning Assistant</div>
      </div>

      {/* Video area */}
      <div style={{ ...styles.videoWrap, height: `calc(100vh - ${HEADER_H}px)` }}>
        <video
          ref={vidRef}
          key={src}
          src={src}
          controls={false}
          playsInline
          autoPlay={true}
          style={styles.video}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0a0a0a",
    color: "#f5f5f5",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    WebkitFontSmoothing: "antialiased",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif",
  },
  header: {
    position: "relative",
    width: "100%",
    background: "#0f1115",
    borderBottom: "1px solid #1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerInner: {
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: 0.2,
  },
  videoWrap: {
    position: "relative",
    width: "100%",
    background: "black",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // change to 'contain' if you prefer letterboxing
    background: "black",
  },
};