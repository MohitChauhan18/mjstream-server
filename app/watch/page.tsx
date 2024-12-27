'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import JWPlayer from '../../components/JWPlayer'

function WatchContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url')
  const isLive = searchParams.get('live') === 'true'

  if (!url) {
    return <div className="container mx-auto p-4">No video URL provided</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Watch Stream</h1>
      <div className="aspect-w-16 aspect-h-9">
        <JWPlayer playerId="watch-player" file={decodeURIComponent(url)} isLive={isLive} />
      </div>
    </div>
  )
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WatchContent />
    </Suspense>
  )
}