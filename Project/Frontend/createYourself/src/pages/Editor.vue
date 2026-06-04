<script lang="ts" setup>
import Logo from "@/components/ui/Logo.vue";
import Block from "@/components/ui/editor/Block.vue";
import Sections from "@/components/ui/editor/Sections.vue";
import ScreenButton from "@/components/ui/editor/ScreenButton.vue";
import ContentText from "@/components/ui/editor/ContentText.vue";
import SectionStruct from "@/components/ui/editor/SectionStruct.vue";
import {computed, onMounted, ref, watch} from "vue";
import {usePortfolioStore} from "@/stores/portfolioStore.ts";
import type {PortfolioType} from "@/types/portfolioType.ts";
import {useRoute} from "vue-router";
import {getDateGap} from "@/utils/date.ts";
import AddSection from "@/components/ui/editor/AddSection.vue";
import type {CreateSectionType} from "@/types/createSectionType.ts";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import {usePortfolioSectionStore} from "@/stores/portfolioSectionStore.ts";
import type {CreateEditorBlockType} from "@/types/createEditorBlockType.ts";
import {useEditorBlockStore} from "@/stores/editorBlockStore.ts";
import {useEducationStore} from "@/stores/educationStore.ts";
import {useExperienceStore} from "@/stores/experienceStore.ts";
import {useSkillStore} from "@/stores/skillStore.ts";
import {useSocialLinkStore} from "@/stores/socialLinkStore.ts";
import type {TextBlockContent} from "@/types/textBlockContent.ts";
import type {CreateTextEditorBlockType} from "@/types/createTextEditorBlockType.ts";
import TextModul from "@/components/ui/editor/TextModul.vue";
import ImageModul from "@/components/ui/editor/ImageModul.vue";
import SkillModul from "@/components/ui/editor/SkillModul.vue";
import SkillElement from "@/components/ui/editor/SkillElement.vue";
import ProjectModul from "@/components/ui/editor/ProjectModul.vue";
import Project from "@/components/ui/editor/Project.vue";
import type {EditorBlockType} from "@/types/editorBlockType.ts";
import type {CreateSkillType} from "@/types/createSkillType.ts";
import type {ModulType} from "@/types/modulType.ts";
import {useProjectStore} from "@/stores/projectStore.ts";
import type {CreateProjectType} from "@/types/createProjectType.ts";
import {getProjectApi, updateProjectApi} from "@/api/project.api.ts";
import type {CreateEducationType} from "@/types/createEducationType.ts";
import type {CreateExperienceType} from "@/types/createExperienceType.ts";
import type {CreateSocialLinkType} from "@/types/createSocialLinkType.ts";
import EducationModul from "@/components/ui/editor/EducationModul.vue";
import EducationElement from "@/components/ui/editor/EducationElement.vue";
import SocialLinkModul from "@/components/ui/editor/SocialLinkModul.vue";
import SocialLinkElement from "@/components/ui/editor/SocialLinkElement.vue";
import ContentProject from "@/components/ui/editor/ContentProject.vue";
import ContentSkill from "@/components/ui/editor/ContentSkill.vue";
import ContentEducation from "@/components/ui/editor/ContentEducation.vue";
import ContentLink from "@/components/ui/editor/ContentLink.vue";
import type {ProjectType} from "@/types/projectType.ts";
import type {SkillType} from "@/types/skillType.ts";
import type {UpdateSkillType} from "@/types/updateSkillType.ts";
import type {EducationType} from "@/types/educationType.ts";
import type {SocialLinkType} from "@/types/SocialLinkType.ts";
import type {SectionType} from "@/types/sectionType.ts";

const portfolioName = ref<string>('');

const portfolioStore = usePortfolioStore()
const portfolioSectionStore = usePortfolioSectionStore();
const educationStore = useEducationStore();
const experienceStore = useExperienceStore();
const skillStore = useSkillStore();
const socialLinkStore = useSocialLinkStore();
const editorBlockStore = useEditorBlockStore()
const projectStore = useProjectStore()

const route = useRoute();
const portfolioId = Number(route.params.id)
const portfolio = ref<any | null>(null);
const portfolioFacts = ref<PortfolioType | null>(null);


const sortedSections = ref<any[] | null>(null);
async function loadSortedSections() {
  const res = [...portfolioSectionStore.sections].sort((a, b) => a.sortOrder - b.sortOrder)

  sortedSections.value = await Promise.all(
    res.map(async (s) => ({
      ...s,
      editorBlock: await getEditorForSection(s.id)
    }))
  )
}

