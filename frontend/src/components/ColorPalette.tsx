import * as colors from '@ant-design/colors'

export type ColorName =
  | 'zesty'
  | 'wildin'
  | 'fresh'
  | 'grounded'
  | 'swashbuckler'
  | 'wonky'
  | 'suave'
  | 'mysterious'
  | 'tinnitus'
  | 'dank'
  | 'trippy'
  | 'daredevil'
  | 'aloof'
  | 'slothful'
  | 'healthy'
  | 'phantom'
  | 'granular'
  | 'visionary'

type Brand = {
  colors: Record<ColorName, string>
}

export const BRAND: Brand = {
  colors: {
    zesty: '#F9AC14',
    wildin: '#FF6392',
    fresh: '#7FC8F8',
    grounded: '#544B3D',
    swashbuckler: '#4C8577',
    wonky: '#6A5D7B',
    suave: '#B2BD7E',
    mysterious: '#803900',
    tinnitus: '#948D9B',
    dank: '#ff6600',
    trippy: '#5F5AA2',
    daredevil: '#FE4A49',
    aloof: '#E03192',
    slothful: '#EFA48B',
    healthy: '#78BC61',
    phantom: '#00100B',
    granular: '#A49966',
    visionary: '#00CDCD',
  },
}
