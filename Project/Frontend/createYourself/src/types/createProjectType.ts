export type CreateProjectType = {
  title: string,
  description?: string,
  imageUrl?: string,
  projectUrl?: string,
  githubUrl?: string,
  sortOrder: number,
  startDate?: Date,
  endDate?: Date,
}