onMounted(async () => {
  portfolio.value = await portfolioStore.getFullPortfolioById(portfolioId) ?? null

  portfolioFacts.value = {
    id: portfolio.value.portfolio.id,
    currentThemeId: portfolio.value.portfolio.currentThemeId,
    currentVersionId: portfolio.value.portfolio.currentVersionId,
    languageCode: portfolio.value.portfolio.languageCode,
    userId: portfolio.value.portfolio.userId,
    templateId: portfolio.value.portfolio.templateId,
    title: portfolio.value.portfolio.title,
    description: portfolio.value.portfolio.description,
    slug: portfolio.value.portfolio.slug,
    visibility: portfolio.value.portfolio.visibility,
    createdAt: new Date(portfolio.value.portfolio.createdAt),
    updatedAt: new Date(portfolio.value.portfolio.updatedAt),
  }

  portfolioName.value = portfolioFacts.value?.title ?? ''

  await educationStore.getEducation(portfolioId)
  await experienceStore.getExperience(portfolioId)
  await skillStore.getSkills(portfolioId)
  await socialLinkStore.getSocialLink(portfolioId)
  await projectStore.getProjects(portfolioId)

  await portfolioSectionStore.getSections(portfolioFacts.value.id, portfolioFacts.value.currentVersionId)
  await loadSortedSections()
})

const addSectionVisible = ref<boolean>(false);
const error = ref<string | null>(null);
async function submitSection(sectionHeader: string) {
  if(portfolioFacts.value === null) return;

  error.value = null

  const section : CreateSectionType = {
    sectionType: sectionHeader,
    title: 'PLATZHALTER TITEL',
    sortOrder: Math.max(...portfolioSectionStore.sections?.map(section => section.sortOrder) ?? []) + 1,
    isVisible: true,
  }

  try{
    const newSection = await portfolioSectionStore.createSection(portfolioFacts.value.id, portfolioFacts.value.currentVersionId, section)
    sectionSelected.value = newSection.id
    await portfolioSectionStore.getSections(portfolioId, portfolioFacts.value.currentVersionId)

    if(sectionHeader === 'Hero Section'){
      await createTextModul()
    }
    if(sectionHeader === 'Projekte'){
      await createProjectModul()
    }
    if(sectionHeader === 'Skills'){
      await createSkillModul()
    }
    if(sectionHeader === 'Erfahrung'){
      await createExperienceModul()
    }
    if(sectionHeader === 'Ausbildung'){
      await createEducationModul()
    }
    if(sectionHeader === 'Kontakt & Social'){
      await createSocialLinkModul()
    }

    await loadSortedSections()
    addSectionVisible.value = false
  }catch(err: any){
    error.value = err ? err.message : 'Failed to create section.';
  }
}

function getSvgToSectionType(type: string) : string{
  if(type === "Hero Section") return "fa-regular fa-user";
  if(type === "Projekte") return "fa-solid fa-diagram-project";
  if(type === "Skills") return "fa-solid fa-chart-line";
  if(type === "Erfahrung") return "fa-solid fa-briefcase";
  if(type === "Ausbildung") return "fa-solid fa-graduation-cap";
  if(type === "Kontakt & Social") return "fa-regular fa-envelope";
  if(type === "Freie Section") return "fa-solid fa-circle-info";
  else
    return "fa-solid fa-header";
}
function getSvgToElementType(type: string) : string{
  if(type === "text") return "fa-solid fa-align-left";
  if(type === "image") return "fa-regular fa-image";
  if(type === "project") return "fa-solid fa-diagram-project";
  if(type === "skill") return "fa-solid fa-chart-line";
  if(type === "experience") return "fa-solid fa-briefcase";
  if(type === "education") return "fa-solid fa-graduation-cap";
  if(type === "link") return "fa-regular fa-envelope";
  else
    return "fa-solid fa-header";
}

async function deleteSection(sectionId: number){
  error.value = null
  try{
    if(portfolioFacts.value === null) return;
    await portfolioSectionStore.deleteSection(portfolioFacts.value.id, portfolioFacts.value.currentVersionId, sectionId);
    await portfolioSectionStore.getSections(portfolioId, portfolioFacts.value.currentVersionId)
    await loadSortedSections()
  }catch(err){
    error.value = err ? err.message : portfolioSectionStore.error;
  }
}

const sectionSelected = ref<number | null>(null);
function sectionSelectedFunction(sectionId: number){
  sectionSelected.value = sectionId
}

async function updateSectionTitle(newTitle: string){
  if(sectionSelected.value === null || portfolioFacts.value === null) return;

  const currSection = portfolioSectionStore.sections.find(section => section.id === sectionSelected.value);
  const updatedSection : CreateSectionType = {
    ...currSection,
    title: newTitle
  }

  await portfolioSectionStore.updateSection(portfolioId, portfolioFacts.value?.currentVersionId, sectionSelected.value, updatedSection)
}

