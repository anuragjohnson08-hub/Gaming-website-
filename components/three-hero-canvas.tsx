"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function ThreeHeroCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let glProbe: WebGL2RenderingContext | WebGLRenderingContext | null = null;
    try {
      const probeCanvas = document.createElement("canvas");
      glProbe =
        probeCanvas.getContext("webgl2") || probeCanvas.getContext("webgl");
    } catch {
      glProbe = null;
    }

    if (!glProbe) {
      setWebglSupported(false);
      return;
    }

    const isSoftwareGl = (() => {
      const ext = glProbe.getExtension("WEBGL_debug_renderer_info");
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : glProbe.RENDERER;
      const gpu = String(glProbe.getParameter(param));
      glProbe.getExtension("WEBGL_lose_context")?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 240);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(width, height);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.5);

    const hemiLight = new THREE.HemisphereLight(0x818cf8, 0x090d16, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfef3c7, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x34d399, 1.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Composite 7-part procedural sculpture (THREE.Group)
    const sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(2.3, 0.1, 0);
    scene.add(sculptureGroup);

    const coreGeo = new THREE.OctahedronGeometry(0.95, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.85,
      roughness: 0.18,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    const innerRingGeo = new THREE.TorusGeometry(1.42, 0.055, 16, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.6,
      roughness: 0.45,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.set(Math.PI * 0.28, Math.PI * 0.15, 0);
    sculptureGroup.add(innerRing);

    const outerRingGeo = new THREE.TorusGeometry(1.88, 0.035, 14, 72);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.92,
      roughness: 0.15,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.set(-Math.PI * 0.22, Math.PI * 0.35, 0.2);
    sculptureGroup.add(outerRing);

    const nodeGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.38, 6);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.7,
      roughness: 0.35,
    });
    const satellitePositions: [number, number, number][] = [
      [1.88, 0.4, 0.3],
      [-1.88, -0.4, -0.3],
      [0.3, 1.65, -0.5],
      [-0.3, -1.65, 0.5],
    ];
    for (const [x, y, z] of satellitePositions) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      node.rotation.set(x * 0.5, y * 0.5, z * 0.5);
      sculptureGroup.add(node);
    }

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let targetRotX = 0.22;
    let targetRotY = -0.38;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === "function") {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = window.requestAnimationFrame(() => {
        renderDirty = false;

        sculptureGroup.rotation.x = THREE.MathUtils.damp(
          sculptureGroup.rotation.x,
          targetRotX,
          6,
          0.016
        );
        sculptureGroup.rotation.y = THREE.MathUtils.damp(
          sculptureGroup.rotation.y,
          targetRotY,
          6,
          0.016
        );

        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          const remaining =
            Math.abs(sculptureGroup.rotation.x - targetRotX) +
            Math.abs(sculptureGroup.rotation.y - targetRotY);
          if (renderDirty || (!isSoftwareGl && remaining > 0.005)) {
            requestRender();
          }
        };

        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = -0.38 + nx * 0.45;
      targetRotX = 0.22 + ny * 0.3;
      requestRender();
    };

    const handleResize = () => {
      const w = Math.max(container.clientWidth, 320);
      const h = Math.max(container.clientHeight, 240);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    requestRender();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      coreGeo.dispose();
      coreMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-indigo-950/20 via-transparent to-emerald-950/15"
      />
    );
  }

  return (
    <div
      ref={mountRef}
      data-testid="three-hero-canvas"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-75"
    />
  );
}
