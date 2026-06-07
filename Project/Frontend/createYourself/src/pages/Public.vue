<script lang="ts" setup>
  import {useRoute} from "vue-router";
  import {computed, onMounted, ref} from "vue";
  import {usePortfolioStore} from "@/stores/portfolioStore.ts";
  import NavPublic from "@/components/layout/NavPublic.vue";
  import SvgStruct from "@/components/ui/SvgStruct.vue";
  import PublishModulStruct from "@/components/ui/PublishModulStruct.vue";
  import PublishProjectElement from "@/components/ui/PublishProjectElement.vue";
  import {usePortfolioSectionStore} from "@/stores/portfolioSectionStore.ts";
  import type {PortfolioType} from "@/types/portfolioType.ts";
  import type {TextBlockContent} from "@/types/textBlockContent.ts";
  import type {ModulType} from "@/types/modulType.ts";
  import {useEditorBlockStore} from "@/stores/editorBlockStore.ts";
  import {useSkillStore} from "@/stores/skillStore.ts";
  import {useProjectStore} from "@/stores/projectStore.ts";
  import {useEducationStore} from "@/stores/educationStore.ts";
  import {useExperienceStore} from "@/stores/experienceStore.ts";
  import {useSocialLinkStore} from "@/stores/socialLinkStore.ts";
  import PublishSkillModul from "@/components/ui/PublishSkillModul.vue";
  import PublishSkillElement from "@/components/ui/PublishSkillElement.vue";
  import PublishEducationElement from "@/components/ui/PublishEducationElement.vue";
  import PublishLinkModul from "@/components/ui/editor/PublishLinkModul.vue";
  import PublishLinkElement from "@/components/ui/PublishLinkElement.vue";
  import PublishTextElement from "@/components/ui/editor/PublishTextElement.vue";
  import {getBrandSvg} from "@/utils/brand.ts";

  const route = useRoute();
  const portfolioSlug = String(route.params.slug);

  const portfolioStore = usePortfolioStore();
  const portfolioSectionStore = usePortfolioSectionStore();
  const editorBlockStore = useEditorBlockStore();
  const skillStore = useSkillStore();
  const projectStore = useProjectStore();
  const educationStore = useEducationStore();
  const experienceStore = useExperienceStore();
  const socialLinkStore = useSocialLinkStore();

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

  async function getEditorForSection(sectionId: number){
    if(portfolioFacts.value === null) return;

    const res = await editorBlockStore.getEditorBlock(portfolioFacts.value.id, portfolioFacts.value.currentVersionId, sectionId)

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

  onMounted(async () => {
    portfolio.value = await portfolioStore.getFullPortfolioBySlug(portfolioSlug)
    portfolioFacts.value = portfolio.value.portfolio

    if(portfolioFacts.value !== null){
      await skillStore.getSkills(portfolioFacts.value?.id)
      await projectStore.getProjects(portfolioFacts.value?.id)
      await educationStore.getEducation(portfolioFacts.value?.id)
      await experienceStore.getExperience(portfolioFacts.value?.id)
      await socialLinkStore.getSocialLink(portfolioFacts.value?.id)

      await portfolioSectionStore.getSections(portfolioFacts.value?.id, portfolioFacts.value?.currentVersionId)
      await loadSortedSections()
    }
  })

  const rawName = computed(() => {
    return sortedSections.value?.find(s => s.sectionType === 'Hero Section').editorBlock[1].textBlockContent.text
  })

  const firstname = computed(() => {
    if(rawName.value === null || rawName.value === undefined) return

    return rawName.value.split(' ')[0]
  })

  const lastname = computed(() => {
    if(rawName.value === null || rawName.value === undefined) return

    return rawName.value.split(' ')[1]
  })


  const mapForTabs = computed(() => {
    if(sortedSections?.value === null) return;

    return sortedSections?.value.map(s => ({
      sectionType: s.sectionType,
      id: s.id,
    }))
  })

  const projectSectionId = computed(() => {
    return sortedSections.value?.find(s => s.sectionType === 'Projekte')?.id ?? null
  })

  const contactSectionId = computed(() => {
    return sortedSections.value?.find(s => s.sectionType === 'Kontakt & Social')?.id ?? null
  })

  const footerLinks = computed(() => {
    if(socialLinkStore.socialLinks === null) return
    return socialLinkStore.socialLinks?.slice(0, 3)
  })
</script>

<template>
  <div class="w-full h-full bg-[var(--background-color)] max-w-[100vw] overflow-x-hidden">
    <div class="max-w-[1200px] mx-auto mb-5 px-4">
      <NavPublic :firstname="firstname" :lastname="lastname" :tabs="mapForTabs"></NavPublic>

      <main>
        <section v-for="section in sortedSections" :key="section.id" :id="`${section.id}`">
          <header v-if="section.sectionType === 'Hero Section' " class="h-[100vh] w-full flex justify-center items-center">
            <div class="max-w-[1200px] w-full flex flex-col items-center lg:block">
              <div class="flex lg:flex-row flex-col-reverse mt-30 lg:mt-0 justify-between items-center gap-4">
                <div class="flex flex-col justify-center items-start gap-4">
                  <div class="flex flex-col gap-1 text-[70px]! font-medium!">
                    <PublishTextElement class="leading-tight" :text-block="section.editorBlock[0].textBlockContent"></PublishTextElement>
                    <PublishTextElement class="leading-tight"  :text-block="section.editorBlock[1].textBlockContent"></PublishTextElement>
                  </div>
                  <PublishTextElement class="bg-linear-to-r! from-[var(--primary-color)]! to-[var(--secondary-color)]! bg-clip-text! text-transparent!" :text-block="section.editorBlock[2].textBlockContent"></PublishTextElement>
                  <PublishTextElement class="max-w-[450px]" :text-block="section.editorBlock[3].textBlockContent"></PublishTextElement>

                  <div class="flex gap-3">
                    <a :href="`#${projectSectionId}`" class="select-none hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] hover:bg-[var(--surface-color)] transition duration-75 border border-transparent flex justify-center items-center gap-2 px-4 py-3 rounded-xl shadow-md bg-[var(--primary-color)] text-[var(--text-color-white)]">
                      <span>Projekte ansehen</span>
                      <SvgStruct>
                        <i class="fa-solid fa-arrow-right"></i>
                      </SvgStruct>
                    </a>

                    <a :href="`#${contactSectionId}`" class="select-none hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 flex justify-center items-center gap-2 px-4 py-3 rounded-xl shadow-sm text-[var(--text-color)] bg-[var(--surface-color)] border border-gray-200">
                      <SvgStruct>
                        <i class="fa-regular fa-envelope"></i>
                      </SvgStruct>
                      <span>Kontakt aufnehmen</span>
                    </a>
                  </div>
                </div>

                <div>
                  <div class="relative select-none w-[400px] h-[400px]">
                    <div class="rotate absolute -inset-2 bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full"></div>

                    <div class="relative z-10 flex justify-center items-center w-full h-full text-[80px] text-[var(--text-color-white)] font-extrabold rounded-full shadow-2xl bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)] border-5 border-[var(--surface-color)]">
                      <span>{{ firstname.slice(0,1) + lastname.slice(0,1) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-5 flex gap-3">
                <button v-for="link in section.editorBlock[section.editorBlock.length - 1].link" :key="link.id" class="hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 min-w-[40px] min-h-[40px] rounded-xl shadow-sm border text-lg border-gray-200 text-gray-600">
                  <a :href="link.url" target="_blank">
                    <SvgStruct>
                      <i :class="getBrandSvg(link.platform)"></i>
                    </SvgStruct>
                  </a>
                </button>
              </div>
            </div>
          </header>

          <PublishModulStruct v-if="section.sectionType !== 'Hero Section' " :name="section.sectionType" :title="section.title" description="">
            <div v-for="block in section.editorBlock" :key="block.id" class="flex flex-col gap-6">
              <div class="py-5 px-1" v-if="block.blockType === 'text' ">
                <PublishTextElement :text-block="block.textBlockContent"></PublishTextElement>
              </div>

              <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                <PublishProjectElement v-for="project in block.project" :key="project.id" :title="project.title" :description="project.description" :demo-url="project.demoUrl" :code-url="project.githubUrl" :image="project.imageUrl"></PublishProjectElement>
              </div>

              <PublishSkillModul v-if="block.blockType === 'skill' " class="grid lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-5">
                  <PublishSkillElement v-for="skill in block.skills" :key="skill.id" :title="skill.name" :value="skill.level"></PublishSkillElement>
              </PublishSkillModul>

              <div v-if="block.blockType === 'education' " class="flex flex-col gap-5">
                <PublishEducationElement v-for="education in block.education" :key="education.id" :institution-name="education.institutionName" :degree="education.degree" :start-date="education.startDate" :end-date="education.endDate"></PublishEducationElement>
              </div>

              <PublishLinkModul v-if="block.blockType === 'link' ">
                <div class="flex items-center justify-center gap-4">
                  <PublishLinkElement v-for="link in block.link" :key="link.id" :svg="getBrandSvg(link.platform)" :name="link.platform" :url="link.url"></PublishLinkElement>
                </div>
              </PublishLinkModul>
            </div>
          </PublishModulStruct>
        </section>
      </main>
    </div>

    <footer class="bg-[#0f172a] min-h-[80px] w-full text-[var(--text-color-white)] p-4">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex items-center justify-between">
          <a class="select-none font-semibold text-lg !bg-transparent">
            {{ firstname }}<span class="bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-transparent bg-clip-text">{{ lastname }}</span>
          </a>
          <div class="flex items-center justify-center gap-2">
            <a
              v-for="link in footerLinks"
              :key="link.id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:bg-white/25 transition duration-75 flex items-center justify-center w-[35px] h-[35px] rounded-lg backdrop-blur-sm bg-backdrop"
            >
              <SvgStruct>
                <i :class="getBrandSvg(link.platform)"></i>
              </SvgStruct>
            </a>
          </div>
        </div>

        <div class="my-5 w-full h-[1px] bg-[var(--text-color-light)]"></div>

        <div class="flex items-center justify-between text-[var(--text-color-light)] text-xs">
          <span>© 2026 CreateYourself. Alle Rechte vorbehalten.</span>
          <RouterLink to="/" class="cursor-pointer flex gap-2 items-center justify-center px-3 py-2 bg-logo rounded-full text-[var(--text-color-light)]!">
            <img class="w-[15px] h-[15px] object-cover" src="../../public/CreateYourself_Logo.png" alt="CreateYourself Logo">
            Erstellt mit CreateYourself
          </RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  .bg-logo{
    background: rgba(249, 250, 251, 0.05);
  }

  .bg-backdrop{
    background: rgba(249, 250, 251, 0.15);
  }

  .rotate{
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