const elementSelectedId = ref<number | null>(null);
const elementSelected = ref<EditorBlockType | null>(null);
function elementSelectedFunction(elementId: number, element: EditorBlockType){
  elementSelectedId.value = elementId
  elementSelected.value = element
}

async function getEditorForSection(sectionId: number){
  if(portfolioFacts.value === null) return;

  const res = await editorBlockStore.getEditorBlock(portfolioId, portfolioFacts.value.currentVersionId, sectionId)

  return res?.map(e => {
    if(e.blockType === 'text'){
        return {
          ...e,
          textBlockContent: JSON.parse(e.contentJson) as TextBlockContent
        }
    }

    if(e.blockType === 'skill'){
      const content = JSON.parse(e.contentJson) as ModulType
      return {
        ...e,
        skills: skillStore.skills?.filter(t => content.ids?.includes(t.id))
      }
    }

    if(e.blockType === 'project'){
      const content = JSON.parse(e.contentJson) as ModulType
      return {
        ...e,
        project: projectStore.projects?.filter(t => content.ids?.includes(t.id))
      }
    }

    if(e.blockType === 'education'){
      const content = JSON.parse(e.contentJson) as ModulType
      return {
        ...e,
        education: educationStore.educations?.filter(t => content.ids?.includes(t.id))
      }
    }

    if(e.blockType === 'experience'){
      const content = JSON.parse(e.contentJson) as ModulType
      return {
        ...e,
        experience: experienceStore.experiences?.filter(t => content.ids?.includes(t.id))
      }
    }

    if(e.blockType === 'link'){
      const content = JSON.parse(e.contentJson) as ModulType
      return {
        ...e,
        link: socialLinkStore.socialLinks?.filter(t => content.ids?.includes(t.id))
      }
    }

    return e
  }) ?? []
}
function getMaxSortCount() : number {
  const section = sortedSections.value?.find(section => section.id === sectionSelected.value)

  if(!section || !section.editorBlock || section.editorBlock.length === 0) return 0
  return Math.max(...(section.editorBlock).map(s => s.sortOrder))
}

async function createTextModul(){
  if(sortedSections.value === null) return;

  const maxSortCount = getMaxSortCount()

  const editorText : CreateTextEditorBlockType = {
    blockType: "text",
    contentJson: {
      id: Date.now() + Math.floor(Math.random() * 1000),
      text: "PLATZHALTER TEXT",
      align: "left",
      tag: "h1",
      fontSize: 16,
      fontWeight: "normal",
      color: "#000000",
    },
    sortOrder: maxSortCount + 1,
  }

  await createEditorBlockFunc(editorText)
}
async function createSkillModul(){
  if(sortedSections.value === null) return;

  const maxSortCount = getMaxSortCount()

  const skill : CreateSkillType = {
    name: `PLATZHALTER ${crypto.randomUUID()}`,
    description: "PLATZHALTER TEXT ...",
    level: 50,
    sortOrder: maxSortCount + 1,
  }

  const res = await skillStore.createSkills(portfolioId, skill)
  if(res?.id === null || res === null) return;

  const editorText : CreateEditorBlockType = {
    blockType: "skill",
    contentJson: {
      ids: [res!.id],
    },
    sortOrder: maxSortCount + 1,
  }

  await createEditorBlockFunc(editorText)

  await skillStore.getSkills(portfolioId)
  await loadSortedSections()
}
async function createProjectModul(){
  if(sortedSections.value === null) return;

  const maxSortCount = getMaxSortCount()

  const project : CreateProjectType = {
    title: 'PLATZHALTER',
    description: 'PLATZHALTER TEXT ...',
    sortOrder: maxSortCount + 1,
  }

  const res = await projectStore.createProject(portfolioId, project)
  if(res?.id === null || res === null) return;

  const editorText : CreateEditorBlockType = {
    blockType: "project",
    contentJson: {
      ids: [res!.id],
    },
    sortOrder: maxSortCount + 1,
  }

  await createEditorBlockFunc(editorText)

  await projectStore.getProjects(portfolioId)
  await loadSortedSections()
}
async function createEducationModul(){
  if(sortedSections.value === null) return;

  const maxSortCount = getMaxSortCount()

  const education : CreateEducationType = {
    institutionName: 'PLATZHALTER',
    degree: 'PLATZHALTER TEXT',
    sortOrder: maxSortCount + 1,
  }

  const res = await educationStore.createEducation(portfolioId, education)
  if(res?.id === null || res === null) return;

  const editorText : CreateEditorBlockType = {
    blockType: "education",
    contentJson: {
      ids: [res!.id],
    },
    sortOrder: maxSortCount + 1,
  }

  await createEditorBlockFunc(editorText)

  await educationStore.getEducation(portfolioId)
  await loadSortedSections()
}
async function createExperienceModul(){
  if(sortedSections.value === null) return;

  const maxSortCount = getMaxSortCount()

  const experience : CreateExperienceType = {
    companyName: 'TEMPLATE NAME',
    position: 'TEMPLATE',
    sortOrder: maxSortCount + 1,
  }

  const res = await experienceStore.createExperience(portfolioId, experience)
  if(res?.id === null || res === null) return;

  const editorText : CreateEditorBlockType = {
    blockType: "experience",
    contentJson: {
      ids: [res!.id],
    },
    sortOrder: maxSortCount + 1,
  }

  await createEditorBlockFunc(editorText)

  await experienceStore.getExperience(portfolioId)
  await loadSortedSections()
}
async function createSocialLinkModul(){
  if(sortedSections.value === null) return;

  const maxSortCount = getMaxSortCount()

  const link : CreateSocialLinkType = {
    url: 'http://localhost:8080',
    platform: 'YouTube',
  }

  const res = await socialLinkStore.createSocialLink(portfolioId, link)
  if(res?.id === null || res === null) return;

  const editorText : CreateEditorBlockType = {
    blockType: "link",
    contentJson: {
      ids: [res!.id],
    },
    sortOrder: maxSortCount + 1,
  }

  await createEditorBlockFunc(editorText)

  await socialLinkStore.getSocialLink(portfolioId)
  await loadSortedSections()
}

