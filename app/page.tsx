'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import JWPlayer from '../components/JWPlayer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

function HomeContent() {
  const [url, setUrl] = useState('')
  const [isLive, setIsLive] = useState(false)
  const [shareableLink, setShareableLink] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const videoUrl = searchParams.get('url')
    const liveParam = searchParams.get('live')
    if (videoUrl) {
      setUrl(decodeURIComponent(videoUrl))
      setIsLive(liveParam === 'true')
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const encodedUrl = encodeURIComponent(url)
    const newUrl = `/watch?url=${encodedUrl}&live=${isLive}`
    router.push(newUrl)
    setShareableLink(`${window.location.origin}/watch?url=${encodedUrl}&live=${isLive}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JW Player - HLS and DASH Support</h1>
      
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter HLS or DASH URL"
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isLive"
            checked={isLive}
            onChange={(e) => setIsLive(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <label htmlFor="isLive">Is Live Stream?</label>
        </div>
        <Button type="submit">Load Video</Button>
      </form>

      {shareableLink && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Shareable Link:</h2>
          <div className="flex items-center space-x-2">
            <Input value={shareableLink} readOnly className="flex-grow" />
            <Button onClick={() => navigator.clipboard.writeText(shareableLink)}>
              Copy
            </Button>
          </div>
        </div>
      )}

      {url && (
        <div className="aspect-w-16 aspect-h-9">
          <JWPlayer playerId="my-player" file={url} isLive={isLive} />
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}