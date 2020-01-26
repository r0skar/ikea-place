export interface Material {
  name: string
  resource: string
  thumb: string
  id: string
}

export interface Category {
  name: string
  id: string
  foreign_key: string
  models: Partial<Model>[]
  model_count: number
  generation_time: string
  data?: unknown
}

export interface Model {
  name: string
  id: string
  version: number
  foreign_key: string
  type: string
  resources: unknown[]
  tags: unknown[]
  uid: string
  desc: string
  z_up: string
  scale: number
  size: number
  password: string
  particles: string
  particles_list: string[]
  animation: string
  animation_list: string[]
  channel_id: string
  category_id?: unknown
  category_name: string
  author?: unknown
  zip_url: string
  image_url: string
  image_large: string
  images: unknown[]
  orientation: string
  zoomable: string
  scalable: boolean
  rotate: string
  moveable: boolean
  move: boolean
  params?: unknown
  source: boolean
  shop_url: string
  cameras?: unknown
  data: Record<string, unknown>
  modelinfo: Record<string, unknown>
  materials: {
    name: string
    id: string
    material_system: string
    display_name: string
    materials: Record<string, unknown>[]
    options: Material[]
  }[]
  gyroscope?: unknown
  custom?: unknown
  auto_insert: boolean
}