async function addSkillToModul(editorBlock: EditorBlockType){
  if(sortedSections.value === null || portfolioFacts.value === null) return;

  const maxSortCount = getMaxSortCount()

  const skill : CreateSkillType = {
    name: `PLATZHALTER ${crypto.randomUUID()}`,
    description: "PLATZHALTER TEXT ...",
    level: 50,
    sortOrder: maxSortCount + 1,
  }

  const content = JSON.parse(editorBlock.contentJson) as ModulType

  const res = await skillStore.createSkills(portfolioId, skill)
  if(res?.id === null || res === null) return;

  const updatedEditorBlock : CreateEditorBlockType = {
    blockType: "skill",
    contentJson: {
      ids: [...content.ids, res!.id]
    },
    sortOrder: editorBlock.sortOrder,
  }

  await editorBlockStore.updateEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, editorBlock.sectionId, editorBlock.id, updatedEditorBlock)

  await skillStore.getSkills(portfolioId)
  await loadSortedSections()
}
async function addProjectToModul(editorBlock: EditorBlockType){
  if(sortedSections.value === null || portfolioFacts.value === null) return;

  const maxSortCount = getMaxSortCount()

  const project : CreateProjectType = {
    title: 'PLATZHALTER',
    description: 'PLATZHALTER TEXT ...',
    sortOrder: maxSortCount + 1,
  }

  const content = JSON.parse(editorBlock.contentJson) as ModulType

  const res = await projectStore.createProject(portfolioId, project)
  if(res?.id === null || res === null) return;

  const updatedEditorBlock : CreateEditorBlockType = {
    blockType: "project",
    contentJson: {
      ids: [...content.ids, res!.id]
    },
    sortOrder: editorBlock.sortOrder,
  }

  await editorBlockStore.updateEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, editorBlock.sectionId, editorBlock.id, updatedEditorBlock)

  await projectStore.getProjects(portfolioId)
  await loadSortedSections()
}
async function addEducationToModul(editorBlock: EditorBlockType){
  if(sortedSections.value === null || portfolioFacts.value === null) return;

  const maxSortCount = getMaxSortCount()

  const education : CreateEducationType = {
    institutionName: 'PLATZHALTER',
    degree: 'PLATZHALTER TEXT',
    sortOrder: maxSortCount + 1,
  }

  const content = JSON.parse(editorBlock.contentJson) as ModulType

  const res = await educationStore.createEducation(portfolioId, education)
  if(res?.id === null || res === null) return;

  const updatedEditorBlock : CreateEditorBlockType = {
    blockType: "education",
    contentJson: {
      ids: [...content.ids, res!.id]
    },
    sortOrder: editorBlock.sortOrder,
  }

  await editorBlockStore.updateEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, editorBlock.sectionId, editorBlock.id, updatedEditorBlock)

  await educationStore.getEducation(portfolioId)
  await loadSortedSections()
}
async function addExperienceToModul(editorBlock: EditorBlockType){
  if(sortedSections.value === null || portfolioFacts.value === null) return;

  const maxSortCount = getMaxSortCount()

  const experience : CreateExperienceType = {
    companyName: 'TEMPLATE NAME',
    position: 'TEMPLATE',
    sortOrder: maxSortCount + 1,
  }

  const content = JSON.parse(editorBlock.contentJson) as ModulType

  const res = await experienceStore.createExperience(portfolioId, experience)
  if(res?.id === null || res === null) return;

  const updatedEditorBlock : CreateEditorBlockType = {
    blockType: "experience",
    contentJson: {
      ids: [...content.ids, res!.id]
    },
    sortOrder: editorBlock.sortOrder,
  }

  await editorBlockStore.updateEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, editorBlock.sectionId, editorBlock.id, updatedEditorBlock)

  await experienceStore.getExperience(portfolioId)
  await loadSortedSections()
}
async function addSocialLinkToModul(editorBlock: EditorBlockType){
  if(sortedSections.value === null || portfolioFacts.value === null) return;

  const link : CreateSocialLinkType = {
    url: 'http://localhost:8080',
    platform: 'YouTube',
  }

  const content = JSON.parse(editorBlock.contentJson) as ModulType

  const res = await socialLinkStore.createSocialLink(portfolioId, link)
  if(res?.id === null || res === null) return;

  const updatedEditorBlock : CreateEditorBlockType = {
    blockType: "link",
    contentJson: {
      ids: [...content.ids, res!.id]
    },
    sortOrder: editorBlock.sortOrder,
  }

  await editorBlockStore.updateEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, editorBlock.sectionId, editorBlock.id, updatedEditorBlock)

  await socialLinkStore.getSocialLink(portfolioId, link)
  await loadSortedSections()
}

