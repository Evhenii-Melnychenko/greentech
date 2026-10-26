export type ProjectCategory = 'parks' | 'air' | 'energy'

export interface GreenProject {
  id: number
  titleKey: string
  category: ProjectCategory
  categoryKey: string
  descriptionKey: string
  resultKey: string
  icon: 'tree' | 'sensor' | 'energy' | 'water' | 'solar' | 'leaf'
}
