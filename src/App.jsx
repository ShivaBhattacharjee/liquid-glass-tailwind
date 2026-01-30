import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const presets = {
  dock: {
    width: 336,
    height: 96,
    radius: 16,
    border: 0.07,
    lightness: 50,
    blend: 'difference',
    alpha: 0.93,
    blur: 11,
    scale: -180,
    displace: 0.2,
    frost: 0.05,
    icons: true,
    r: 0,
    g: 10,
    b: 20,
    saturation: 1,
    x: 'R',
    y: 'B',
  },
  pill: {
    width: 200,
    height: 80,
    radius: 40,
    border: 0.07,
    lightness: 50,
    blend: 'difference',
    alpha: 0.93,
    blur: 11,
    scale: -180,
    displace: 0,
    frost: 0,
    icons: false,
    r: 0,
    g: 10,
    b: 20,
    saturation: 1,
    x: 'R',
    y: 'B',
  },
  bubble: {
    width: 140,
    height: 140,
    radius: 70,
    border: 0.07,
    lightness: 50,
    blend: 'difference',
    alpha: 0.93,
    blur: 11,
    scale: -180,
    displace: 0,
    frost: 0,
    icons: false,
    r: 0,
    g: 10,
    b: 20,
    saturation: 1,
    x: 'R',
    y: 'B',
  },
}

const navImages = [
  'https://assets.codepen.io/605876/finder.png',
  'https://assets.codepen.io/605876/launch-control.png',
  'https://assets.codepen.io/605876/safari.png',
  'https://assets.codepen.io/605876/calendar.png',
]

const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
]

const modes = ['dock', 'pill', 'bubble']