async function createEditorBlockFunc(editorBlock: CreateEditorBlockType | CreateTextEditorBlockType){
  if(portfolioFacts.value === null || sectionSelected.value === null) return;

  try{
    await editorBlockStore.createEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, sectionSelected.value, editorBlock)
    await portfolioSectionStore.getSections(portfolioId, portfolioFacts.value.currentVersionId)
    await loadSortedSections()
  }catch{}
}

async function deleteEditorBlockFunc(editorBlock: EditorBlockType){
  if(portfolioFacts.value === null || sectionSelected.value === null) return;

  try{
    if(editorBlock.blockType === "skill"){
      for (const skill of editorBlock.skills)
        await skillStore.deleteSkill(portfolioId, skill.id)
    }

    if(editorBlock.blockType === "project"){
      for (const project of editorBlock.project)
        await projectStore.deleteProject(portfolioId, project.id)
    }

    if(editorBlock.blockType === "education"){
      for (const education of editorBlock.education)
        await educationStore.deleteEducation(portfolioId, education.id)
    }

    if(editorBlock.blockType === "experience"){
      for (const experience of editorBlock.experience)
        await experienceStore.deleteExperience(portfolioId, experience.id)
    }

    if(editorBlock.blockType === "link"){
      for (const link of editorBlock.link)
        await socialLinkStore.deleteSocialLink(portfolioId, link.id)
    }

    await editorBlockStore.deleteEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, sectionSelected.value, editorBlock.id)
    await editorBlockStore.getEditorBlock(portfolioId, portfolioFacts.value.currentVersionId, sectionSelected.value)
    await loadSortedSections()
  }catch{}
}

async function updateTextBlockFunc(textBlock: TextBlockContent){
  if(portfolioFacts.value === null || sectionSelected.value === null) return;

  const editor = elementSelected.value!
  const updatedEditor : CreateTextEditorBlockType = {
    blockType: 'text',
    sortOrder: editor.sortOrder,
    contentJson: {
      text: textBlock.text,
      fontWeight: textBlock.fontWeight,
      tag: textBlock.tag,
      fontSize: textBlock.fontSize,
      align: textBlock.align,
      color: textBlock.color,
      id: textBlock.id,
    }
  }

  try{
    await editorBlockStore.updateEditorBlock(portfolioId, portfolioFacts.value?.currentVersionId, sectionSelected.value, editor.id, updatedEditor)
    await editorBlockStore.getEditorBlock(portfolioId, portfolioFacts.value.currentVersionId, sectionSelected.value)
    await loadSortedSections()
  }catch {}
}

async function updateProjectBlockFunc(projectBlock: ProjectType){
  if(portfolioFacts.value === null || sectionSelected.value === null) return;

  const updatedProject : CreateProjectType = {
      ...projectBlock,
  }

  try{
    await projectStore.updateProject(portfolioId, projectBlock.id, updatedProject)
    await editorBlockStore.getEditorBlock(portfolioId, portfolioFacts.value.currentVersionId, sectionSelected.value)
    await loadSortedSections()
  }catch {}
}

