import { Box, Typography } from '@mui/material'
import { GoodTypes, TradeAdImage, TradeAd as TradeAdDto } from '@prisma/client'
import { LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { getTradeAdsList } from '~/loaders/tradeAd'
import { getUserAuthData } from '~/service/auth'
import { useCallback, useEffect, useState } from 'react'
import { TradeAd } from '~/components/trade-ad'
import { MetaFunction } from '@remix-run/react/dist/routeModules'

export type TradeAdListItemDto = TradeAdDto & {
  images: TradeAdImage[]
  type: GoodTypes
}

export const meta: MetaFunction = () => {
  return {
    title: 'Оголошення з продажу зброї | zbroya.in.ua',
    description: 'Дошка оголошеннь з продажу бу зброї. Купити бу зброю!',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

const INITIAL_PAGE = 1
const LIST_PAGE_LENGTH = 15

const getTradeAdsPage = async (page: number) => {
  return getTradeAdsList({
    include: {
      images: true,
      type: true,
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
      {
        id: 'asc',
      },
    ],

    take: LIST_PAGE_LENGTH,
    skip: LIST_PAGE_LENGTH * (page - 1),
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserAuthData(request)
  const tradeAdsPage = await getTradeAdsPage(
    Number(new URL(request.url).searchParams.get('page') ?? INITIAL_PAGE),
  )

  return {
    tradeAdsPage,
    user,
  }
}

export default function List() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { user, tradeAdsPage: initialTradeAds } = useLoaderData()
  const [tradeAds, setTradeAds] = useState(initialTradeAds)
  //...
  // We won't care about height until a client-side render
  const [height, setHeight] = useState(null)

  // Set height of the parent container whenever photos are loaded
  const divHeight = useCallback(
    node => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height)
      }
    },
    [tradeAds.length],
  )

  const [page, setPage] = useState(INITIAL_PAGE + 1)
  const fetcher = useFetcher()
  const [shouldFetch, setShouldFetch] = useState(true)

  // Listen on scrolls. Fire on some self-described breakpoint
  // Add Listeners to scroll and client resize
  useEffect(() => {
    const scrollListener = () => {
      setClientHeight(window.innerHeight)
      setScrollPosition(window.scrollY)
    }

    // Avoid running during SSR
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollListener)
    }

    // Clean up
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', scrollListener)
      }
    }
  }, [])

  // Listen on scrolls. Fire on some self-described breakpoint
  useEffect(() => {
    if (!shouldFetch || !height) return
    if (clientHeight + scrollPosition + 200 < height) return
    fetcher.load(`/list?page=${page}`)

    setShouldFetch(false)
  }, [clientHeight, scrollPosition, fetcher])

  useEffect(() => {
    const loaderData = fetcher.data
    if (!loaderData) {
      return
    }
    const fetchedTradeAds = loaderData.tradeAdsPage

    // Discontinue API calls if the last page has been reached
    if (!fetchedTradeAds || fetchedTradeAds.length === 0) {
      setShouldFetch(false)
      return
    }

    setTradeAds((currentAds: TradeAdListItemDto[]) => [
      ...currentAds,
      ...fetchedTradeAds,
    ])
    setPage((page: number) => page + 1)
    setShouldFetch(true)
  }, [fetcher.data])

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'baseline',
        ml: 'auto',
        mr: 'auto',
      }}
      ref={divHeight}
    >
      {tradeAds.length ? (
        tradeAds.map((item: TradeAdListItemDto) => (
          <TradeAd key={item.id} tradeAd={item} />
        ))
      ) : (
        <Typography
          variant="h3"
          component="h2"
          color="common.white"
          gutterBottom
        >
          {'Станьте першим хто додав свою зброю в арсенал :)'}
        </Typography>
      )}
    </Box>
  )
}