const App = () => {
  const [mode, setMode] = useState('dock')
  const [config, setConfig] = useState(presets.dock)

  const effectRef = useRef(null)
  const debugRef = useRef(null)
  const placeholderRef = useRef(null)
  const configRef = useRef(config)

  useEffect(() => {
    configRef.current = config
  }, [config])

  const buildDisplacementImage = () => {
    const cfg = configRef.current
    const border = Math.min(cfg.width, cfg.height) * (cfg.border * 0.5)
    
    const svgContent = `
      <svg class="displacement-image" viewBox="0 0 ${cfg.width} ${cfg.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${cfg.width}" height="${cfg.height}" fill="black"></rect>
        <rect x="0" y="0" width="${cfg.width}" height="${cfg.height}" rx="${cfg.radius}" fill="url(#red)" />
        <rect x="0" y="0" width="${cfg.width}" height="${cfg.height}" rx="${cfg.radius}" fill="url(#blue)" style="mix-blend-mode: ${cfg.blend}" />
        <rect x="${border}" y="${border}" width="${cfg.width - border * 2}" height="${cfg.height - border * 2}" rx="${cfg.radius}" fill="hsl(0 0% ${cfg.lightness}% / ${cfg.alpha})" style="filter:blur(${cfg.blur}px)" />
      </svg>
    `

    const parser = new DOMParser()
    const doc = parser.parseFromString(svgContent, 'image/svg+xml')
    const svgEl = doc.querySelector('svg')
    const serialized = new XMLSerializer().serializeToString(svgEl)
    const encoded = encodeURIComponent(serialized)
    const dataUri = `data:image/svg+xml,${encoded}`

    gsap.set('feImage', { attr: { href: dataUri } })
    gsap.set('feDisplacementMap', { attr: { xChannelSelector: cfg.x, yChannelSelector: cfg.y } })
  }

  const update = () => {
    const cfg = configRef.current
    buildDisplacementImage()
    
    gsap.set(document.documentElement, {
      '--width': cfg.width,
      '--height': cfg.height,
      '--radius': cfg.radius,
      '--frost': cfg.frost,
      '--output-blur': cfg.displace,
      '--saturation': cfg.saturation,
    })
    
    gsap.set('feDisplacementMap', { attr: { scale: cfg.scale } })
    gsap.set('#redchannel', { attr: { scale: cfg.scale + cfg.r } })
    gsap.set('#greenchannel', { attr: { scale: cfg.scale + cfg.g } })
    gsap.set('#bluechannel', { attr: { scale: cfg.scale + cfg.b } })
    gsap.set('feGaussianBlur', { attr: { stdDeviation: cfg.displace } })

    document.documentElement.dataset.icons = cfg.icons
    document.documentElement.dataset.mode = mode
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
    const newConfig = presets[newMode]
    configRef.current = newConfig
    setConfig(newConfig)
    update()
  }

  useEffect(() => {
    update()
    Draggable.create(effectRef.current, { type: 'x,y' })

    setTimeout(() => {
      if (placeholderRef.current) {
        const { top, left } = placeholderRef.current.getBoundingClientRect()
        gsap.set(effectRef.current, {
          top: top > window.innerHeight ? window.innerHeight * 0.5 : top,
          left,
          opacity: 1,
        })
      }
    }, 100)
  }, [])

  useEffect(() => {
    update()
  }, [config])

  return (
    <div className="min-h-screen font-['SF_Pro_Text','SF_Pro_Icons','Helvetica_Neue',Helvetica,Arial,sans-serif] overflow-x-hidden bg-white text-gray-900">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none -z-10 h-screen w-screen opacity-30 bg-[linear-gradient(90deg,#e5e5e5_1px,transparent_1px),linear-gradient(#e5e5e5_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* Mode Switcher with GitHub */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* GitHub Link */}
        <a 
          href="https://github.com/ShivaBhattacharjee/liquid-glass-tailwind/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 hover:bg-gray-900 hover:border-gray-900 transition-all duration-300"
        >
          <svg 
            className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
        
        {/* Mode Switcher */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-1 flex gap-1">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                mode === m
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Header - Apple Inspired */}
      <header className="max-w-5xl mx-auto px-4 pt-20 pb-12">
        {/* Liquid Glass Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200/60 shadow-sm">
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
          <span className="text-sm font-medium text-gray-600">Introducing</span>
        </div>

        {/* Main Title with Gradient */}
        <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight mb-6">
          <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Liquid
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Glass
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed">
          A beautifully crafted displacement effect inspired by 
          <span className="inline-flex items-center mx-1">
            <svg className="w-5 h-5 inline" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
          </span>
          macOS design language. Drag the glass element to experience the magic.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-3 mt-8">
          <span className="px-4 py-1.5 rounded-full bg-gray-900 text-white text-sm font-medium shadow-lg">
            SVG Filters
          </span>
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-lg">
            Chromatic Aberration
          </span>
          <span className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium backdrop-blur-sm">
            GSAP Powered
          </span>
          <span className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium backdrop-blur-sm">
            Tailwind CSS
          </span>
        </div>
      </header>

      {/* Effect Container - Liquid Glass */}
      <div
        ref={effectRef}
        className="
          opacity-0 
          transition-all 
          duration-500 
          ease-out
          fixed 
          z-[999999] 
          [&_*]:pointer-events-none
          cursor-grab
          active:cursor-grabbing
          
          /* Liquid Glass Outer Glow */
          shadow-[0_8px_32px_rgba(31,38,135,0.15),0_0_0_1px_rgba(255,255,255,0.18)_inset,0_4px_24px_rgba(0,0,0,0.06),0_1px_1px_rgba(255,255,255,0.4)_inset]
          
          /* Glass Border Highlight */
          before:content-['']
          before:absolute
          before:inset-0
          before:rounded-[inherit]
          before:p-[1px]
          before:bg-gradient-to-b
          before:from-white/50
          before:via-white/10
          before:to-transparent
          before:-z-10
          before:pointer-events-none
          
          /* Inner Glass Shine */
          after:content-['']
          after:absolute
          after:inset-[2px]
          after:rounded-[inherit]
          after:bg-gradient-to-br
          after:from-white/30
          after:via-transparent
          after:to-white/5
          after:pointer-events-none
          after:opacity-80
          
          /* Hover Effect */
          hover:shadow-[0_12px_40px_rgba(31,38,135,0.2),0_0_0_1px_rgba(255,255,255,0.25)_inset,0_6px_30px_rgba(0,0,0,0.08),0_2px_2px_rgba(255,255,255,0.5)_inset]
          hover:scale-[1.02]
        "
        style={{
          height: 'calc(var(--height) * 1px)',
          width: 'calc(var(--width) * 1px)',
          borderRadius: 'calc(var(--radius) * 1px)',
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)`,
          backdropFilter: 'url(#filter) saturate(var(--saturation, 1)) brightness(1.05)',
          WebkitBackdropFilter: 'url(#filter) saturate(var(--saturation, 1)) brightness(1.05)',
        }}
      >
        {/* Inner Glass Container */}
        <div className="nav-wrap w-full h-full overflow-hidden rounded-[inherit] relative">
          {/* Top Highlight Bar */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          
          {/* Icons Nav */}
          <nav className="w-full h-full flex flex-wrap items-center justify-center p-1.5 opacity-0 overflow-hidden rounded-[inherit] transition-opacity duration-300">
            {navImages.map((src, i) => (
              <img key={i} src={src} alt="" className="w-20 aspect-square pointer-events-none drop-shadow-lg" />
            ))}
          </nav>
        </div>

        {/* SVG Filter */}
        <svg className="w-full h-full pointer-events-none absolute inset-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="filter" colorInterpolationFilters="sRGB">
              <feImage x="0" y="0" width="100%" height="100%" result="map" />
              <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
              <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
              <feDisplacementMap in="SourceGraphic" in2="map" id="greenchannel" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
              <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
              <feDisplacementMap in="SourceGraphic" in2="map" id="bluechannel" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
              <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur in="output" stdDeviation="0.7" />
            </filter>
          </defs>
        </svg>

        <div ref={debugRef} className="displacement-debug pointer-events-none h-full w-full absolute inset-0 -z-10 transition-all duration-300" />
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        {/* Placeholder Section */}
        <section className="my-16 w-80 h-24 max-w-full relative mb-48">
          <div
            ref={placeholderRef}
            className="w-80 h-24 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-gray-300"
          />
        </section>

        {/* Lorem Ipsum Section 1 */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Lorem Ipsum Dolor</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        {/* Images Grid 1 */}
        <section className="my-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.slice(0, 8).map((src, i) => (
              <img key={i} src={src} alt="" className="w-full h-48 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow" />
            ))}
          </div>
        </section>

        {/* Lorem Ipsum Section 2 */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Consectetur Adipiscing</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
          </p>
        </section>

        {/* Images Grid 2 */}
        <section className="my-16">
          <div className="grid grid-cols-3 gap-4">
            {images.slice(8, 14).map((src, i) => (
              <img key={i} src={src} alt="" className="w-full h-56 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow" />
            ))}
          </div>
        </section>

        {/* Lorem Ipsum Section 3 */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Sed Do Eiusmod</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
          </p>
        </section>

        {/* Large Image */}
        <section className="my-16">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop" 
            alt="" 
            className="w-full h-80 object-cover rounded-2xl shadow-lg" 
          />
        </section>

        {/* Lorem Ipsum Section 4 */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Tempor Incididunt</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.
          </p>
        </section>

        {/* Images Row */}
        <section className="my-16">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {images.map((src, i) => (
              <img key={i} src={src} alt="" className="w-64 h-48 object-cover rounded-xl shadow-md flex-shrink-0 hover:shadow-xl transition-shadow" />
            ))}
          </div>
        </section>

        {/* Lorem Ipsum Section 5 */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ut Labore Et Dolore</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200">
        <p className="text-gray-600">Made with ❤️ by <span className="font-semibold text-gray-900">Shiva Bhattacharjee</span></p>
        <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  )
}

export default App