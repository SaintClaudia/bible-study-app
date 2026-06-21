'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ── Minimal Spotify Web Playback SDK types ──────────────────────

export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ name: string }>
  album: { name: string; images: Array<{ url: string }> }
  duration_ms: number
}

interface SDKPlayerState {
  paused: boolean
  position: number
  duration: number
  track_window: {
    current_track: SpotifyTrack
    next_tracks: SpotifyTrack[]
  }
}

interface SDKPlayer {
  connect(): Promise<boolean>
  disconnect(): void
  addListener(event: 'ready', cb: (d: { device_id: string }) => void): boolean
  addListener(event: 'not_ready', cb: (d: { device_id: string }) => void): boolean
  addListener(event: 'player_state_changed', cb: (s: SDKPlayerState | null) => void): boolean
  addListener(event: 'initialization_error' | 'authentication_error' | 'account_error' | 'playback_error', cb: (d: { message: string }) => void): boolean
  togglePlay(): Promise<void>
  nextTrack(): Promise<void>
  previousTrack(): Promise<void>
  seek(ms: number): Promise<void>
}

declare global {
  interface Window {
    Spotify: {
      Player: new (opts: {
        name: string
        getOAuthToken: (cb: (token: string) => void) => void
        volume?: number
      }) => SDKPlayer
    }
    onSpotifyWebPlaybackSDKReady: () => void
  }
}

// ── Hook ────────────────────────────────────────────────────────

export function useSpotifySDK() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isPremium, setIsPremium] = useState<boolean | null>(null)
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [isPaused, setIsPaused] = useState(true)
  const [deviceId, setDeviceId] = useState<string | null>(null)

  const tokenRef = useRef<string | null>(null)
  const playerRef = useRef<SDKPlayer | null>(null)

  // Fetch a valid access token from our server (auto-refreshes)
  const fetchToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch('/api/auth/token')
      const data = await res.json()
      if (data.authenticated) {
        tokenRef.current = data.accessToken
        return data.accessToken
      }
    } catch {}
    return null
  }, [])

  // Check auth on mount
  useEffect(() => {
    fetchToken().then(t => {
      if (t) setIsAuthenticated(true)
    })
  }, [fetchToken])

  // Check Premium status once authenticated
  useEffect(() => {
    if (!isAuthenticated || !tokenRef.current) return
    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${tokenRef.current}` },
    })
      .then(r => r.json())
      .then(data => setIsPremium(data.product === 'premium'))
      .catch(() => setIsPremium(false))
  }, [isAuthenticated])

  // Load the Web Playback SDK (Premium only)
  useEffect(() => {
    if (!isAuthenticated || isPremium !== true) return
    const SCRIPT_ID = 'spotify-sdk'
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const token = await fetchToken()
      if (!token) return

      const player = new window.Spotify.Player({
        name: 'Bible Study',
        getOAuthToken: async (cb) => {
          const t = await fetchToken()
          if (t) cb(t)
        },
        volume: 0.8,
      })

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id)
        setIsReady(true)
      })
      player.addListener('not_ready', () => setIsReady(false))
      player.addListener('player_state_changed', (state) => {
        if (!state) return
        setCurrentTrack(state.track_window.current_track)
        setIsPaused(state.paused)
      })
      // If account error, they aren't Premium after all
      player.addListener('account_error', () => setIsPremium(false))

      player.connect()
      playerRef.current = player
    }

    return () => {
      playerRef.current?.disconnect()
      document.getElementById(SCRIPT_ID)?.remove()
    }
  }, [isAuthenticated, isPremium, fetchToken])

  const play = useCallback(async (contextUri: string) => {
    const token = await fetchToken()
    if (!token || !deviceId) return
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context_uri: contextUri }),
    })
  }, [deviceId, fetchToken])

  const togglePlay = useCallback(() => playerRef.current?.togglePlay(), [])
  const nextTrack = useCallback(() => playerRef.current?.nextTrack(), [])
  const prevTrack = useCallback(() => playerRef.current?.previousTrack(), [])
  const seek = useCallback((ms: number) => playerRef.current?.seek(ms), [])

  return {
    isAuthenticated,
    isReady,
    isPremium,
    currentTrack,
    isPaused,
    play,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
  }
}
