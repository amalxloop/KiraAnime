# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2025-12-12

### Added
- **VideoPlayer Component** (`src/components/VideoPlayer.tsx`)
  - Complete HLS.js video player implementation with multi-quality support
  - Automatic retry mechanism with fallback to proxy URL on network errors
  - Support for both HLS streaming and native browser video playback
  - Progress tracking with `onProgress` callback for watch history integration
  - Server selection and category (sub/dub) switching support
  - Loading states with animated spinner overlay
  - Error handling with user-friendly messages
  - Video preload optimization and buffer management

- **Watch History System**
  - API route (`src/app/api/watch-history/route.ts`) for tracking video progress
  - Support for authenticated and guest users via UUID cookies
  - Automatic progress saving during video playback
  - Upsert logic to update existing history entries
  - Returns last 10 watched items ordered by timestamp

- **My List Feature**
  - API route (`src/app/api/my-list/route.ts`) for managing user anime lists
  - Add, remove, and fetch anime from personal lists
  - Duplicate prevention with unique constraints
  - Support for both authenticated and guest users

- **Watch Page** (`src/app/watch/[id]/page.tsx`)
  - Full anime episode player with episode navigation
  - Server and category (sub/dub) selection UI
  - Episode list sidebar with filler episode indicators
  - Automatic URL parameter updates when switching episodes
  - Previous/Next episode controls with proper validation
  - Synopsis display with link to full anime details
  - Recommended anime section below player
  - Integration with watch history tracking

### Changed
- **API Routes Optimization**
  - Removed unused parameters in GET request handlers
  - Changed `GET(request: NextRequest, _userId: ...)` to `GET()` in:
    - `src/app/api/my-list/route.ts`
    - `src/app/api/watch-history/route.ts`
  - Improved code cleanliness and eliminated linting warnings

### Technical Details
- **Dependencies**: Uses `hls.js` (v1.6.15) for HLS streaming
- **Authentication**: Hybrid approach supporting Supabase Auth and guest sessions via cookies
- **Video Streaming**: Direct URL and proxy fallback support with automatic retry
- **State Management**: React hooks for episode, server, and category state
- **Error Recovery**: HLS.js fatal error handling with media error recovery
- **Performance**: Low latency mode enabled, 90-second back buffer

### Fixed
- ESLint warnings for unused function parameters in API routes
- HLS network error recovery with automatic fallback
- Episode loading state management
- Server selection persistence across episode changes

---

## [1.0.0] - Initial Release
- Base Next.js anime streaming application
- Homepage with trending, popular, and latest anime
- Browse page with search and filters
- Anime detail pages
- Integration with anime data API
- Supabase authentication setup
- Responsive design with dark theme