async function updateSkillBlockFunc(skillBlock: UpdateSkillType){
  if(portfolioFacts.value === null || sectionSelected.value === null) return;

  try{
    await skillStore.updateSkill(portfolioId, skillBlock.id, skillBlock)
    await editorBlockStore.getEditorBlock(portfolioId, portfolioFacts.value.currentVersionId, sectionSelected.value)
    await loadSortedSections()
  }catch {}
}

async function updateEducationBlockFunc(educationBlock: EducationType){
  if(portfolioFacts.value === null || sectionSelected.value === null) return;

  const updatedEducation : CreateEducationType = {
    ...educationBlock,
  }

  try{
    await educationStore.updateEducation(portfolioId, educationBlock.id, updatedEducation)
    await editorBlockStore.getEditorBlock(portfolioId, portfolioFacts.value.currentVersionId, sectionSelected.value)
    await loadSortedSections()
  }catch {}
}

async function updateSocialLinkBlockFunc(linkBlock: SocialLinkType){
  if(portfolioFacts.value === null || sectionSelected.value === null) return;

  try{
    await socialLinkStore.updateSocialLink(portfolioId, linkBlock.id, linkBlock.url)
    await editorBlockStore.getEditorBlock(portfolioId, portfolioFacts.value.currentVersionId, sectionSelected.value)
    await loadSortedSections()
  }catch {}
}
</script>

