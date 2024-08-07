import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import chrome from 'chrome-aws-lambda'

const getAbsoluteURL = (path: string, params: Record<string, string>): string => {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `https://${process.env.VERCEL_URL}`

  const queryString = new URLSearchParams(params).toString()
  const absoluteURL = `${baseUrl}${path}?${queryString}`

  return absoluteURL
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { HEAD, NECK, NOOSE, EYE, EAR, HAIR, GLASS, CLOTHE, TEETH, TONGUE, resolution }
  } = req

  if (!HEAD || !NECK || !NOOSE || !EYE || !EAR || !HAIR || !GLASS || !CLOTHE || !TEETH || !TONGUE) {
    res.status(400).end('Missing required parameters')
    return
  }

  let browser

  const isProduction = process.env.NODE_ENV === 'production'
  const launchConfig = isProduction
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      }
    : { headless: true }

  try {
    browser = await puppeteer.launch(launchConfig)
    const page = await browser.newPage()

    const viewportResolution = resolution ? parseInt(resolution as string, 10) : 512
    await page.setViewport({ width: viewportResolution, height: viewportResolution })

    const pageUrl = getAbsoluteURL('/', {
      HEAD: HEAD as string,
      NECK: NECK as string,
      NOOSE: NOOSE as string,
      EYE: EYE as string,
      EAR: EAR as string,
      HAIR: HAIR as string,
      GLASS: GLASS as string,
      CLOTHE: CLOTHE as string,
      TEETH: TEETH as string,
      TONGUE: TONGUE as string
    })

    await page.goto(pageUrl)

    await page.waitForFunction('window.status === "ready"')

    const data = await page.screenshot({ type: 'png' })

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
    res.setHeader('Content-Type', 'image/png')

    res.end(data)
  } catch (error) {
    console.error('An error occurred:', error)
    res.status(500).end('Internal Server Error')
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
