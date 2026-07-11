import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerStrength;

varying float vElevation;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vUv = uv;
  vec3 pos = position;

  vec2 nc = pos.xy * 1.0;
  float speed = uTime * 0.02;

  float n1 = fbm(nc + speed);
  float n2 = fbm(nc * 2.0 - speed * 0.7);
  float n3 = fbm(nc * 0.5 + speed * 1.1);

  float elevation = n1 * 0.5 + n2 * 0.25 + n3 * 0.25;

  vec2 pp = uPointer;
  float d = distance(uv, pp);
  float ripple = sin(d * 20.0 - uTime * 3.5) * 0.04 * uPointerStrength;
  ripple *= exp(-d * 5.0);

  pos.z = (elevation - 0.45) * 0.3 + ripple;
  vElevation = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerStrength;

varying float vElevation;
varying vec2 vUv;

void main() {
  vec3 lightPeriwinkle = vec3(0.847, 0.886, 1.0);
  vec3 softBlue        = vec3(0.753, 0.796, 0.941);
  vec3 mediumPeriwinkle = vec3(0.655, 0.718, 0.906);
  vec3 deeperBlue      = vec3(0.584, 0.651, 0.878);

  float h = vElevation * 3.2 + 0.5;
  vec3 col = mix(lightPeriwinkle, softBlue, smoothstep(0.1, 0.4, h));
  col = mix(col, mediumPeriwinkle, smoothstep(0.35, 0.55, h));
  col = mix(col, deeperBlue, smoothstep(0.55, 0.8, h));

  float d = distance(vUv, uPointer);
  float glow = exp(-d * 4.5) * 0.3 * uPointerStrength;
  col += softBlue * glow * 0.6;
  col += vec3(1.0) * glow * 0.2;

  float vg = 1.0 - length(vUv - 0.5) * 0.3;
  col *= vg;

  float grain = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.005;

  gl_FragColor = vec4(col, 0.55);
}
`

export default function LiquidHeroCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 50)
    camera.position.set(0, 2.5, 5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.3, 0.5) },
      uPointerStrength: { value: 0 },
    }

    const geo = new THREE.PlaneGeometry(8, 8, 96, 96)
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = -0.2
    mesh.position.y = 0.5
    scene.add(mesh)

    const particleCount = 60
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0xFFFFFF),
      opacity: 0.35,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    const getPointerUV = (clientX, clientY) => {
      const rect = container.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * 2 - 1
      const y = -((clientY - rect.top) / rect.height) * 2 + 1
      pointer.set(x, y)
      raycaster.setFromCamera(pointer, camera)

      const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(mesh.quaternion)
      const pl = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, mesh.position)
      const denom = planeNormal.dot(raycaster.ray.direction)

      if (Math.abs(denom) > 0.0001) {
        const t = -(planeNormal.dot(raycaster.ray.origin) + pl.constant) / denom
        if (t > 0) {
          const point = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(t))
          const local = mesh.worldToLocal(point)
          return new THREE.Vector2(local.x / 4 * 0.5 + 0.5, local.y / 4 * 0.5 + 0.5)
        }
      }
      return null
    }

    let targetStr = 0
    let curStr = 0
    let lastPtr = 0
    let ptrActive = false

    const onMove = (e) => {
      const uv = getPointerUV(e.clientX, e.clientY)
      if (uv) {
        uniforms.uPointer.value.copy(uv)
        targetStr = Math.min(1, targetStr + 0.3)
        lastPtr = performance.now()
        ptrActive = true
      }
    }
    const onLeave = () => { ptrActive = false }
    const onEnter = () => { ptrActive = true }
    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) {
        const uv = getPointerUV(t.clientX, t.clientY)
        if (uv) {
          uniforms.uPointer.value.copy(uv)
          targetStr = Math.min(1, targetStr + 0.2)
          lastPtr = performance.now()
          ptrActive = true
        }
      }
    }

    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerleave', onLeave)
    container.addEventListener('pointerenter', onEnter)
    container.addEventListener('touchmove', onTouch, { passive: true })

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const timer = new THREE.Timer()
    let frameId


    const animate = () => {
      frameId = requestAnimationFrame(animate)
      timer.update()
      const elapsed = timer.getElapsed()
      uniforms.uTime.value = elapsed

      const now = performance.now()
      if (ptrActive && now - lastPtr > 300) targetStr = Math.max(0, targetStr - 0.02)
      else if (!ptrActive) targetStr = Math.max(0, targetStr - 0.01)
      curStr += (targetStr - curStr) * 0.05
      uniforms.uPointerStrength.value = curStr

      mesh.rotation.x = -0.2 + Math.sin(elapsed * 0.02) * 0.015
      mesh.rotation.z = Math.sin(elapsed * 0.015) * 0.01
      mesh.position.y = 0.5 + Math.sin(elapsed * 0.03) * 0.03

      particles.rotation.y = elapsed * 0.003
      particleMat.opacity = 0.2 + Math.sin(elapsed * 0.01) * 0.08

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
      container.removeEventListener('pointerenter', onEnter)
      container.removeEventListener('touchmove', onTouch)
      if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      geo.dispose()
      mat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