<template>
  <div v-if="addSectionVisible">
    <AddSection @submit="submitSection" @cancel="addSectionVisible = !addSectionVisible" :error="error ?? '' "></AddSection>
  </div>

  <div class="flex flex-col bg-[var(--background-color)] w-full h-[100vh] overflow-y-hidden">
    <nav class="z-999 px-3 py-2 flex items-center justify-between w-full h-fit bg-[var(--surface-color)] border border-b-gray-200 border-transparent">
      <logo link="/dashboard"></logo>

      <div class="flex items-center justify-center w-full max-w-[1200px]">
        <div class="flex items-center justify-between gap-3 w-full mx-5">
          <div class="flex items-center justify-center gap-5">
            <input v-model="portfolioName" type="text" class="font-semibold px-3 py-2 ">

            <div class="flex items-center justify-center gap-2 bg-green-50 px-3 py-0.5 rounded-full text-sm text-green-700">
              <div class="relative w-[7px] h-[7px]">
                <div class="w-full h-full bg-green-500 rounded-full"></div>
                <div class="absolute w-full h-full bg-green-300 rounded-full animate-ping -translate-y-[7px]"></div>
              </div>
              <span>Gespeichert - {{ portfolioFacts?.updatedAt ? getDateGap(portfolioFacts?.updatedAt) : 'FEHLER' }}</span>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3">
          <div class="flex items-center justify-center gap-5 text-[var(--text-color-light)] text-xl">
            <button class="flex items-center justify-center hover:text-gray-500">
              <i class="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <button class="flex items-center justify-center hover:text-gray-500">
              <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
            <div class="w-[1px] h-[30px] bg-gray-200"></div>
          </div>

        </div>
      </div>

      <div class="flex justify-center items-center gap-2">
        <div class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg select-none cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-regular fa-eye"></i>
          </div>
          <span>Vorschau</span>
        </div>

        <div class="hover:bg-transparent hover:text-[var(--text-color)] transition duration-75 flex items-center justify-center gap-2 px-3 py-2 border bg-[var(--text-color)] text-[var(--text-color-white)] rounded-lg select-none cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-regular fa-floppy-disk"></i>
          </div>
          <span>Speichern</span>
        </div>

        <div class="hover:bg-transparent hover:text-[var(--primary-color)] transition duration-75 flex items-center justify-center gap-2 px-3 py-2 border bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg select-none cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
          <span>Veröffentlichen</span>
        </div>
      </div>
    </nav>

    <div class="flex justify-between items-start gap-2 flex-1 min-h-0 overflow-hidden">
      <aside class="py-4 px-4 max-w-[300px] w-full min-w-[300px] shrink-0 h-full bg-[var(--surface-color)] overflow-y-auto">
        <div class="flex flex-col justify-center items-start gap-1">
          <span class="sm-subtitle">Baukasten</span>
          <span class="text-sm text-[var(--text-color-light)]">Ziehe Blöcke auf den Editor oder klicke zum Einfügen</span>
        </div>

        <div class="divider"></div>

        <div>
          <span class="sm-subtitle">Blöcke</span>

          <div class="grid grid-cols-2 my-5 gap-3">
            <Block @click="createTextModul()" title="Text" svg="fa-solid fa-align-left" subtitle="Absatz / Überschrift"></Block>
            <Block @click="" title="Bild" svg="fa-regular fa-image" subtitle="Foto Hochladen"></Block>
            <Block @click="createProjectModul()" title="Projekt" svg="fa-solid fa-diagram-project" subtitle="Titel, Beschreibung"></Block>
            <Block @click="createSkillModul()" title="Skill" svg="fa-solid fa-chart-line" subtitle="Fähigkeit / Tool"></Block>
            <Block @click="createEducationModul()" title="Ausbildung" svg="fa-solid fa-graduation-cap" subtitle="Schule, Studium"></Block>
            <Block @click="createExperienceModul()" title="Erfahrung" svg="fa-solid fa-briefcase" subtitle="Berufe, Firmen"></Block>
            <Block @click="createSocialLinkModul()" title="Link" svg="fa-regular fa-envelope" subtitle="Social Media"></Block>
          </div>
        </div>

        <div class="divider"></div>

        <div>
          <span class="sm-subtitle">Sections</span>

          <div class="mt-3 flex flex-col justify-center items-center gap-0.5">
            <Sections v-for="section in sortedSections" :key="section.id" :title="section.sectionType" :svg="getSvgToSectionType(section.sectionType)" :count="section.editorBlock.length"></Sections>

            <button @click="addSectionVisible = !addSectionVisible" class="transition-all duration-75 mt-2 select-none cursor-pointer group hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] hover:border-[var(--primary-color)] border-3 border-dashed border-gray-200 rounded-lg w-full flex items-center justify-center px-1 py-2 text-[var(--text-color-light)]">
              <div class="flex justify-center items-center gap-2">
                <div class="flex items-center justify-center">
                  <i class="fa-solid fa-plus"></i>
                </div>
                <span>Section hinzufügen</span>
              </div>
            </button>
          </div>
        </div>
      </aside>

      <div class="flex flex-col w-full items-center justify-start min-h-0 h-full">
        <div class="w-full flex justify-center">
          <div class="px-5 py-3 max-w-[600px] xl:max-w-[900px] 2xl:max-w-[1200px] w-full h-fit border border-transparent border-b-gray-200 flex justify-between items-center">
            <div class="bg-[var(--surface-color)] border border-gray-200 rounded-lg flex justify-center items-center text-sm text-[var(--text-color-light)]">
              <ScreenButton :active="true" title="Desktop" svg="fa-solid fa-desktop"></ScreenButton>
              <ScreenButton :active="false"  title="Tablet" svg="fa-solid fa-tablet-screen-button"></ScreenButton>
              <ScreenButton :active="false"  title="Mobil" svg="fa-solid fa-mobile-screen"></ScreenButton>
            </div>

            <div class="text-[var(--text-color-light)] text-sm">
              <span>920 x auto - 100%</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full max-w-[1200px] px-5 2xl:px-0 py-10 flex-1 overflow-y-hidden min-h-0">
          <div class="flex flex-col gap-5 w-full box-content flex-1 min-h-0 overflow-y-scroll no-scrollbar">
            <SectionStruct v-for="section in sortedSections" @update="updateSectionTitle" @selected="sectionSelectedFunction(section.id)" :is-selected="sectionSelected === section.id" @delete="deleteSection(section.id)" :key="section.id" :name="section.sectionType" :title="section.title">
              <div v-for="editor in section.editorBlock" :key="editor.id">
                <TextModul v-if="editor.blockType === 'text' " @delete="deleteEditorBlockFunc(editor)" @selected="elementSelectedFunction(editor.textBlockContent.id, editor)" :is-active="elementSelectedId === editor.textBlockContent.id" :text-content="editor.textBlockContent"></TextModul>

                <SkillModul v-if="editor.blockType === 'skill' " @add="addSkillToModul(editor)" @delete="deleteEditorBlockFunc(editor)">
                  <SkillElement v-for="skill in editor.skills" @selected="elementSelectedFunction(skill.skillId, editor)" :is-active="elementSelectedId === skill.skillId" :key="skill.skillId" :name="skill.name" :level="skill.level"></SkillElement>
                </SkillModul>

                <ProjectModul v-if="editor.blockType === 'project' " @add="addProjectToModul(editor)" @delete="deleteEditorBlockFunc(editor)">
                  <Project v-for="project in editor.project" @selected="elementSelectedFunction(project.id, editor)" :is-active="elementSelectedId === project.id" :key="project.id" :title="project.title" :description="project.description"></Project>
                </ProjectModul>

                <EducationModul v-if="editor.blockType === 'education' " @add="addEducationToModul(editor)" @delete="deleteEditorBlockFunc(editor)">
                  <EducationElement v-for="education in editor.education" @selected="elementSelectedFunction(education.id, editor)" :is-active="elementSelectedId === education.id" :key="education.id" :name="education.institutionName" :degree="education.degree" :field-of-study="education.fieldOfStudy" :start-date="education.startDate" :end-date="education.endDate"></EducationElement>
                </EducationModul>

                <SocialLinkModul v-if="editor.blockType === 'link' " @add="addSocialLinkToModul(editor)" @delete="deleteEditorBlockFunc(editor)">
                  <SocialLinkElement v-for="link in editor.link" @selected="elementSelectedFunction(link.id, editor)" :is-active="elementSelectedId === link.id" :key="link.id" svg="fa-brands fa-github" :name="link.platform" :url="link.url"></SocialLinkElement>
                </SocialLinkModul>
              </div>
            </SectionStruct>

            <button @click="addSectionVisible = !addSectionVisible" class="hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75  px-4 py-3 select-none cursor-pointer text-[var(--text-color-light)] flex items-center justify-center gap-2 w-full h-fit rounded-lg border-2 border-dashed border-gray-200">
              <SvgStruct>
                <i class="fa-solid fa-plus"></i>
              </SvgStruct>
              <span>Section hinzufügen</span>
            </button>
          </div>
        </div>
      </div>

      <aside class="py-4 px-4 max-w-[350px] w-full min-w-[300px] shrink-0 h-full bg-[var(--surface-color)]">
        <div class="flex flex-col justify-center items-start gap-1">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center justify-center gap-2">
              <div class="mb-2 flex items-center justify-center w-[30px] h-[30px] bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-md">
                <i class="text-[var(--primary-color)]" :class="getSvgToElementType(elementSelected?.blockType ?? '')"></i>
              </div>
              <span v-if="elementSelected !== null" class="sm-subtitle">{{ elementSelected.blockType }}</span>
              <span v-else class="sm-subtitle">Keine Ausgewählt</span>
            </div>
            <span class="text-xs text-[var(--primary-color)] bg-[var(--primary-color-light)] rounded-full px-2 py-1 font-semibold uppercase">Ausgewählt</span>
          </div>
          <span v-if="sectionSelected !== null && elementSelected !== null" class="text-sm text-[var(--text-color-light)]">Section "{{
              portfolioSectionStore.sections.find(s => s.id === sectionSelected)?.title
            }}" Block Nr. {{ elementSelected?.sortOrder }}
          </span>
          <span v-else class="text-sm text-[var(--text-color-light)]">
            Nichts ausgewählt
          </span>
        </div>

        <div class="divider"></div>

