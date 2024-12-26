'use client'

import React, { useEffect, useRef } from 'react'

declare global {
  interface Window {
    jwplayer: any
  }
}

interface JWPlayerProps {
  playerId: string
  file: string
  isLive?: boolean
}

const JWPlayer: React.FC<JWPlayerProps> = ({ playerId, file, isLive = false }) => {
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadJWPlayer = async () => {
      if (typeof window.jwplayer === 'undefined') {
        const script = document.createElement('script')
        script.src = 'https://content.jwplatform.com/libraries/KB5zFt7A.js'
        script.async = true
        document.body.appendChild(script)
        await new Promise((resolve) => script.onload = resolve)
      }

      if (playerRef.current) {
        const player = window.jwplayer(playerId)
        player.setup({
          file: `https://mjstream-server.onrender.com/proxy?url=${encodeURIComponent(file)}`,
          width: '100%',
          aspectratio: '16:9',
          stretching: 'uniform',
          primary: 'html5',
          hlshtml: true,
          autostart: false,
          mute: false,
          preload: 'metadata',
          playbackRateControls: !isLive,
          live: isLive
        })
      }
    }

    loadJWPlayer()

    return () => {
      if (window.jwplayer && window.jwplayer(playerId)) {
        window.jwplayer(playerId).remove()
      }
    }
  }, [playerId, file, isLive])

  return <div id={playerId} ref={playerRef}></div>
}

export default JWPlayer