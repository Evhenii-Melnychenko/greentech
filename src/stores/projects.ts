import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { GreenProject, ProjectCategory } from '@/types/project'

export type ProjectFilter = 'all' | ProjectCategory

const projects: GreenProject[] = [
  {
    id: 1,
    titleKey: 'parkTitle',
    category: 'parks',
    categoryKey: 'parkCategory',
    descriptionKey: 'parkDescription',
    resultKey: 'parkResult',
    icon: 'tree',
  },
  {
    id: 2,
    titleKey: 'airTitle',
    category: 'air',
    categoryKey: 'airCategory',
    descriptionKey: 'airDescription',
    resultKey: 'airResult',
    icon: 'sensor',
  },
  {
    id: 3,
    titleKey: 'solarTitle',
    category: 'energy',
    categoryKey: 'solarCategory',
    descriptionKey: 'solarDescription',
    resultKey: 'solarResult',
    icon: 'solar',
  },
  {
    id: 4,
    titleKey: 'streetsTitle',
    category: 'parks',
    categoryKey: 'parkCategory',
    descriptionKey: 'streetsDescription',
    resultKey: 'streetsResult',
    icon: 'leaf',
  },
  {
    id: 5,
    titleKey: 'waterTitle',
    category: 'energy',
    categoryKey: 'infrastructureCategory',
    descriptionKey: 'waterDescription',
    resultKey: 'waterResult',
    icon: 'water',
  },
  {
    id: 6,
    titleKey: 'industryTitle',
    category: 'air',
    categoryKey: 'airCategory',
    descriptionKey: 'industryDescription',
    resultKey: 'industryResult',
    icon: 'sensor',
  },
]

export const projectFilters: { labelKey: string; value: ProjectFilter }[] = [
  { labelKey: 'allProjects', value: 'all' },
  { labelKey: 'greenSpaces', value: 'parks' },
  { labelKey: 'cleanAir', value: 'air' },
  { labelKey: 'energy', value: 'energy' },
]

export const useProjectsStore = defineStore('projects', () => {
  const activeFilter = ref<ProjectFilter>('all')

  const filteredProjects = computed(() =>
    activeFilter.value === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter.value),
  )

  function setFilter(filter: ProjectFilter): void {
    activeFilter.value = filter
  }

  return { activeFilter, filteredProjects, setFilter }
})