<!--        <div class="flex items-center justify-center w-full">-->
<!--          <button class="hover:text-gray-500 w-full text-[var(&#45;&#45;primary-color)] border-3 border-transparent border-b-[var(&#45;&#45;primary-color)] px-2 py-2">Inhalt</button>-->
<!--          <button class="hover:text-gray-500 w-full text-[var(&#45;&#45;text-color-light)]">Layout</button>-->
<!--          <button class="hover:text-gray-500 w-full text-[var(&#45;&#45;text-color-light)]">Erweitert</button>-->
<!--        </div>-->

        <div class="mt-5">
          <div v-if="elementSelected?.blockType === 'text' ">
            <ContentText :text-block="elementSelected.textBlockContent" @update="updateTextBlockFunc"></ContentText>
          </div>

          <div v-if="elementSelected?.blockType === 'project' ">
            <ContentProject :project-block="elementSelected.project.find(p => p.id === elementSelectedId)" @update="updateProjectBlockFunc"></ContentProject>
          </div>

          <div v-if="elementSelected?.blockType === 'skill' ">
            <ContentSkill :skill-block="elementSelected.skills.find(s => s.id === elementSelectedId)" @change="updateSkillBlockFunc"></ContentSkill>
          </div>

          <div v-if="elementSelected?.blockType === 'education' ">
            <ContentEducation :education-block="elementSelected.education.find(e => e.id === elementSelectedId)" @update="updateEducationBlockFunc"></ContentEducation>
          </div>

          <div v-if="elementSelected?.blockType === 'link' ">
            <ContentLink :link-block="elementSelected.link.find(l => l.id === elementSelectedId)" @update="updateSocialLinkBlockFunc"></ContentLink>
          </div>
        </div>

      </aside>
    </div>
  </div>
</template>

<style scoped>
  .screen-active{
    background-color: var(--text-color);
    color: var(--text-color-white);
  }
</style>
